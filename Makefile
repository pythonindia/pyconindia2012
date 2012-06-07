
VENV=.

run:
	mkdir -p static/css static/js
	$(VENV)/bin/uwsgi -H $(VENV) --http 127.0.0.1:7001 --wsgi webapp -p1 -t 5

venv:
	virtualenv $(VENV)
	$(VENV)/bin/pip install -r requirements.txt

