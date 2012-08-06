# -*- coding: utf-8 -*-
#: Site title
SITE_TITLE = 'HasGeek Eventframe'
#: Site id (for network bar)
SITE_ID = 'events'
#: Admin domains. The first is considered primary
ADMIN_HOSTS = ['0.0.0.0', '127.0.0.1', 'admin.in.pycon.org']
#: Using SSL?
USE_SSL = True

import os
dbpath = os.path.abspath("var/pyconindia.db")

#: Database backend
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + dbpath
#: Secret key
SECRET_KEY = 'make this something random'
#: Timezone
TIMEZONE = 'Asia/Calcutta'
#: LastUser server
LASTUSER_SERVER = 'https://auth.hasgeek.com/'
#: LastUser client id
LASTUSER_CLIENT_ID = 'Ft7DShD6TXuWWNQR3a23Ng'
#: LastUser client secret
LASTUSER_CLIENT_SECRET = 'SOmDVUGwTZSlc4V-HNIqvQzp53UkcyQDC-boHoE4zeLQ'
#: Path to site themes (must be an absolute path)
#THEME_PATHS = '../themes'
THEME_PATHS = 'themes'
#: Mail settings
#: MAIL_FAIL_SILENTLY : default True
#: MAIL_SERVER : default 'localhost'
#: MAIL_PORT : default 25
#: MAIL_USE_TLS : default False
#: MAIL_USE_SSL : default False
#: MAIL_USERNAME : default None
#: MAIL_PASSWORD : default None
#: DEFAULT_MAIL_SENDER : default None
MAIL_FAIL_SILENTLY = False
MAIL_SERVER = 'localhost'
DEFAULT_MAIL_SENDER = ('HasGeek', 'test@example.com')
#: Logging: recipients of error emails
ADMINS = []
#: Log file
LOGFILE = 'error.log'
