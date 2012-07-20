import sys
print sys.path
import os.path
from os import environ

import httplib2
_Http = httplib2.Http
def Http(*a, **kw):
    kw.setdefault("disable_ssl_certificate_validation", True)
    return _Http(*a, **kw)
httplib2.Http = Http

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'eventframe'))

environ['ENVIRONMENT'] = 'production'
from eventframe import eventapp as application
