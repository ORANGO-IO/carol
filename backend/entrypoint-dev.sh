export FLASK_RUN_PORT=5000
export FLASK_APP=app:app
export FLASK_ENV=development

python3 -m flask run --host=0.0.0.0
