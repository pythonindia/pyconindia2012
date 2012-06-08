
VENV=.

.PHONY: funnel run

run:
	mkdir -p static/css static/js
	cp funnel-settings.py funnel/settings.py
	$(VENV)/bin/uwsgi --ini uwsgi.ini

venv:
	virtualenv $(VENV)
	$(VENV)/bin/pip install -r requirements.txt

bootstrap:
	wget -O funnel/test.db http://anandology.com/tmp/pyconindia-funnel.db
