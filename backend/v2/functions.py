from .models.classificacao import Classificacao
from .utils.db import provide_session
from .models.categorias import Categorias
from .models.classificacao import Classificacao
from .models.sinais import Sinais
from .models.queixas_principais import QueixasPrincipais
from .models.queixas_sintomas_classificacao import QueixasSintomasClassificacao

@provide_session
def get_classificacao(id: int, session=None) -> "Classificacao":
    result = (
        session.query(
            Classificacao.id,
            Classificacao.prioridade,
            Classificacao.classificacao,
            Classificacao.descritor,
            Classificacao.tempo_atendimento,
            Classificacao.cor_hex,
        )
        .filter(Classificacao.id == id)
        .first()
    )

    if result:
        return result._asdict()
    else:
        return {}


@provide_session
def get_categoria_nome(id: int, session=None) -> str:
    result = (
        session.query(
            Categorias.id, Categorias.nome.label("categoria")
        )
        .filter(Categorias.id == id)
        .first()
    )

    if result:
        return result._asdict()
    else:
        return {}

@provide_session
def get_sintomas_descritivos_by_sintoma_ids(ids: list, qp:int,session=None) -> list:
    result = (
        session.query(
            QueixasSintomasClassificacao.id,
            Classificacao.prioridade.label("prioridade_classificacao"),
            Classificacao.id.label("classificacao_id"),
        )
        .outerjoin(Classificacao, QueixasSintomasClassificacao.fk_classificacao == Classificacao.id)
        .filter(QueixasSintomasClassificacao.fk_sintoma.in_(ids))
        .filter(QueixasSintomasClassificacao.fk_queixa == qp)
        .all()
    )

    if result:
        return [x._asdict() for x in result]
    return []

@provide_session
def get_qp(id: int, session=None) -> list:
    result = (
        session.query(
            QueixasPrincipais.id,
            QueixasPrincipais.queixa_principal,
            QueixasPrincipais.observacoes,
            QueixasPrincipais.fk_categoria.label("categoria"),
        )
        .filter(QueixasPrincipais.id == id)
        .first()
    )
    if result:
        return result._asdict()
    
@provide_session
def get_sinal(id: int, session=None) -> list:
    result = (
        session.query(
            Sinais.id,
            Sinais.sinal,
            Sinais.descritor,
            Sinais.identificador,
            Sinais.unidade,
        )
        .filter(Sinais.id == id)
        .first()
    )
    if result:
        return result._asdict()


@provide_session
def get_sinal_id(identificador: str, session=None) -> int:
    result = session.query(Sinais).filter(
        Sinais.identificador == identificador).first()
    if result:
        return result.id


@provide_session
def get_classificacao_nome(id: int, session=None) -> str:
    result = session.query(Classificacao).filter(
        Classificacao.ID == id).first()
    if result:
        return result.nome

@provide_session
def get_classificacao_id(identificador: str, session=None) -> int:
    result = (
        session.query(Classificacao).filter(
            Classificacao.nome == identificador).first()
    )
    if result:
        return result.ID

