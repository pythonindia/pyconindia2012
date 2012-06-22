
VENV=.

.PHONY: funnel run copy clean bootstrap

run: copy
	mkdir -p static/css static/js
	cp funnel-settings.py funnel/settings.py
	$(VENV)/bin/uwsgi --ini uwsgi.ini

venv:
	virtualenv --no-site-packages $(VENV)
	$(VENV)/bin/pip install -r requirements.txt

bootstrap:
	wget -O funnel/test.db http://anandology.com/tmp/pyconindia-funnel.db

copy:
	rsync -av overwrites/* .

clean:
	cd funnel && git reset --hard
