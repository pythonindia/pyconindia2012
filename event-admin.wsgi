import sys
print sys.path
import os.path
from os import environ

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'eventframe'))

environ['ENVIRONMENT'] = 'production'
from eventframe import app as application
