from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from config import Config
from flask_login import LoginManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from elasticsearch import Elasticsearch


# from flask_cors import CORS

app = Flask(__name__,static_folder="./static/dist", template_folder="./static")
app.config.from_object(Config)
CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

manager = Manager(app)

manager.add_command('db', MigrateCommand)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
login = LoginManager(app)

@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()

app.elasticsearch = Elasticsearch([app.config['ELASTICSEARCH_URL']]) \
        if app.config['ELASTICSEARCH_URL'] else None

from app import  models, UserController
