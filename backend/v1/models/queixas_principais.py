from sqlalchemy import Column, BigInteger, VARCHAR, Text, ForeignKey
from .base import Base
from .categorias import Categorias


class QueixasPrincipais(Base):
    __tablename__ = "queixas_principais"

    ID = Column(BigInteger, primary_key=True)
    sintoma = Column(VARCHAR(256))
    observacao = Column(Text)
    categoria = Column(BigInteger, ForeignKey(Categorias.ID))
