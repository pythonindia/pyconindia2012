
VENV=.

run:
	mkdir -p static/css static/js
	$(VENV)/bin/python webapp.py

venv:
	virtualenv $(VENV)
	$(VENV)/bin/pip install -r requirements.txt

