from flask import Flask, jsonify, request, Blueprint, Response
from flask_cors import CORS
from flask_swagger import swagger
from pprint import pprint
from .calc import calc
from .functions import getClassificacao, getCategoriaNome
from .utils.db import provide_session
from .models.classificacao import Classificacao
from .models.sinais import Sinais
from .models.queixas_principais import QueixasPrincipais
from .models.registros_sinais import RegistrosSinais
from .models.sintomas import Sintomas
from .models.categorias import Categorias
from .models.registros_sintomas import RegistrosSintomas
from sqlalchemy import func
from werkzeug.middleware.proxy_fix import ProxyFix
import sys

v1_blueprint = Blueprint("v1", __name__, url_prefix="/api/v1")

def verificaDescritor(descritor: str) -> bool:
    pass


def verificaQP(qp: str) -> bool:
    pass


def verificaSintoma(sintoma: str) -> bool:
    pass


def verificaSinal(sinal: str) -> bool:
    pass


@provide_session
def getClassificacaoId(identificador: str, session=None) -> int:
    result = (
        session.query(Classificacao).filter(Classificacao.nome == identificador).first()
    )
    if result:
        return result.ID


@provide_session
def getSinalId(identificador: str, session=None) -> int:
    result = session.query(Sinais).filter(Sinais.identificador == identificador).first()
    if result:
        return result.ID


@provide_session
def getClassificacaoNome(id: int, session=None) -> str:
    result = session.query(Classificacao).filter(Classificacao.ID == id).first()
    if result:
        return result.nome


@provide_session
def getSinal(id: int, session=None) -> list:
    result = (
        session.query(
            Sinais.ID.label("ID"),
            Sinais.nome.label("nome"),
            Sinais.descritor.label("descritor"),
            Sinais.identificador.label("identificador"),
            Sinais.unidade.label("unidade"),
        )
        .filter(Sinais.ID == id)
        .first()
    )
    if result:
        return result._asdict()


@provide_session
def getQP(id: int, session=None) -> list:
    result = (
        session.query(
            QueixasPrincipais.ID.label("ID"),
            QueixasPrincipais.sintoma.label("sintoma"),
            QueixasPrincipais.observacao.label("observacao"),
            QueixasPrincipais.categoria.label("categoria"),
        )
        .filter(QueixasPrincipais.ID == id)
        .first()
    )
    if result:
        return result._asdict()

@v1_blueprint.route("/")
def hello():
    """Return a friendly HTTP greeting."""
    return "Hello World from CAROL V1!"


@v1_blueprint.route("/metrics")
@provide_session
def metrics(session=None):
    metrics = {}
    metrics["meta"] = 62
    result = session.query(QueixasPrincipais.ID).count()

    metrics["cadastros"] = result
    return jsonify(metrics)


@v1_blueprint.route("/filter")
@provide_session
def filter(session=None):
    """Filtra resultados de acordo com sintomas enviados"""
    pprint(request.args)
    data = []
    for key, value in request.args.items():
        if key != "categoria":
            print("SINTOMA ---- ", key, value)
            if value and value != "NaN":
                value = float(value)
                pprint(getSinalId(key))
                result = (
                    session.query(
                        RegistrosSinais.ID.label("ID"),
                        RegistrosSinais.id_qp.label("id_qp"),
                        RegistrosSinais.id_sinal.label("id_sinal"),
                        RegistrosSinais.id_classificacao.label("id_classificacao"),
                        func.coalesce(RegistrosSinais.min, 0).label("min"),
                        func.coalesce(RegistrosSinais.max, 0).label("max"),
                        RegistrosSinais.descritor.label("descritor"),
                    )
                    .filter(RegistrosSinais.id_sinal == getSinalId(key))
                    .all()
                )
                if result:
                    result = [x._asdict() for x in result]
                    treated_result = []
                    for row in result:
                        if (
                            row.get("min")
                            and row.get("max")
                            and row["min"] < row["max"]
                        ):
                            if (row["min"] >= value or not row["min"]) or (
                                row["max"] <= value or not row["max"]
                            ):
                                treated_result.append(row)
                        else:
                            if (row.get("min", 0) >= value or not row["min"]) and (
                                row.get("max", 0) <= value or not row["max"]
                            ):
                                treated_result.append(row)
                    fetch = treated_result

                    fetch = treated_result
                    tmp = getSinal(getSinalId(key))
                    for match in fetch:
                        match["sinal"] = getSinal(match["id_sinal"])
                        match["classificacao"] = getClassificacao(
                            match["id_classificacao"]
                        )
                        match["qp"] = getQP(match["id_qp"])

                    if request.args["categoria"] != "null":
                        fetch = [
                            m
                            for m in fetch
                            if m["qp"]["categoria"] == int(request.args["categoria"])
                            or not m["qp"]["categoria"]
                        ]
                    else:
                        fetch = [m for m in fetch if not m["qp"]["categoria"]]

                    tmp["matches"] = fetch
                    data.append(tmp)

    return calc(data)


@v1_blueprint.route("/classificacao")
@provide_session
def classificacao(session=None):
    """Retorna a lista das classificações de risco"""
    result = session.query(
        Classificacao.ID.label("ID"),
        Classificacao.prioridade.label("prioridade"),
        Classificacao.nome.label("nome"),
        Classificacao.descritor.label("descritor"),
        Classificacao.tempo.label("tempo"),
        Classificacao.cor_hex.label("cor_hex"),
    ).all()
    if result:
        return jsonify([x._asdict() for x in result])
    else:
        return jsonify([])


@v1_blueprint.route("/sinais")
@provide_session
def sinais(session=None):
    """Retorna a lista dos sinais cadastrados"""
    result = (
        session.query(
            Sinais.ID.label("ID"),
            Sinais.nome.label("nome"),
            Sinais.descritor.label("descritor"),
            Sinais.identificador.label("identificador"),
            Sinais.unidade.label("unidade"),
        )
        .order_by(Sinais.identificador.desc())
        .all()
    )
    if result:
        return jsonify([x._asdict() for x in result])
    else:
        return jsonify([])


@v1_blueprint.route("/sintomas")
@provide_session
def sintomas(session=None):
    """Retorna a lista dos sintomas cadastrados"""
    result = (
        session.query(
            Sintomas.ID.label("ID"),
            Sintomas.sintoma.label("sintoma"),
            Sintomas.descritor.label("descritor"),
        )
        .order_by(Sintomas.sintoma.asc())
        .all()
    )
    if result:
        return jsonify([x._asdict() for x in result])
    else:
        return jsonify([])


@v1_blueprint.route("/categorias")
@provide_session
def categorias(session=None):
    """Retorna a lista das categorias de qp cadastradas"""
    result = session.query(
        Categorias.ID.label("ID"), Categorias.categoria.label("categoria"),
    ).all()
    if result:
        return jsonify([x._asdict() for x in result])
    else:
        return jsonify([])


@v1_blueprint.route("/qp/<id>")
@provide_session
def qpDetails(id: int, session=None):
    print(id, file=sys.stderr)
    # coleta dados de qp
    qp = {}

    result = (
        session.query(
            QueixasPrincipais.ID.label("ID"),
            QueixasPrincipais.sintoma.label("sintoma"),
            QueixasPrincipais.observacao.label("observacao"),
            QueixasPrincipais.categoria.label("categoria"),
        )
        .filter(QueixasPrincipais.ID == id)
        .first()
    )

    qp["qp"] = result._asdict()

    # coleta dados de sintomas associados

    result = (
        session.query(
            RegistrosSinais.ID.label("ID"),
            RegistrosSinais.id_qp.label("id_qp"),
            RegistrosSinais.id_sinal.label("id_sinal"),
            RegistrosSinais.id_classificacao.label("id_classificacao"),
            RegistrosSinais.min.label("min"),
            RegistrosSinais.max.label("max"),
            RegistrosSinais.descritor.label("descritor"),
        )
        .filter(RegistrosSinais.id_qp == id)
        .all()
    )

    if result:
        qp["sinais"] = [x._asdict() for x in result]
    else:
        qp["sinais"] = []

    for sinal in qp["sinais"]:
        sinal["sinal"] = getSinal(sinal["id_sinal"])

    # coleta dados de sinais associados
    result = (
        session.query(
            RegistrosSintomas.ID.label("ID"),
            RegistrosSintomas.id_qp.label("id_qp"),
            RegistrosSintomas.id_classificacao.label("id_classificacao"),
            RegistrosSintomas.sintoma.label("sintoma"),
            RegistrosSintomas.descritor.label("descritor"),
        )
        .filter(RegistrosSintomas.id_qp == id)
        .all()
    )

    if result:
        qp["sintomas"] = [x._asdict() for x in result]
    else:
        qp["sintomas"] = []

    # coleta classificacao
    result = session.query(
        Classificacao.ID.label("ID"),
        Classificacao.prioridade.label("prioridade"),
        Classificacao.nome.label("nome"),
        Classificacao.descritor.label("descritor"),
        Classificacao.tempo.label("tempo"),
        Classificacao.cor_hex.label("cor_hex"),
    ).all()

    if result:
        qp["classificacao"] = [x._asdict() for x in result]
    else:
        qp["classificacao"] = []

    data = {**qp["qp"]}
    if not data["categoria"]:
        data["id_categoria"] = data["categoria"]
        data["categoria"] = getCategoriaNome(data["categoria"])

    for classificacao in qp["classificacao"]:
        if "classificacao" not in data.keys():
            data["classificacao"] = {}
        data["classificacao"][classificacao["nome"]] = {}
        data["classificacao"][classificacao["nome"]]["ID"] = classificacao["ID"]
        data["classificacao"][classificacao["nome"]]["cor"] = classificacao["cor_hex"]
        data["classificacao"][classificacao["nome"]]["nome"] = classificacao["nome"]
        data["classificacao"][classificacao["nome"]]["sinais"] = [
            sinal
            for sinal in qp["sinais"]
            if sinal["id_classificacao"] == classificacao["ID"]
        ]
        data["classificacao"][classificacao["nome"]]["sintomas"] = [
            sintoma
            for sintoma in qp["sintomas"]
            if sintoma["id_classificacao"] == classificacao["ID"]
        ]
    return jsonify(data)


@v1_blueprint.route("/qp", methods=["GET", "PUT"])
@provide_session
def qp(session=None):
    print("TESTE", file=sys.stderr)

    """Retorna e inclui queixas_principais"""
    if request.method == "GET":
        result = session.query(
            QueixasPrincipais.ID.label("ID"),
            QueixasPrincipais.sintoma.label("sintoma"),
            QueixasPrincipais.observacao.label("observacao"),
            QueixasPrincipais.categoria.label("categoria"),
        ).all()
        result = [x._asdict() for x in result]

        return jsonify(result)
    else:
        req = request.json["qp"]
        queixa = QueixasPrincipais(
            sintoma=req["sintoma"],
            observacao=req["observacao"],
            categoria=req["categoria"],
        )
        session.add(queixa)
        session.commit()
        return jsonify(req)


@v1_blueprint.route("/registro", methods=["PUT"])
@provide_session
def registro(session=None):
    """Registra um bloco de dados relacionados a uma queixa principal"""
    # Verifica QP
    qpID = None
    if request.json["qp"]:
        req = request.json["qp"]
        qpExists = False
        sintoma = req["sintoma"]
        response = (
            session.query(
                QueixasPrincipais.ID.label("ID"),
                QueixasPrincipais.sintoma.label("sintoma"),
                QueixasPrincipais.observacao.label("observacao"),
                QueixasPrincipais.categoria.label("categoria"),
            )
            .filter(QueixasPrincipais.sintoma == sintoma)
            .all()
        )

        qpExists = len(response) > 0 if sintoma != "" else None

        if not qpExists:
            categoria = req["categoria"] if req["categoria"] != "" else False
            if not categoria:
                queixa_principal = QueixasPrincipais(
                    sintoma=req["sintoma"], observacao=req["observacao"]
                )
                session.add(queixa_principal)
                session.commit()
            else:
                queixa_principal = QueixasPrincipais(
                    sintoma=req["sintoma"],
                    observacao=req["observacao"],
                    categoria=categoria,
                )
                session.add(queixa_principal)
                session.commit()

            qpID = queixa_principal.ID
        elif qpExists:
            qpID = (
                session.query(QueixasPrincipais)
                .filter(QueixasPrincipais.sintoma == sintoma)
                .first()
                .ID
            )
            print("já existe essa queixa principal")
        else:
            return jsonify(
                {"erro": "É necessário preencher o campo de queixa principal"}
            )

    print("qpID", qpID)

    for classificacao in request.json["classificacao"]:
        for sintoma in request.json["classificacao"][classificacao]["sintomas"]:
            # verifica se existe sintoma
            req = request.json["classificacao"][classificacao]["sintomas"]
            sintomaExists = False
            registroSintomaExists = False

            sintomaStr = sintoma["sintoma"] if "sintoma" in sintoma.keys() else False
            descritorStr = (
                sintoma["descritor"] if "descritor" in sintoma.keys() else False
            )

            result = (
                session.query(
                    Sintomas.ID.label("ID"),
                    Sintomas.sintoma.label("sintoma"),
                    Sintomas.descritor.label("descritor"),
                )
                .filter(Sintomas.sintoma == sintomaStr)
                .filter(Sintomas.descritor == descritorStr)
                .all()
            )

            sintomaExists = len(result) > 0

            sintomaStr = sintoma["sintoma"] if "sintoma" in sintoma.keys() else False
            descritorStr = (
                sintoma["descritor"] if "descritor" in sintoma.keys() else False
            )

            result = (
                session.query(
                    RegistrosSintomas.ID.label("ID"),
                    RegistrosSintomas.id_qp.label("id_qp"),
                    RegistrosSintomas.id_classificacao.label("id_classificacao"),
                    RegistrosSintomas.sintoma.label("sintoma"),
                    RegistrosSintomas.descritor.label("descritor"),
                )
                .filter(RegistrosSintomas.sintoma == sintomaStr)
                .filter(RegistrosSintomas.descritor == descritorStr)
                .filter(RegistrosSintomas.id_qp == qpID)
                .all()
            )

            registroSintomaExists = len(result) > 0

            # caso não exista sintoma, adiciona
            if not sintomaExists:
                sintomaStr = sintoma["sintoma"] if "sintoma" in sintoma.keys() else ""
                descritorStr = (
                    sintoma["descritor"] if "descritor" in sintoma.keys() else ""
                )
                sintoma = Sintomas(sintoma=sintomaStr, descritor=descritorStr)
                session.add(sintoma)
                session.commit()

            # caso não exista registro de sintoma, adiciona
            if not registroSintomaExists:
                sintomaStr = sintoma["sintoma"] if "sintoma" in sintoma.keys() else ""
                descritorStr = (
                    sintoma["descritor"] if "descritor" in sintoma.keys() else ""
                )
                registro_sintoma = RegistrosSintomas(
                    id_qp=qpID,
                    id_classificacao=getClassificacaoId(classificacao),
                    sintoma=sintomaStr,
                    descritor=descritorStr,
                )
                session.add(registro_sintoma)
                session.commit()

        sinais = (
            request.json["classificacao"][classificacao]["sinais"]
            if "sinais" in request.json["classificacao"][classificacao].keys()
            else []
        )
        for sinal in sinais:
            # verifica se existe sinal
            req = sinais
            sinalExists = False

            minStr = sinais[sinal]["min"] if "min" in sinais[sinal].keys() else ""
            minStr = minStr if minStr != "" else False
            maxStr = sinais[sinal]["max"] if "max" in sinais[sinal].keys() else ""
            maxStr = maxStr if maxStr != "" else False
            descritorStr = (
                sinais[sinal]["descritor"]
                if "descritor" in sinais[sinal].keys()
                else False
            )

            result = session.query(RegistrosSinais).filter(
                RegistrosSinais.id_qp == qpID
            )

            if descritorStr:
                result = result.filter(RegistrosSinais.descritor == descritorStr)

            if minStr:
                result = result.filter(RegistrosSinais.min == minStr)

            if maxStr:
                result = result.filter(RegistrosSinais.max == maxStr)

            result = result.filter(
                RegistrosSinais.id_classificacao == getClassificacaoId(classificacao)
            ).all()

            sinalExists = len(result) > 0

            # caso não exista registro de sintoma, adiciona
            if not sinalExists:
                minStr = (
                    sinais[sinal]["min"] if "min" in sinais[sinal].keys() else "NULL"
                )
                minStr = minStr if minStr != "" else "NULL"
                maxStr = (
                    sinais[sinal]["max"] if "max" in sinais[sinal].keys() else "NULL"
                )
                maxStr = maxStr if maxStr != "" else "NULL"
                descritorStr = (
                    sinais[sinal]["descritor"]
                    if "descritor" in sinais[sinal].keys()
                    else ""
                )
                registro_sinal = RegistrosSinais(
                    id_qp=qpID,
                    id_sinal=getSinalId(sinal),
                    id_classificacao=getClassificacaoId(classificacao),
                    min=minStr,
                    max=maxStr,
                    descritor=descritorStr,
                )
                session.add(registro_sinal)
                session.commit()
    # Verifica foreach de classificacao
    # Verifica dentro sinal
    # Verifica dentro sintoma
    return jsonify(request.json)


@v1_blueprint.route("/edit", methods=["PUT"])
@provide_session
def edit(session=None):
    # Verifica qp
    print(request.json["qp"])
    if request.json["qp"]["categoria"] == "":
        request.json["qp"]["categoria"] = "NULL"

    queixa_principal = (
        session.query(QueixasPrincipais)
        .filter(QueixasPrincipais.ID == request.json["qp"]["ID"])
        .first()
    )

    queixa_principal.sintoma = request.json["qp"]["sintoma"]
    queixa_principal.observacao = request.json["qp"]["observacao"]
    queixa_principal.categoria = request.json["qp"]["categoria"]

    session.commit()

    # verifica sinais
    for cor, value in request.json["classificacao"].items():
        for identificador, sinal in value["sinais"].items():
            # print('VALOR --------',sinal, 'ID' in sinal)
            min = sinal["min"] if "min" in sinal.keys() else "NULL"
            min = min if min != "" and min else "NULL"
            max = sinal["max"] if "max" in sinal.keys() else "NULL"
            max = max if max != "" and max else "NULL"
            descritor = sinal["descritor"] if "descritor" in sinal.keys() else "NULL"
            descritor = descritor if descritor != "" and descritor else ""

            if "ID" in sinal:
                if sinal["min"] == (None or "") and sinal["max"] == (None or ""):
                    # exclui sinal

                    registro_sinal = (
                        session.query(RegistrosSinais)
                        .filter(RegistrosSinais.ID == sinal["ID"])
                        .first()
                    )
                    session.delete(registro_sinal)
                    session.commit()
                else:
                    # Atualiza sinal
                    registro_sinal = (
                        session.query(RegistrosSinais)
                        .filter(RegistrosSinais.ID == sinal["ID"])
                        .first()
                    )
                    registro_sinal.min = min
                    registro_sinal.max = max
                    registro_sinal.descritor
                    session.commit()
            else:
                registro_sinal = RegistrosSinais(
                    id_qp=request.json["qp"]["ID"],
                    id_sinal=getSinalId(identificador),
                    min=min,
                    max=max,
                    id_classificacao=getClassificacaoId(cor),
                    descritor=descritor,
                )
                session.add(registro_sinal)
                session.commit()
        for sintoma in value["sintomas"]:
            print("SINTOMA", sintoma)
            nome_sintoma = sintoma["sintoma"] if "sintoma" in sintoma.keys() else "NULL"
            nome_sintoma = (
                nome_sintoma if nome_sintoma != "" and nome_sintoma else "NULL"
            )
            descritor = (
                sintoma["descritor"] if "descritor" in sintoma.keys() else "NULL"
            )
            descritor = (
                descritor
                if descritor != "" and descritor and descritor != "NULL"
                else ""
            )

            if "ID" in sintoma.keys():
                if nome_sintoma == "NULL" and descritor == "":
                    # exclui sintoma
                    print("Exclui sintoma")
                    registro_sintoma = (
                        session.query(RegistrosSintomas)
                        .filter(RegistrosSintomas.ID == id)
                        .first()
                    )
                    session.delete(registro_sintoma)
                    session.commit()
                else:
                    # Atualiza sintoma
                    print("atualiza sintoma")
                    registro_sintoma = (
                        session.query(RegistrosSintomas)
                        .filter(RegistrosSintomas.ID == sintoma["ID"])
                        .first()
                    )
                    registro_sintoma.sintoma = nome_sintoma
                    registro_sintoma.descritor = descritor
                    session.commit()

            else:
                print("novo sintoma")
                registro_sintoma = RegistrosSintomas(
                    id_qp=request.json["qp"]["ID"],
                    id_classificacao=getClassificacaoId(cor),
                    sintoma=nome_sintoma,
                    descritor=descritor,
                )
                session.add(registro_sintoma)
                session.commit()
    return jsonify(request.json)


@v1_blueprint.route("/specs")
def specs():
    swag = swagger(app)
    swag["info"]["version"] = "1.0"
    swag["info"]["title"] = "My API"
    return jsonify(swag)