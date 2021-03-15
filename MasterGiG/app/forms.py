from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, DateField, FileField, SelectField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo
from app.models import User
from datetime import datetime
#from cloudinary.models import CloudinaryField


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')


class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')


class UpdateProfileForm(FlaskForm):
    display_name = StringField('display_name')
    dob = DateField('Date of birth - d/m/y', format='%d/%m/%Y')
    bio = StringField('Bio', validators=[DataRequired()])
    #profile_pic = ImageField(required=True)
    submit = SubmitField('Update')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')


class ChangePasswordForm(FlaskForm):
    current_password = StringField('current password', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Next')


class DeactivateAccountForm(FlaskForm):
    username = StringField('Account Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Confirm Deactivate')


class MessageForm(FlaskForm):
    receiver_name = StringField('receiver_name', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])

    submit = SubmitField('Send Message')


class EmptyForm(FlaskForm):
    submit = SubmitField('Submit');

class SearchForm(FlaskForm):
    q = StringField(('Search'), validators=[DataRequired()])

    def __init__(self, *args, **kwargs):
        if 'formdata' not in kwargs:
            kwargs['formdata'] = request.args
        if 'meta.csrf' not in kwargs:
            kwargs['meta.csrf'] = False
        super(SearchForm, self).__init__(*args, **kwargs)

#class SearchUserForm(FlaskForm):
    #search = CharField(widget=TextInput(attributes={'class': 'form-control'}))

