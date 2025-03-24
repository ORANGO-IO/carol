from sqlalchemy import Column, BigInteger, Text, ForeignKey
from .base import Base
from .categorias import Categorias


class QueixasPrincipais(Base):
    __tablename__ = "queixas_principais"

    id = Column(BigInteger, primary_key=True)
    queixa_principal = Column(Text)
    observacoes = Column(Text)
    fk_categoria = Column(BigInteger, ForeignKey(Categorias.id))
