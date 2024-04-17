from sqlalchemy import create_engine
import os
from pymysql.constants import CLIENT

SQL_ALCHEMY_CONN = os.getenv("SQL_ALCHEMY_CONN")
engine = create_engine(SQL_ALCHEMY_CONN, connect_args={"client_flag": CLIENT.MULTI_STATEMENTS})
