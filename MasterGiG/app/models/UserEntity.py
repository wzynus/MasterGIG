from .db import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .SearchableMixin import SearchableMixin
from sqlalchemy import Table

class UserEntity(UserMixin, SearchableMixin, db.Model):
    __tablename__ = 'users'
    __searchable__ = ['username', 'display_name', 'bio']
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    bio = db.Column(db.String(500))
    dob = db.Column(db.DateTime)
    profile_pic = db.Column(db.String)
    display_name = db.Column(db.String(64))
    messages = db.relationship('Message', backref='receiver', lazy='dynamic')
    gig__types = db.relationship('GigType', backref='owner', lazy='dynamic')
    gig__request_received = db.relationship('GigRequest', backref='content_creator', lazy='dynamic')
    gig__request_sent = db.relationship('GigRequest', backref='requester', lazy='dynamic')
    gig__events_1 = db.relationship('GigEvent', backref='content_creator', lazy='dynamic')
    gig__events_2 = db.relationship('GigEvent', backref='requester', lazy='dynamic')
    active_status = db.Column(db.Boolean, default=True)
    subscribers = db.relationship('Subscriber', backref='subscribed', lazy='dynamic')
    subscribed = db.relationship('Subscriber', backref='subscriber', lazy='dynamic')
    admin_status = db.Column(db.Boolean, default=False)
    videos = db.relationship('Video', backref='owner', lazy='dynamic')
    video_categories = db.relationship('VideoCategory', backref='owner', lazy='dynamic')
    topup_transactions = db.relationship('TopUpTransaction', backref='owner', lazy='dynamic')
    payment_transaction_1 = db.relationship('PaymentTransaction', backref='sender', lazy='dynamic')
    payment_transaction_2 = db.relationship('PaymentTransaction', backref='receiver', lazy='dynamic')
    wallet_balance = db.Column(db.Integer)
    credit_card_number = db.Column(db.Integer)
    credit_card_ccv_hashed = db.Column(db.String(128))
    credit_card_expiry = db.Column(db.Date)
    notifications = db.relationship('Notification', backref='owner', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password, method='sha256')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def set_ccv(self, password):
        self.credit_card_ccv_hashed = generate_password_hash(password, method='sha256')

    def check_ccv(self, password):
        return check_password_hash(self.credit_card_ccv_hashed, password)

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

    def subscribe(self, username):
        if not self.is_subscribing(username):
            self.subscribed.append(username)

    def unsubscribe(self, username):
        if self.is_subscribing(username):
            self.subscribed.remove(username)

    def is_subscribing(self, username):
        return self.subscribed.filter(subscribers.c.subscribed_id == username.id).count() > 0

    def set_profile_pic(self, path):
        self.profile_pic = path