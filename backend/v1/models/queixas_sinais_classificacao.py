from sqlalchemy import Column, BigInteger, DECIMAL, Text, ForeignKey
from .base import Base
from .queixas_principais import QueixasPrincipais
from .sinais import Sinais
from .classificacao import Classificacao


class QueixasSinaisClassificacao(Base):
    __tablename__ = "queixas_sinais_classificacao"

    id = Column(BigInteger, primary_key=True)
    fk_queixa = Column(BigInteger, ForeignKey(QueixasPrincipais.ID))
    fk_sinal = Column(BigInteger, ForeignKey(Sinais.ID))
    fk_classificacao = Column(BigInteger, ForeignKey(Classificacao.ID))
    min = Column(DECIMAL(5, 2))
    max = Column(DECIMAL(5, 2))
    descritor = Column(Text)
