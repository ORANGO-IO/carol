from sqlalchemy import Column, BigInteger, DateTime, VARCHAR
from .base import Base

class Vulnerabilidades(Base):
    __tablename__ = "vulnerabilidade"

    id = Column(BigInteger, primary_key=True)
    nome = Column(VARCHAR(100))
    criado_por = Column(VARCHAR(100))
    atualizado_em = Column(DateTime)