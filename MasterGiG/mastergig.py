from app import app, db
from app.models import UserEntity, Post, Message


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': UserEntity, 'Post': Post, 'Message' : Message}
