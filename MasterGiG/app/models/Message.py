from .db import db
from .MessageTypeEnum import MessageTypeEnum
from .UserEntity import UserEntity
from datetime import datetime



class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    sender_id = db.Column(db.Integer)
    sender_name = db.Column((db.String(64)))
    receiver_id = db.Column(db.Integer, db.ForeignKey(UserEntity.id))
    read_status = db.Column(db.Boolean, default=False)
    category = db.Column(db.Enum(MessageTypeEnum))
    target_id = db.Column(db.Integer)

    def __repr__(self):
        return '<Message {}>'.format(self.body)

    def set_read_status(self):
        self.read_status = True
