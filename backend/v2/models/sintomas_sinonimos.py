from sqlalchemy import Column, BigInteger, VARCHAR, ForeignKey, DateTime
from .queixas_principais import QueixasPrincipais
from .sintomas import Sintomas
from .classificacao import Classificacao
from .base import Base


class SintomasSinonimos(Base):
    __tablename__ = "sintomas_sinonimos"

    id = Column(BigInteger, primary_key=True)
    fk_queixa = Column(BigInteger, ForeignKey(QueixasPrincipais.id))
    fk_sintoma = Column(BigInteger, ForeignKey(Sintomas.id))
    fk_classificacao = Column(BigInteger, ForeignKey(Classificacao.id))
    descritor = Column(VARCHAR(256))
    sinonimos = Column(VARCHAR(256))
    revisado_por = Column(VARCHAR(256))
    atualizado_em = Column(DateTime)
