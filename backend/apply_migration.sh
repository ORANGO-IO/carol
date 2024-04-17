set -e
export $(grep -v '^#' .env | xargs) &&
export PYTHONPATH=$(pwd) &&
alembic upgrade head
