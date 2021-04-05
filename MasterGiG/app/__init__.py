from flask import Flask, render_template, request, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from config import Config
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_cors import CORS
import os
from elasticsearch import Elasticsearch


from .models import *
from .models import db
from .api import auth_routes
from .api import admin_routes
from .api import content_routes
from .api import event_routes
from .api import payment_routes
from .api import ContentController
from .api import  user_routes
from .api import gig_routes
from .api import search
#from .api import route




app = Flask(__name__)

#Load configurations
app.config.from_object(Config)

#Application security and db initialization command
CORS(app)


#Use of flask blueprint to make the app modular
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(payment_routes, url_prefix='/api/payment')
app.register_blueprint(gig_routes, url_prefix='/api/gigs')
app.register_blueprint(content_routes, url_prefix='/api/content')
app.register_blueprint(event_routes, url_prefix='/api/event')
app.register_blueprint(admin_routes, url_prefix='/api/admin')

#initialize db on app start
db.init_app(app)
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)


#Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return UserEntity.query.get(int(id))


#Create db
@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()



app.elasticsearch = Elasticsearch([app.config['ELASTICSEARCH_URL']]) \
        if app.config['ELASTICSEARCH_URL'] else None



#Some stuff we need to add to make it https


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

