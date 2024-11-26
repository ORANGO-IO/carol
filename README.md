# C.A.R.O.L.

Classificação de Agravos Reais Objetiva e Ligeira

Uma Aplicação idealizada e desenvolvida por https://github.com/filiperochalopes
com a colaboração de:

- https://github.com/brennoflavio (Desenvolvedor)

Utilitário Web para triagem de pessoas por sinais, tendo como referência
consultável o Protocolo do Hospital de Brasília. Mais informações e Live:
https://carol.orango.io

Em breve V2

## Docker structure

```
-> docker-compose.yml > Docker orchestration file
-> backend/Dockerfile > Main dockerfile for backend
-> frontend/Dockerfile > Main dockerfile for frontend
```

## Installation

Securing database

1. Change db name, password, and user on `docker.compose.yml`, at
   `services.db.environment`
2. Change host port on `docker-compose.yml` at `services.db.ports.0`. Schema is
   host:container, so if you want your database exposed on 3307, ports will be
   3307:3306
3. Change db string on `docker-compose.yml` at
   `services.backend.environment.SQL_ALCHEMY_CONN`. Schema is
   `mysql://user:password@host:port/dbname`
4. Change SQL_ALCHEMY_CONN env var on `backend/.env`

Setting up database

1. On one terminal, up database

```
docker-compose build
docker-compose up
```

2. On another terimnal, run:

```
docker-compose exec backend sh apply_migration.sh
```

You'll see:

```
INFO  [alembic.runtime.migration] Context impl MySQLImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade  -> 8b28bc483f45, first migration
```

4. Insert data

```
docker-compose exec backend python populate_db.py
```

You should see no outputs

5. Close db typing `ctrl + c` on first terminal

If you want to change backend port from 5000:

1. Configure proper backend port at `backend/Dockerfile`
2. Configure `backend/entrypoint.sh` e `backend/entrypoint-dev.sh` changing its
   ports
3. Change expose port on `dockerfile.yml`, on `services.backend.ports.0`
4. Make sure port changed on backend is same on `frontend/.env.development` and
   `frontend/.env.production`

If you want to change frontend port from 80:

1. Edit `frontend/Dockerfile`to exporte another port, and to CMD to another port
2. Change `docker-compose.yml` to reflect your new port, on
   `services.frontend.ports.0`
3. Change expose port on `dockerfile.yml`, on `services.frontend.ports.0`

To build:

```
docker-compose build
```

To run:

```
docker-compose up -d
```

To stop:

```
docker-compose stop
```
