from sqlalchemy import Column, BigInteger, Text, VARCHAR
from .base import Base


class Sinais(Base):
    __tablename__ = "sinais"

    ID = Column(BigInteger, primary_key=True)
    identificador = Column(VARCHAR(100))
    nome = Column(VARCHAR(100))
    unidade = Column(VARCHAR(20))
    descritor = Column(Text)
