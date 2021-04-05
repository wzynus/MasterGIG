
from .db import db
from datetime import datetime
from .UserEntity import UserEntity
from .NotificationTypeEnum import NotificationTypeEnum

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    receiver_id = db.Column(db.Integer, db.ForeignKey(UserEntity.id))
    read_status = db.Column(db.Boolean, default=False)
    category = db.Column(db.Enum(NotificationTypeEnum))

    def __repr__(self):
        return '<Notification {}>'.format(self.body)