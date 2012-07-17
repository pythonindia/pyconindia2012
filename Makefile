
VENV=$(PWD)

.PHONY: funnel run copy clean bootstrap

run: copy
	mkdir -p static/css static/js
	cp funnel-settings.py funnel/settings.py
	$(VENV)/bin/uwsgi --ini uwsgi.ini

eventframe: copy
	cp eventframe-settings.py eventframe/instance/settings.py
	cd eventframe && ln -sF ../themes .
	cd eventframe && $(VENV)/bin/python runserver.py

venv:
	virtualenv --no-site-packages $(VENV)
	$(VENV)/bin/pip install -r requirements.txt

bootstrap:
	wget -O funnel/test.db http://anandology.com/tmp/pyconindia-funnel.db

copy:
	rsync -av overwrites/* .

clean:
	cd funnel && git reset --hard
