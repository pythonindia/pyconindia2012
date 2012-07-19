# -*- coding: utf-8 -*-

#: The title of this site
SITE_TITLE='PyCon India 2012 Funnel'
#: Support contact email
SITE_SUPPORT_EMAIL = 'test@example.com'
#: TypeKit code for fonts
TYPEKIT_CODE=''
#: Google Analytics code UA-XXXXXX-X
GA_CODE=''
import os
path = os.path.abspath("var/pyconindia-funnel.db")
#: Database backend
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + path
#: Secret key
SECRET_KEY = 'make this something random'
#: Timezone
TIMEZONE = 'Asia/Calcutta'
#: LastUser server
LASTUSER_SERVER = 'https://auth.hasgeek.com'
#: LastUser client id
LASTUSER_CLIENT_ID = '8pI-AXENSeO4EvP7qrw-sg'
#: LastUser client secret
LASTUSER_CLIENT_SECRET = 'QuNra6LOT5av9SzKd0FPwQsq7G1soVTkGPQVUBXR2HpA'
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
DEFAULT_MAIL_SENDER = ('Bill Gate', 'test@example.com')
#: Logging: recipients of error emails
ADMINS=[]
#: Log file
LOGFILE='error.log'
