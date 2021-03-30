from datetime import datetime
from app import db, login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app.search import add_to_index, remove_from_index, query_index
import enum


#from cloudinary.models import CloudinaryField

class SearchableMixin(object):
    @classmethod
    def search(cls, expression, page, per_page):
        ids, total = query_index(cls.__tablename__, expression, page, per_page)
        if total == 0:
            return cls.query.filter_by(id=0), 0
        when = []
        for i in range(len(ids)):
            when.append((ids[i], i))
        return cls.query.filter(cls.id.in_(ids)).order_by(
            db.case(when, value=cls.id)), total

    @classmethod
    def before_commit(cls, session):
        session._changes = {
            'add': list(session.new),
            'update': list(session.dirty),
            'delete': list(session.deleted)
        }

    @classmethod
    def after_commit(cls, session):
        for obj in session._changes['add']:
            if isinstance(obj, SearchableMixin):
                add_to_index(obj.__tablename__, obj)
        for obj in session._changes['update']:
            if isinstance(obj, SearchableMixin):
                add_to_index(obj.__tablename__, obj)
        for obj in session._changes['delete']:
            if isinstance(obj, SearchableMixin):
                remove_from_index(obj.__tablename__, obj)
        session._changes = None

    @classmethod
    def reindex(cls):
        for obj in cls.query:
            add_to_index(cls.__tablename__, obj)


db.event.listen(db.session, 'before_commit', SearchableMixin.before_commit)
db.event.listen(db.session, 'after_commit', SearchableMixin.after_commit)


class UserEntity(UserMixin, SearchableMixin, db.Model):
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
    admin__status = db.Column(db.Boolean, default=False)
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


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Post {}>'.format(self.body)


class MessageTypeEnum(enum.Enum):
    Message = 1
    Feedback = 2
    Complaint = 3
    Report = 4


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    sender_id = db.Column(db.Integer)
    sender_name = db.Column((db.String(64)))
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    read_status = db.Column(db.Boolean, default=False)
    category = db.Column(db.Enum(MessageTypeEnum))
    target_id = db.Column(db.Integer)

    def __repr__(self):
        return '<Message {}>'.format(self.body)

    def set_read_status(self):
        self.read_status = True


class GigType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140))
    description = db.Column(db.String(1000))
    cost = db.Column(db.Integer)
    owner = db.Column(db.Integer, db.ForeignKey('user.id'))
    duration = db.Column(db.Interval)

    def __repr__(self):
        return '<GigType {}>'.format(self.title)


class GigRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    requester_id = db.Column(db.Integer)
    content_creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    status = db.Column(db.String, default='pending')
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    gig_type = db.relationship('GigType', lazy='dynamic')

    def __repr__(self):
        return '<GigRequest {}>'.format(self.id)


class GigEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    gig_request = db.relationship('GigRequest', lazy='dynamic')
    requester_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    content_creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    status = db.Column(db.String, default='upcoming')

    def __repr__(self):
        return '<GigEvent {}>'.format(self.id)

    def set_status_pending_feedback(self):
        self.status = 'pending feedback'

    def set_status_complete(self):
        self.status = 'complete'


class StreamEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    title = db.Column(db.String)
    description = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)

    def __repr__(self):
        return '<StreamEvent {}>'.format(self.title)


class Subscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subscriber_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    subscribed_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    is_paid = db.Column(db.Boolean, default=False)
    expiry_date = db.Column(db.DateTime)
    renew_status = db.Column(db.Boolean, default=False)
    renew_date = db.Column(db.DateTime)

    def __repr__(self):
        return '<Subscriber {}>'.format(self.id)

    def set_renew_status(self, status):
        self.renew_status = status

    def set_renew_date(self, date):
        self.renew_date = date

    def set_expiry_date(self, date):
        self.expiry_date = date

    def toggle_paid_status(self):
        if self.is_paid:
            self.is_paid = False
        else:
            self.is_paid = True


class VideoCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category_name = db.Column(db.String)

    def __repr__(self):
        return '<VideoCategory {}>'.format(self.category_name)


class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    url = db.Column(db.String)
    title = db.Column(db.String)
    description = db.Column(db.String)
    thumbnail = db.Column(db.String)
    likes = db.Column(db.Integer)
    view_count = db.Column(db.Integer)
    download_count = db.Column(db.Integer)
    is_free = db.Column(db.Boolean, default=True)
    category = db.Column(db.String)

    def __repr__(self):
        return '<Video {}>'.format(self.title)

    def set_thumbnail(self, url):
        self.thumbnail = url

    def set_url(self, url):
        self.url = url

    def toggle_status(self):
        if self.is_free:
            self.is_free = False
        else:
            self.is_free = True


class TopUpTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    amount = db.Column(db.Integer)

    def __repr__(self):
        return '<TopUpTransaction {}>'.format(self.timestamp + ": " + self.amount)


class PaymentTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    amount = db.Column(db.Integer)
    description = db.Column(db.String)

    def __repr__(self):
        return '<PaymentTransaction {}>'.format(self.timestamp + ": " + self.description + ": " + self.amount)


class NotificationTypeEnum(enum.Enum):
    General = 1
    Gig_notification = 2
    Stream_notification = 3
    Subscription_notification = 4
    Transaction_notification = 5


class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    read_status = db.Column(db.Boolean, default=False)
    category = db.Column(db.Enum(NotificationTypeEnum))

    def __repr__(self):
        return '<Notification {}>'.format(self.body)


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


