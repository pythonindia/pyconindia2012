
VENV=.

.PHONY: funnel run

run:
	mkdir -p static/css static/js
	$(VENV)/bin/python webapp.py

funnel: 
	cp funnel-settings.py funnel/settings.py
	$(VENV)/bin/python funnel/website.py

venv:
	virtualenv $(VENV)
	$(VENV)/bin/pip install -r requirements.txt

