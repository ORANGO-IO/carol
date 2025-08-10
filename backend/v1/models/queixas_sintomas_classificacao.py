from sqlalchemy import Column, BigInteger, Text, VARCHAR, ForeignKey
from .base import Base
from .queixas_principais import QueixasPrincipais
from .sintomas import Sintomas
from .classificacao import Classificacao


class QueixasSintomasClassificacao(Base):
    __tablename__ = "queixas_sintomas_classificacao"

    id = Column(BigInteger, primary_key=True)
    fk_queixa = Column(BigInteger, ForeignKey(QueixasPrincipais.ID))
    fk_sintoma = Column(BigInteger, ForeignKey(Sintomas.ID))
    fk_classificacao = Column(BigInteger, ForeignKey(Classificacao.ID))
    descritor = Column(Text)
    tmp_sintoma = Column(VARCHAR(256))
