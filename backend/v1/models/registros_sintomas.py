from sqlalchemy import Column, BigInteger, Text, VARCHAR
from .base import Base


class RegistrosSintomas(Base):
    __tablename__ = "registros_sintomas"

    ID = Column(BigInteger, primary_key=True)
    id_qp = Column(BigInteger)
    id_classificacao = Column(BigInteger)
    sintoma = Column(VARCHAR(125))
    descritor = Column(Text)
