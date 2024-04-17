from settings import engine
from contextlib import closing
from sqlalchemy import text


def populate_db():
    with closing(engine.connect().execution_options(autocommit=True)) as conn, open(
        "./db_backup/data.sql", encoding="utf-8"
    ) as sql:
        conn.execute(text(sql.read()))


if __name__ == "__main__":
    populate_db()
