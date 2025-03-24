from sqlalchemy import Column, BigInteger, Text, VARCHAR, ForeignKey, DateTime
from .base import Base
from .queixas_principais import QueixasPrincipais
from .sintomas import Sintomas
from .classificacao import Classificacao


class QueixasSintomasClassificacao(Base):
    __tablename__ = "queixas_sintomas_classificacao"

    id = Column(BigInteger, primary_key=True)
    fk_queixa = Column(BigInteger, ForeignKey(QueixasPrincipais.id))
    fk_sintoma = Column(BigInteger, ForeignKey(Sintomas.id))
    fk_classificacao = Column(BigInteger, ForeignKey(Classificacao.id))
    descritor = Column(Text)
    revisado_por = Column(VARCHAR(256))
    atualizado_em = Column(DateTime)
