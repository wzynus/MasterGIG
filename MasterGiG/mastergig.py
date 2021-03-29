from app import app, db
from app.models import UserEntity, Message, GigRequest, GigType, GigEvent, StreamEvent, Notification , Video


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'UserEntity': UserEntity, 'Message' : Message,'GigType': GigType, 'GigRequest': GigRequest, "GigEvent": GigEvent, "STreamEvent" : StreamEvent, "Notification": Notification, "Video": Video }
