from flask import render_template, Flask, session, redirect, url_for, escape, request, flash, jsonify, json, Response
from flask_cors import CORS, cross_origin
import sys
sys.path.append('..')
from controller import usercontroller as user
from controller import subjectController as comment
from controller import nodeController as node
import json
from bson import ObjectId
from datetime import date, datetime

import testclass
import threading
import reload_module
import os


app = Flask(__name__)
app.config['SECRET_KEY'] = '123456'
CORS(app, support_credentials=True)

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


# MAIN PAGE
@app.route('/index', methods=['GET', 'POST'])
@cross_origin(origin='*')
def main_page():
    session['username'] = ''
    session['email'] = ''
    session['status'] = ''
    if session['status']== 'succeed':
        return render_template('index_2.html')
    else:
        return render_template('index.html')


@app.route('/<email>/', methods=['GET', 'POST'])
def isLogin(email):
    # display by kind
    if request.method == 'GET':
        datas = []
        titles = comment.findAll()
        if titles:
            for title in titles:
                name = 'user1'
                coms = comment.findAllCom(title['title'], name)
                for com in coms:
                    data = {'title': title['title'], 'content': title['content'], 'com': com['comment']}
                    datas.append(data)
        #print(coms)
            JSONEncoder().encode(datas)
            print(datas)
            #return json.dumps(datas)
            #return render_template('index_2.html', datas = json.dumps(datas))
            return render_template('index_2.html', datas = datas)
        else:
            return render_template('index_2.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('username', None)
        password = request.form.get('password')
        name = user.finduser(email, password)
        if name:
            session['username'] = name
            session['email'] = email
            session['status'] = 'succeed'
            return redirect(url_for('isLogin', email=session['email']))
        else:
            flash('The username or password do not match')
            return render_template('login.html')
    if request.method == 'GET':
        return render_template('login.html')


@app.route('/signin')
def signin():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email', None)
        password = request.form.get('password')
        user.insertUser(name,email, password)
        session['username'] = name
        session['email'] = email
        session['status'] = 'succeed'
        return render_template('index_2.html')

    if request.method == 'GET':
        return render_template('signin.html')

@app.route('/test')
def test():
    tc = testclass.TestClass()
    return render_template(tc.test());
    #return render_template('signin.html')


@app.route('/getheaders')
def getheader():
    req_data = {}
    req_data['headers'] = dict(request.headers)
    print(req_data)
    return jsonify(req_data)


@app.route('/nodetest')
def nodetest():
    res = node.getnode()
    return jsonify(res)


@app.route('/encrypt')
def getEncrypt():
    res = node.getnode()
    res = node.decrypt1(res)
    return jsonify(res)


if __name__ == '__main__':
    rm = reload_module.ReloadModule("testclass.py", testclass)
    print(os.getcwd())
    rm.start()
    #app.debug = True
    app.run()
