
VENV=$(PWD)

.PHONY: funnel run copy clean bootstrap

run: copy
	mkdir -p static/css static/js
	$(VENV)/bin/uwsgi --ini uwsgi.ini

eventframe: copy
	cd eventframe && $(VENV)/bin/python runserver.py

venv:
	virtualenv --no-site-packages $(VENV)
	$(VENV)/bin/pip install -r requirements.txt

bootstrap:
	wget -O var/pyconindia-funnel.db http://anandology.com/tmp/pyconindia-funnel.db
	wget -O var/pyconindia.db http://anandology.com/tmp/pyconindia.db

copy:
	cp funnel-settings.py funnel/settings.py
	mkdir -p var/eventframe-instance
	cp eventframe-settings.py var/eventframe-instance/settings.py

clean:
	cd funnel && git reset --hard
