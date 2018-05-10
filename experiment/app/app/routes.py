from flask import render_template, flash, redirect, url_for, session, jsonify, request
from flask_debugtoolbar import DebugToolbarExtension
from app import app,db
from app.models import Participants, Responses
from app.forms import ProfileForm
import sys, json



@app.route('/')
@app.route('/index')
@app.route('/consent')
def index():
    session['status'] = 'consent'
    return render_template('index.html', title='Home')


@app.route('/instructions')
def instructions():
    if 'status' in session:
        session['status'] = 'instructions'
        return render_template('instructions.html')
    return redirect(session['status'])

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if session.get('status') == 'consent':
        form = ProfileForm()

        # Save the profile data if the form is complete and assign a participantID
        # If all this is succesful, redirect to the experiment
        if form.validate_on_submit():           
            participant = Participants(age = form.age.data,
                gender = form.gender.data, language = form.language.data)
            db.session.add(participant)
            db.session.commit()
            session['participantID'] = participant.id
            session['status'] = 'profile'
            return redirect('/instructions')

        return render_template('profile.html', form=form)
    return redirect(session['status'])


@app.route('/experiment')
def experiment():
    if session.get('participantID'):
        if session.get('status') == 'instructions' or session.get('status') == 'experiment':
            session['status'] = 'experiment'
            return render_template('experiment.html')
    return redirect(session['status'])


@app.route('/finish')
def finish():
    if session.get('participantID') is None:
        return redirect('/consent')
    else:
        session.clear()
        return render_template('finish.html')


# Save the responses to the database. 
# Note that the responses are send as json, and need to be decoded through json.loads
# Note how the participantID is obtained through the session variable
@app.route('/saveResponses', methods=['POST'])
def saveResponses():
    
    req_data = request.get_data()
    if request.form:
        data = request.form
        responses = json.loads(data['responses'])
    else:
        data = json.loads(request.data,strict=False)
        responses = data['responses']


    for response in responses:
        print(response, file = sys.stderr)
        response = Responses(participantID = session['participantID'],
            stimulus = response['stimulus'], rating = response['response'])
        db.session.add(response)
        db.session.commit()


    #return(jsonify(data = {'message': data, 'response': responses[0]['stimulus']}))
    return(jsonify(data = {'message': 'Responses succesfully saved'}));
