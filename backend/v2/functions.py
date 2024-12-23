from .models.classificacao import Classificacao
from .utils.db import provide_session
from .models.categorias import Categorias


@provide_session
def getClassificacao(id: int, session=None) -> "Classificacao":
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
def getCategoriaNome(id: int, session=None) -> str:
    result = (
        session.query(
            Categorias.id.label("id"), Categorias.nome.label("categoria")
        )
        .filter(Categorias.id == id)
        .first()
    )

    if result:
        return result._asdict()
    else:
        return {}
