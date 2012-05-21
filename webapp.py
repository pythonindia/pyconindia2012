
from flask import Flask
from flaskext.assets import Environment, Bundle
from baseframe import baseframe, baseframe_js, baseframe_css

class ReverseProxied(object):
    '''Wrap the application in this middleware and configure the 
    front-end server to add these headers, to let you quietly bind 
    this to a URL other than / and to an HTTP scheme that is 
    different than what is used locally.

    In nginx:
    location /myprefix {
        proxy_pass http://192.168.0.1:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header X-Script-Name /myprefix;
        }

    :param app: the WSGI application

    source: http://flask.pocoo.org/snippets/35/
    '''
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        script_name = environ.get('HTTP_X_SCRIPT_NAME', '')
        if script_name:
            environ['SCRIPT_NAME'] = script_name
            path_info = environ['PATH_INFO']
            if path_info.startswith(script_name):
                environ['PATH_INFO'] = path_info[len(script_name):]

        scheme = environ.get('HTTP_X_SCHEME', '')
        if scheme:
            environ['wsgi.url_scheme'] = scheme
        return self.app(environ, start_response)

# the flask app

app = Flask(__name__, instance_relative_config=True)
app.wsgi_app = ReverseProxied(app.wsgi_app)

app.register_blueprint(baseframe)

assets = Environment(app)

js = Bundle(baseframe_js, 'js/leaflet.js')

css = Bundle(Bundle(baseframe_css, 'css/pyconindia.css', 'css/monitor.css',
             filters='cssmin', output='css/pyconindia-packed.css'),
             'css/leaflet.css')

assets.register('js_all', js)
assets.register('css_all', css)

# Import models and views, and register routes here

from flask import render_template, redirect, url_for

@app.route('/')
def index():
    return render_template('index.html', active=1)

# delete the rule for favicon
app.url_map._rules = [rule for rule in app.url_map._rules if rule.rule != '/favicon.ico']

application = app

if __name__ == "__main__":
    app.run()
