import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
   
    POSTGRES_URL= '127.0.0.1:5432'
    POSTGRES_USER= 'postgres'
    POSTGRES_PW = '123786'
    POSTGRES_DB = 'mastergig'
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    # SQLALCHEMY_DATABASE_URI = os.environ.get('postgresql://postgres:postgres@localhost:5432/mastergig') or \
    # 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    ELASTICSEARCH_URL = os.environ.get('ELASTICSEARCH_URL') or 'http://localhost:5000'
    DEBUG=True
    PORT=5000