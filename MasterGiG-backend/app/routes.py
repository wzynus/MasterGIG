from flask import render_template, flash, redirect, url_for, request
from app import app, db
from app.forms import LoginForm, RegistrationForm, UpdateProfileForm, ChangePasswordForm, DeactivateAccountForm
import time
from flask_login import current_user, login_user, logout_user
from app.models import User, Message


@app.route('/')
@app.route('/index')
def index():
    user = current_user
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template('index.html', title='Home', user=user, posts=posts)


@app.route('/time')
def get_current_time():
    return time.time()
    #return [{'time': time.time()}]


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        if not user.check_active_status():
            flash('Account has been deactivated, contact your admin for assistance')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        return redirect(url_for('index'))
    return render_template('login.html', title='Sign In', form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        user.set_display_name(form.username.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('registration.html', title='Register', form=form)


@app.route('/updateprofile', methods=['GET', 'POST'])
def updateprofile():
    if current_user.is_authenticated:
        form = UpdateProfileForm()

        if form.validate_on_submit():
            user = current_user
            user.set_display_name(form.display_name.data)
            user.set_bio(form.bio.data)
            user.set_dob(form.dob.data)
            #user.set_profile_pic(form.profile_pic.data)
            db.session.commit()
            flash('Profile Updated!')
            return redirect(url_for('myprofile'))
        elif request.method == 'GET':
            form.dob.data = current_user.dob
            form.bio.data = current_user.bio
            form.display_name.data = current_user.display_name
        return render_template('updateprofile.html', title='My Profile', form=form)
    return redirect(url_for('index'))


@app.route('/myprofile', methods=['GET', 'POST'])
def myprofile():
    user = current_user
    return render_template('myprofile.html', user=user)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/changepassword', methods=['GET', 'POST'])
def changepassword():
    if not current_user.is_authenticated:
        return redirect(url_for('index'))
    form = ChangePasswordForm()
    if form.validate_on_submit():
        user = current_user
        if user.check_password(form.current_password.data):
            user.set_password(form.password.data)
            db.session.commit()
            flash('Password changed!')
            return redirect(url_for('myprofile'))
        flash('Invalid password')
        #return redirect(url_for('index'))
    return render_template('changepassword.html', title='Change Password', form=form)


@app.route('/deactiveaccount', methods=['GET', 'POST'])
def deactivateaccount():
    if not current_user.is_authenticated:
        return redirect(url_for('index'))
    form = DeactivateAccountForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if not user.check_username(form.username.data):
            flash('Error: Username does not match account!')
            return redirect(url_for('myprofile'))

        if user.check_password(form.password.data):
            user.deactivate_account()
            db.session.commit()
            flash('Account Deactivated')
            return redirect(url_for('logout'))
        flash('Invalid password')
        #return redirect(url_for('index'))
    return render_template('deactivateaccount.html', title='Deactivate Account', form=form)
"""
@app.route('/newmessage', methods=['GET', 'POST'])
def newmessage():
    if not current_user.is_authenticated:
        return redirect(url_for('index'))

    form = MessageForm()
    if form.validate_on_submit():
        sender = current_user
        sender_name = sender.username
        receiver_username = form.receiver_name
        receiver_id =
        message = Message(se)
        user.set_display_name(form.display_name.data)
        user.set_bio(form.bio.data)
        user.set_dob(form.dob.data)
            #user.set_profile_pic(form.profile_pic.data)
            db.session.commit()
            flash('Profile Updated!')
            return redirect(url_for('myprofile'))
        elif request.method == 'GET':
            form.dob.data = current_user.dob
            form.bio.data = current_user.bio
            form.display_name.data = current_user.display_name
        return render_template('updateprofile.html', title='My Profile', form=form)
    return redirect(url_for('index'))
"""
""""
@app.route('/browse', methods=['GET', 'POST'])
def browseuser():
    user = current_user
    return render_template('browseuser.html', user=user)
"""