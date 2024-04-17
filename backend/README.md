Para rodar localmente
```sh
export FLASK_APP=main.py
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=8083
```

Para rodar em produção
```sh
gunicorn -b 0.0.0.0:8880 -w 1 main:app
```