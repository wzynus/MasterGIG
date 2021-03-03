from datetime import datetime
from app import db, login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    #subscribers = db.relationship('Subscriber', backref='subscribers', lazy='dynamic')
    bio = db.Column(db.String(500))
    dob = db.Column(db.DateTime)
    #profile_pic = db.Column(db.File)
    display_name = db.Column(db.String(64))
    #messages = db.relationship('Message', backref='receiver', lazy='dynamic')
    active_status = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash,password)

    def set_dob(self, date):
        self.dob = date

    def set_bio(self, content):
        self.bio = content

    def set_display_name(self, name):
        self.display_name = name

    def deactivate_account(self):
        self.active_status = False

    def check_username(self, name):
        if self.username == name:
            return True
        return False

    def check_active_status(self):
        return self.active_status

    def deactivate_account(self):
        self.active_status=False
        return


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Post {}>'.format(self.body)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    sender_id = db.Column(db.Integer)
    sender_name = db.Column((db.String(64)))
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    read_status = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return '<Message {}>'.format(self.body)


#class Subscriber(db.Model):
    #id = db.Column(db.Integer, primary_key=True)
    #owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    #subscriber_id = db.Column(db.Integer, db.ForeignKey('user.id'))


    #def __repr__(self):
        #return '<Post {}>'.format(self.body)


@login.user_loader
def load_user(id):
    return User.query.get(int(id))