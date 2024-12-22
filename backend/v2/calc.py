from flask import jsonify, Response
from .functions import getClassificacao, getCategoriaNome
from .utils.db import provide_session
from .models.queixas_principais import QueixasPrincipais
from .models.classificacao import Classificacao
from sqlalchemy.sql.expression import literal


def checkItem(item: tuple, *lists: list) -> bool:
    """Função checa se tem match de sinais em uma queixa principal e atribui pontuações"""
    pontos = 0
    for lista in lists:
        if item in lista:
            pontos += 1
    pontos += 5 / item[1]
    retorno = {"item": item, "pontos": pontos}
    return retorno


def intersection(*lists: list) -> list:
    """Captura a intercessão de tuplas dentro de um array"""
    intersections = []
    for lista in lists:
        for tupla in lista:
            intersections.append(checkItem(tupla, *lists))

    # Excluindo dados repetidos e organizando-os do maior para o menor
    intersections = [dict(t) for t in {tuple(d.items()) for d in intersections}]
    intersections = sorted(intersections, key=lambda x: x["pontos"], reverse=True)
    sugestions = [
        item for item in intersections if item["pontos"] == intersections[0]["pontos"]
    ]
    print({"intersections": intersections, "sugestions": sugestions})

    return {"intersections": intersections, "sugestions": sugestions}


@provide_session
def calc(filterData: dict, session=None) -> Response:
    """Função que calcula as prioridades e dá o resultado final"""
    data = {}
    data["resultados"] = []
    qp_ids = []
    qp_classif_ids = []
    for sinal in filterData:
        # Verificar qual a maior classificacao, prioridade 1 é a maior
        prioridadeMax = 9
        qp_ids_sinal = []
        qp_classif_ids_sinal = []
        for match in sinal["matches"]:
            # Definindo o grau de gravidade máxima do sinal pesquisado
            if match["classificacao"]["prioridade"] < prioridadeMax:
                prioridadeMax = match["classificacao"]["prioridade"]
            qp_ids_sinal.append(match["id_qp"])
            qp_classif_ids_sinal.append((match["id_qp"], match["id_classificacao"]))
        qp_ids.append(qp_ids_sinal)
        qp_classif_ids.append(qp_classif_ids_sinal)
        sinal["matchesPrincipais"] = [
            x
            for x in sinal["matches"]
            if x["classificacao"]["prioridade"] == prioridadeMax
        ]
        sinal["matchesSecundarios"] = sorted(
            [
                x
                for x in sinal["matches"]
                if x["classificacao"]["prioridade"] != prioridadeMax
            ],
            key=lambda x: x["classificacao"]["prioridade"],
        )

    # Aqueles que só combinam a queixa principal
    resultados = intersection(*qp_classif_ids)
    tmp_resultados = []
    for resultado in resultados["sugestions"]:
        fetch = (
            session.query(
                QueixasPrincipais.ID.label("id"),
                QueixasPrincipais.sintoma.label("sintoma"),
                QueixasPrincipais.observacao.label("observacao"),
                QueixasPrincipais.categoria.label("categoria"),
            )
            .filter(QueixasPrincipais.ID == resultado["item"][0])
            .first()
        )

        if fetch:
            fetch = fetch._asdict()
        else:
            fetch = {}

        fetch["classificacao"] = resultado["item"][1]
        tmp_resultados.append(fetch)

    for resultado in tmp_resultados:
        resultado["classificacao"] = getClassificacao(resultado["classificacao"])
        if resultado.get("categoria"):
            resultado["categoria"] = getCategoriaNome(resultado["categoria"])

    data["resultados"] = tmp_resultados
    data["triagem"] = (
        sorted(tmp_resultados, key=lambda x: x["classificacao"]["prioridade"])[0]
        if len(sorted(tmp_resultados, key=lambda x: x["classificacao"]["prioridade"]))
        > 0
        else None
    )

    sugestoes = []
    for qp in resultados["intersections"]:
        result = (
            session.query(
                QueixasPrincipais.ID.label("id"),
                QueixasPrincipais.sintoma.label("sintoma"),
                QueixasPrincipais.observacao.label("observacao"),
                QueixasPrincipais.categoria.label("categoria"),
                Classificacao.cor_hex.label("cor_hex"),
            )
            .outerjoin(Classificacao, literal(True))
            .filter(QueixasPrincipais.ID == qp["item"][0])
            .filter(Classificacao.ID == qp["item"][1])
            .first()
        )

        if result:
            result = result._asdict()
        else:
            result = {}
        sugestoes.append(result)

    data["sugestoes"] = sugestoes
    data["sinais"] = filterData

    return jsonify(data)
