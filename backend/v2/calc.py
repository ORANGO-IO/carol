from flask import jsonify, Response
from .functions import get_classificacao, get_categoria_nome
from .utils.db import provide_session
from .models.queixas_principais import QueixasPrincipais
from .models.classificacao import Classificacao
from sqlalchemy.sql.expression import literal


def checkItem(item: tuple, *lists: list) -> dict:
    """Função checa se tem match de sinais em uma queixa principal e atribui pontuações.
    
    Regra de negócio: Pontuação baseada em quantidade de matches + peso inversamente
    proporcional ao ID da classificação (prioridades menores = mais graves).
    """
    pontos = 0
    for lista in lists:
        if item in lista:
            pontos += 1
    pontos += 5 / item[1]
    retorno = {"item": item, "pontos": pontos}
    return retorno

def intersection(*lists: list) -> dict:
    """Captura a intercessão de tuplas dentro de um array.
    
    Regra de negócio: Retorna todas as interseções ordenadas por pontuação
    e sugere as de maior prioridade (maior pontuação).
    """
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

    return {"intersections": intersections, "sugestions": sugestions}

# Constantes de classificação de risco (Protocolo de Manchester)
PRIORIDADE_EMERGENCIA = 1      # Vermelho - Atendimento imediato
PRIORIDADE_MUITO_URGENTE = 2   # Laranja - 10 minutos
PRIORIDADE_URGENTE = 3         # Amarelo - 60 minutos
PRIORIDADE_POUCO_URGENTE = 4   # Verde - 120 minutos
PRIORIDADE_NAO_URGENTE = 5     # Azul - 240 minutos
PRIORIDADE_MINIMA = 9          # Sem classificação

@provide_session
def calc(filterData: dict, session=None) -> Response:
    """Função que calcula as prioridades e dá o resultado final.
    
    Regra de negócio: Calcula classificação de risco baseada nos sinais vitais
    e sintomas do paciente. Menor número = maior prioridade de atendimento.
    """
    data = {}
    data["resultados"] = []
    qp_ids = []
    qp_classif_ids = []
    for sinal in filterData:
        # Verificar qual a maior classificacao, prioridade 1 é a maior
        prioridade_max = PRIORIDADE_MINIMA
        qp_ids_sinal = []
        qp_classif_ids_sinal = []
        for match in sinal["matches"]:
            # Definindo o grau de gravidade máxima do sinal pesquisado

            for sintomas in match["sintomas_descritivos"]:
                if sintomas["prioridade_classificacao"] < prioridade_max:
                    prioridade_max = sintomas["prioridade_classificacao"]

            if match["classificacao"]["prioridade"] < prioridade_max:
                prioridade_max = match["classificacao"]["prioridade"]

            qp_ids_sinal.append(match["id_qp"])
            qp_classif_ids_sinal.append((match["id_qp"], match["id_classificacao"]))

            for sintomas in match["sintomas_descritivos"]:
                qp_classif_ids_sinal.append((match["id_qp"], sintomas["classificacao_id"]))

        qp_ids.append(qp_ids_sinal)
        qp_classif_ids.append(qp_classif_ids_sinal)
        sinal["matchesPrincipais"] = [
            x
            for x in sinal["matches"]
            if x["classificacao"]["prioridade"] == prioridade_max
        ]
        sinal["matchesSecundarios"] = sorted(
            [
                x
                for x in sinal["matches"]
                if x["classificacao"]["prioridade"] != prioridade_max
            ],
            key=lambda x: x["classificacao"]["prioridade"],
     )
    # Aqueles que só combinam a queixa principal
    resultados = intersection(*qp_classif_ids)

    tmp_resultados = []
    for resultado in resultados["sugestions"]:
        fetch = (
            session.query(
                QueixasPrincipais.id,
                QueixasPrincipais.queixa_principal.label("sintoma"),
                QueixasPrincipais.observacoes.label("observacao"),
                QueixasPrincipais.fk_categoria.label("categoria"),
            )
            .filter(QueixasPrincipais.id == resultado["item"][0])
            .first()
        )

        if fetch:
            fetch = fetch._asdict()
        else:
            fetch = {}

        fetch["classificacao"] = resultado["item"][1]
        tmp_resultados.append(fetch)

    for resultado in tmp_resultados:
        resultado["classificacao"] = get_classificacao(resultado["classificacao"])
        if resultado.get("categoria"):
            resultado["categoria"] = get_categoria_nome(resultado["categoria"])

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
                QueixasPrincipais.id,
                QueixasPrincipais.queixa_principal.label("sintoma"),
                QueixasPrincipais.observacoes.label("observacao"),
                QueixasPrincipais.fk_categoria.label("categoria"),
                Classificacao.cor_hex.label("cor_hex"),
            )
            .outerjoin(Classificacao, literal(True))
            .filter(QueixasPrincipais.id == qp["item"][0])
            .filter(Classificacao.id == qp["item"][1])
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