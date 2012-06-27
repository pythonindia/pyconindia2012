
from flask import Flask
from flaskext.assets import Environment, Bundle
from baseframe import baseframe, baseframe_js, baseframe_css

# the flask app

app = Flask(__name__, instance_relative_config=True)

app.register_blueprint(baseframe)

assets = Environment(app)

js = Bundle(baseframe_js, 'js/leaflet.js', 'js/check_dates.js')

css = Bundle(Bundle(baseframe_css, 'css/pyconindia.css', 'css/monitor.css',
             filters='cssmin', output='css/pyconindia-packed.css'),
             'css/leaflet.css')

assets.register('js_all', js)
assets.register('css_all', css)

# Import models and views, and register routes here

from flask import render_template


@app.route('/')
def index():
    return render_template('index.html', active=1)

# delete the rule for favicon
app.url_map._rules = [rule for rule in app.url_map._rules if rule.rule != '/favicon.ico']

application = app

if __name__ == "__main__":
    app.run()
