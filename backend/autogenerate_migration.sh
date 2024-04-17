set -e
export $(grep -v '^#' .env | xargs) &&
export PYTHONPATH=$(pwd) &&
alembic revision --autogenerate -m "$1"
