from sqlalchemy import Column, BigInteger, VARCHAR
from .base import Base


class Categorias(Base):
    __tablename__ = "categorias"

    id = Column(BigInteger, primary_key=True)
    nome = Column(VARCHAR(50))
