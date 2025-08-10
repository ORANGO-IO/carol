from sqlalchemy import Column, BigInteger, VARCHAR, Text, CHAR
from .base import Base


class Classificacao(Base):
    __tablename__ = "classificacao"

    ID = Column(BigInteger, primary_key=True)
    prioridade = Column(BigInteger)
    nome = Column(VARCHAR(20))
    descritor = Column(Text)
    tempo = Column(VARCHAR(100))
    cor_hex = Column(CHAR(6))
