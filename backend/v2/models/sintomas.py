from sqlalchemy import Column, BigInteger, Text, VARCHAR
from .base import Base


class Sintomas(Base):
    __tablename__ = "sintomas"

    id = Column(BigInteger, primary_key=True)
    sintoma = Column(VARCHAR(256))
    descritor = Column(Text)
