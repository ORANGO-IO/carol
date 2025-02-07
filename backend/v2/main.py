from flask import jsonify, request, Blueprint
from flask_swagger import swagger
from pprint import pprint
from sqlalchemy import func
import sys

from .calc import calc
from .functions import (
    get_classificacao,
    get_qp,
    get_sinal,
    get_sinal_id,
    get_sintomas_descritivos_by_sintoma_ids,
)
from .utils.db import provide_session
from .models.classificacao import Classificacao
from .models.sinais import Sinais
from .models.queixas_principais import QueixasPrincipais
from .models.sintomas_sinonimos import SintomasSinonimos
from .models.queixas_sinais_classificacao import QueixasSinaisClassificacao
from .models.queixas_sintomas_classificacao import QueixasSintomasClassificacao
from .models.sintomas import Sintomas
from .models.categorias import Categorias
from .models.vulnerabilidades import Vulnerabilidades

base_blueprint = Blueprint("base", __name__, url_prefix="/api")

@base_blueprint.route("/")
def hello():
    """Retorna uma mensagem de saudação."""
    return "Hello World from CAROL V2!"

@base_blueprint.route("/sintomas_descritivos")
@provide_session
def inserir_sintomas_descritivos(session=None):
    """Insere sintomas descritivos a partir do payload JSON."""
    sintomas = request.json.get("sintomas_descritivos", [])
    for sintoma in sintomas:
        novo_sintoma = QueixasSintomasClassificacao(
            fk_queixa=sintoma["id_queixa"],
            fk_classificacao=sintoma["id_classificacao"],
            fk_sintoma=sintoma["id_sintoma"],
            descritor=sintoma["descritor"],
            revisado_por=sintoma["revisado_por"],
        )
        session.add(novo_sintoma)
    session.commit()
    return jsonify(sintomas), 201

def processa_resultado(result, value):
    """Filtra cada linha retornada da consulta."""
    processed = []
    for row in result:
        row_dict = row._asdict()
        min_val = row_dict.get("min") or 0
        max_val = row_dict.get("max") or 0
        if min_val and max_val and min_val < max_val:
            if (min_val >= value or not min_val) or (max_val <= value or not max_val):
                processed.append(row_dict)
        else:
            if (min_val >= value or not min_val) and (max_val <= value or not max_val):
                processed.append(row_dict)
    return processed

@base_blueprint.route("/filter")
@provide_session
def filter(session=None):
    """Filtra resultados baseados nos sintomas enviados pela query."""
    pprint(request.args)
    data = []
    categoria = request.args.get("categoria")
    sintomas_param = request.args.get("sintomas", "")
    sintomas_list = sintomas_param.split(",") if sintomas_param else []

    # Itera apenas sobre os itens que representam sinais (excluindo 'categoria' e 'sintomas')
    for key, value in request.args.items():
        if key in ["categoria", "sintomas"]:
            continue

        if value and value != "NaN":
            try:
                valor_float = float(value)
            except ValueError:
                continue

            sinal_id = get_sinal_id(key)
            query = (
                session.query(
                    QueixasSinaisClassificacao.id,
                    QueixasSinaisClassificacao.fk_queixa.label("id_qp"),
                    QueixasSinaisClassificacao.fk_sinal.label("id_sinal"),
                    QueixasSinaisClassificacao.fk_classificacao.label("id_classificacao"),
                    func.coalesce(QueixasSinaisClassificacao.min, 0).label("min"),
                    func.coalesce(QueixasSinaisClassificacao.max, 0).label("max"),
                    QueixasSinaisClassificacao.descritor.label("descritor"),
                )
                .filter(QueixasSinaisClassificacao.fk_sinal == sinal_id)
            )
            resultados = query.all()
            if not resultados:
                continue

            filtrados = processa_resultado(resultados, valor_float)
            for result in filtrados:
                result["sinal"] = get_sinal(result["id_sinal"])
                result["classificacao"] = get_classificacao(result["id_classificacao"])
                result["qp"] = get_qp(result["id_qp"])
                result["sintomas_descritivos"] = get_sintomas_descritivos_by_sintoma_ids(
                    sintomas_list, result["id_qp"]
                )

            # Filtra por categoria se necessária
            if categoria != "null":
                filtrados = [
                    m for m in filtrados
                    if m["qp"].get("categoria") == int(categoria) or not m["qp"].get("categoria")
                ]
            else:
                filtrados = [m for m in filtrados if not m["qp"].get("categoria")]

            sinal_info = get_sinal(sinal_id)
            sinal_info["matches"] = filtrados
            data.append(sinal_info)
    return calc(data)

def query_to_json(query_result):
    """Converte o resultado da consulta para lista de dicionários."""
    return [row._asdict() for row in query_result] if query_result else []

@base_blueprint.route("/classificacao")
@provide_session
def classificacao(session=None):
    """Retorna a lista de classificações de risco."""
    result = session.query(
        Classificacao.ID.label("ID"),
        Classificacao.prioridade.label("prioridade"),
        Classificacao.nome.label("nome"),
        Classificacao.descritor.label("descritor"),
        Classificacao.tempo.label("tempo"),
        Classificacao.cor_hex.label("cor_hex"),
    ).all()
    return jsonify(query_to_json(result))

@base_blueprint.route("/sinais")
@provide_session
def sinais(session=None):
    """Retorna a lista dos sinais cadastrados."""
    query = (
        session.query(
            Sinais.ID.label("ID"),
            Sinais.nome.label("nome"),
            Sinais.descritor.label("descritor"),
            Sinais.identificador.label("identificador"),
            Sinais.unidade.label("unidade"),
        )
        .order_by(Sinais.identificador.desc())
    )
    result = query.all()
    return jsonify(query_to_json(result))

@base_blueprint.route("/sintomas")
@provide_session
def sintomas(session=None):
    """Retorna a lista dos sintomas cadastrados."""
    query = (
        session.query(
            Sintomas.ID.label("ID"),
            Sintomas.sintoma.label("sintoma"),
            Sintomas.descritor.label("descritor"),
        )
        .order_by(Sintomas.sintoma.asc())
    )
    result = query.all()
    return jsonify(query_to_json(result))

@base_blueprint.route("/categorias")
@provide_session
def categorias(session=None):
    """Retorna a lista das categorias de queixas principais cadastradas."""
    result = session.query(
        Categorias.ID.label("ID"),
        Categorias.categoria.label("categoria"),
    ).all()
    return jsonify(query_to_json(result))

@base_blueprint.route("/vulnerabilidades")
@provide_session
def vulnerabilidades(session=None):
    """Retorna a lista de vulnerabilidades cadastradas."""
    result = session.query(
        Vulnerabilidades.id.label("id"),
        Vulnerabilidades.nome.label("nome"),
        Vulnerabilidades.criado_por.label("criado_por"),
        Vulnerabilidades.atualizado_em.label("atualizado_em"),
    ).all()
    return jsonify(query_to_json(result))

@base_blueprint.route("/qp", methods=["GET", "PUT"])
@provide_session
def qp(session=None):
    """Retorna a lista de queixas principais ou insere uma nova."""
    if request.method == "GET":
        
        queixa_query = (
            session.query(
                QueixasPrincipais.id.label("id"),
                QueixasPrincipais.queixa_principal.label("queixa_principal"),
                QueixasPrincipais.observacoes.label("observacoes"),
                func.group_concat(func.distinct(Sintomas.sintoma)).label("sintomas"),
                func.group_concat(func.distinct(SintomasSinonimos.sinonimos)).label("sinonimos"),
            )
            .outerjoin(
                QueixasSintomasClassificacao,
                QueixasPrincipais.id == QueixasSintomasClassificacao.fk_queixa
            )
            .outerjoin(Sintomas, Sintomas.id == QueixasSintomasClassificacao.fk_sintoma)
            .outerjoin(SintomasSinonimos, SintomasSinonimos.fk_sintoma == Sintomas.id)
            .group_by(
                QueixasPrincipais.id,
                QueixasPrincipais.queixa_principal,
                QueixasPrincipais.observacoes
            )
        )
        queixas = queixa_query.all()
        resp = []
        for q in queixas:
            sintomas_list = q.sintomas.split(",") if q.sintomas else []
            sinonimos_list = q.sinonimos.split(",") if q.sinonimos else []
            resp.append(
                {
                    "id": q.id,
                    "queixa_principal": q.queixa_principal,
                    "observacoes": q.observacoes,
                    "sintomas": list(set(sintomas_list)),
                    "sinonimos": list(set(sinonimos_list)),
                }
            )
        return jsonify(resp)
    else:
        req = request.json.get("qp", {})
        nova_queixa = QueixasPrincipais(
            queixa_principal=req.get("queixa_principal"),
            observacoes=req.get("observacoes"),
            fk_categoria=req.get("categoria_id"),
        )
        session.add(nova_queixa)
        session.commit()
        return jsonify(req)

@base_blueprint.route("/specs/v2")
def specs():
    """Retorna a especificação Swagger da API."""
    swag = swagger(base_blueprint)
    swag["info"]["version"] = "1.0"
    swag["info"]["title"] = "My API v2"
    return jsonify(swag)
