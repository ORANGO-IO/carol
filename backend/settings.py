from sqlalchemy import create_engine
import os
from pymysql.constants import CLIENT

SQL_ALCHEMY_CONN_V1 = os.getenv("SQL_ALCHEMY_CONN_V1")
SQL_ALCHEMY_CONN_V2 = os.getenv("SQL_ALCHEMY_CONN_V2")

engine = create_engine(SQL_ALCHEMY_CONN_V1, connect_args={"client_flag": CLIENT.MULTI_STATEMENTS})
engine2 = create_engine(SQL_ALCHEMY_CONN_V2, connect_args={"client_flag": CLIENT.MULTI_STATEMENTS})
