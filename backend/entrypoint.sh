# /bin/sh

rm -rf /srv/logs
mkdir /srv/logs/
touch /srv/logs/gunicorn.log
touch /srv/logs/access.log
tail -n 0 -f /srv/logs/*.log &

echo Starting Gunicorn
# flask run
exec gunicorn main:app \
     --bind 0.0.0.0:5000 \
     --chdir /app \
     --workers 3 \
     --log-level=debug \
     --log-file=/srv/logs/gunicorn.log \
     --access-logfile=/srv/logs/access.log \
     --timeout 600
     --reload

