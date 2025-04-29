from sqlalchemy import Column, BigInteger, VARCHAR
from .base import Base


class Categorias(Base):
    __tablename__ = "categorias"

    ID = Column(BigInteger, primary_key=True)
    categoria = Column(VARCHAR(50))
