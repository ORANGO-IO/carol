from sqlalchemy import Column, BigInteger, Text, DECIMAL
from .base import Base


class RegistrosSinais(Base):
    __tablename__ = "registros_sinais"

    ID = Column(BigInteger, primary_key=True)
    id_qp = Column(BigInteger, nullable=False)
    id_sinal = Column(BigInteger, nullable=False)
    id_classificacao = Column(BigInteger, nullable=False)
    min = Column(DECIMAL(4, 1))
    max = Column(DECIMAL(4, 1))
    descritor = Column(Text)
