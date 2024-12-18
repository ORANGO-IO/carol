from models.classificacao import Classificacao
from utils.db import provide_session
from models.categorias import Categorias


@provide_session
def getClassificacao(id: int, session=None) -> "Classificacao":
    result = (
        session.query(
            Classificacao.ID.label("id"),
            Classificacao.prioridade.label("prioridade"),
            Classificacao.nome.label("nome"),
            Classificacao.descritor.label("descritor"),
            Classificacao.tempo.label("tempo"),
            Classificacao.cor_hex.label("cor_hex"),
        )
        .filter(Classificacao.ID == id)
        .first()
    )

    if result:
        return result._asdict()
    else:
        return {}


@provide_session
def getCategoriaNome(id: int, session=None) -> str:
    result = (
        session.query(
            Categorias.ID.label("id"), Categorias.categoria.label("categoria")
        )
        .filter(Categorias.ID == id)
        .first()
    )

    if result:
        return result._asdict()
    else:
        return {}
