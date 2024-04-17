FROM python:3.7-alpine

RUN apk add --no-cache --update python3-dev gcc build-base zlib-dev jpeg-dev python3-dev musl-dev mariadb-dev

WORKDIR /app

ENV PYTHONUNBUFFERED=TRUE

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 5000

ENTRYPOINT ["sh", "entrypoint.sh"]
