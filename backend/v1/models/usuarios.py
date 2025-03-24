from sqlalchemy import Column, BigInteger, Text, VARCHAR
from .base import Base


class Usuarios(Base):
    __tablename__ = "usuarios"

    ID = Column(BigInteger, primary_key=True)
    email = Column(VARCHAR(256))
    senha = Column(Text)
