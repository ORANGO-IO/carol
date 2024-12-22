from sqlalchemy import Column, BigInteger, DECIMAL, Text, ForeignKey
from .base import Base
from .queixas_principais import QueixasPrincipais
from .sinais import Sinais
from .classificacao import Classificacao


class QueixasSinaisClassificacao(Base):
    __tablename__ = "queixas_sinais_classificacao"

    id = Column(BigInteger, primary_key=True)
    fk_queixa = Column(BigInteger, ForeignKey(QueixasPrincipais.id))
    fk_sinal = Column(BigInteger, ForeignKey(Sinais.id))
    fk_classificacao = Column(BigInteger, ForeignKey(Classificacao.id))
    min = Column(DECIMAL(5, 2))
    max = Column(DECIMAL(5, 2))
    descritor = Column(Text)
