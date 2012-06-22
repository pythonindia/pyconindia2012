import sys
import os.path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'funnel'))

# auth.hasgeek.com SSL validation is failing.
# Monkey-pack httplib2 to disable SSL validation

import httplib2

_Http = httplib2.Http
def Http(*a, **kw):
    kw.setdefault("disable_ssl_certificate_validation", True)
    return _Http(*a, **kw)
httplib2.Http = Http


from website import app

