from flask import render_template, flash, redirect,jsonify, url_for, url_for, g, request
from app.models import models,db
from app.forms import LoginForm, RegistrationForm, UpdateProfileForm, ChangePasswordForm, DeactivateAccountForm, \
    MessageForm,EmptyForm, SearchForm

import time
from flask_login import current_user, login_user, logout_user, login_required
from app.models import UserEntity, Message
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token


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
        user = UserEntity.query.filter_by(username=form.username.data).first()
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
        user = UserEntity(username=form.username.data, email=form.email.data)
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
        user = UserEntity.query.filter_by(username=form.username.data).first()
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


@app.route('/newmessage', methods=['GET', 'POST'])
def newmessage():
    if not current_user.is_authenticated:
        return redirect(url_for('index'))

    form = MessageForm()
    if form.validate_on_submit():
        s_name = current_user.display_name
        s_id = current_user.id
        receiver = UserEntity.query.filter_by(username=form.receiver_name.data).first()
        r_id = receiver.id
        content = form.content.data
        msg = Message(body=content, sender_id=s_id, sender_name=s_name, receiver_id=r_id)
        db.session.add(msg)
        db.session.commit()
        flash('Message Sent!')
        return redirect(url_for('inbox'))
    #else:
        #flash('Error creating message. Please try again')
    else:
        for error in form.errors:
            flash('Error creating message. Please try again')

    return render_template('newmessage.html', title='Create Message', form=form)


@app.route('/inbox', methods=['GET', 'POST'])
def inbox():
    user = current_user
    messages = Message.query.filter_by(receiver_id=user.id).all()
    return render_template('inbox.html', user=user, msg=messages)


@app.route('/follow/<username>', methods=['POST'])
@login_required
def follow(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = UserEntity.query.filter_by(username=username).first()
        if user is None:
            flash('User {} not found.'.format(username))
            return redirect(url_for('index'))
        if user == current_user:
            flash('You cannot follow yourself!')
            return redirect(url_for('user', username=username))
        current_user.follow(user)
        db.session.commit()
        flash('You are following {}!'.format(username))
        return redirect(url_for('user', username=username))
    else:
        return redirect(url_for('index'))


@app.route('/unfollow/<username>', methods=['POST'])
@login_required
def unfollow(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = UserEntity.query.filter_by(username=username).first()
        if user is None:
            flash('User {} not found.'.format(username))
            return redirect(url_for('index'))
        if user == current_user:
            flash('You cannot unfollow yourself!')
            return redirect(url_for('user', username=username))
        current_user.unfollow(user)
        db.session.commit()
        flash('You are not following {}.'.format(username))
        return redirect(url_for('user', username=username))
    else:
        return redirect(url_for('index'))

@app.route('/subscribe/<username>', methods=['POST'])
@login_required
def subscribe(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = UserEntity.query.filter_by(username=username).first()
        if user is None:
            flash('User {} not found.'.format(username))
            return redirect(url_for('index'))
        if user == current_user:
            flash('You cannot subscribe yourself!')
            return redirect(url_for('user', username=username))
        current_user.subscribe(user)
        db.session.commit()
        flash('You are subscribing {}!'.format(username))
        return redirect(url_for('user', username=username))
    else:
        return redirect(url_for('index'))


@app.route('/unsubscribe/<username>', methods=['POST'])
@login_required
def unsubscribe(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = UserEntity.query.filter_by(username=username).first()
        if user is None:
            flash('User {} not found.'.format(username))
            return redirect(url_for('index'))
        if user == current_user:
            flash('You cannot unsubscribe yourself!')
            return redirect(url_for('user', username=username))
        current_user.unsubscribe(user)
        db.session.commit()
        flash('You are not subscribing {}.'.format(username))
        return redirect(url_for('user', username=username))
    else:
        return redirect(url_for('index'))

@app.route('/before_request')
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()
        g.search_form = SearchForm()
    g.locale = str(get_locale())



@app.route('/search')
@login_required
def search():
    if not g.search_form.validate():
        return redirect(url_for('main.explore'))
    page = request.args.get('page', 1, type=int)
    posts, total = UserEntity.search(g.search_form.q.data, page,
                               current_app.config['POSTS_PER_PAGE'])
    next_url = url_for('main.search', q=g.search_form.q.data, page=page + 1) \
        if total > page * current_app.config['POSTS_PER_PAGE'] else None
    prev_url = url_for('main.search', q=g.search_form.q.data, page=page - 1) \
        if page > 1 else None
    return render_template('search.html', title=_('Search'), posts=posts,
                           next_url=next_url, prev_url=prev_url)




##################Linking with front-end stuff, can remove ltr ###################### 

#@app.route('/', methods=['GET'])
#def index():
 #   return render_template('index.html')


#@app.route('/<path:path>', methods=['GET'])
#def any_root_path(path):
#    return render_template('index.html')


@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = UserEntity(
        email=incoming["email"],
        password=incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = UserEntity.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = UserEntity.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403


