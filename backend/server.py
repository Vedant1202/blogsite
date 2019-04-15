import pymysql
from app import app
from db import mysql
import json
from flask import jsonify
from flask import flash, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from time import gmtime, strftime
import datetime
from utils import getLocalTime


CORS(app)


###############################################################################
##                                ROUTES
###############################################################################


# user add route
@app.route('/user/add', methods=['POST'])
# @cross_origin()
def add_user():
    try:
        _name =  request.form.getlist('username')[0]
        _email =  request.form.getlist('email')[0]
        _password =  request.form.getlist('password')[0]
        print(_password)
        # validate the received values
        if _name and _email and _password and request.method == 'POST':
            #do not save password as a plain text
            _hashed_password = generate_password_hash(_password)
            # save edits
            sql = "INSERT INTO user(username, email, password) VALUES(%s, %s, %s)"
            data = (_name, _email, _hashed_password)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('User added successfully!')
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


# login route
@app.route('/login', methods = ['POST'])
# @cross_origin()
def login():
    try:
        # print(request.Cookies) #To check what you are sending
        _name = request.form.getlist('username')[0]
        # print(_name)
        # _password = _json['password'].strip()
        _password = request.form.getlist('password')[0]
        print(_password)
        if _name and _password and request.method == 'POST':
            print('connect')
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT * FROM user WHERE BINARY username=%s", (_name))
            row = cursor.fetchone()
            print('row: ', row)
            # print(row['password'])
            # print(type(row['password']))
            # print(check_password_hash(str(row['password']), str(_password)))
            if row:
                if check_password_hash(row['password'], _password):
                    print('signed')
                    resp = jsonify(valid=row['username'])
                else:
                    resp = jsonify(valid=False)
                    print('unsigned')
            else:
                resp = jsonify(valid=False)
                print('unsigned')
            resp.status_code = 200
            return resp
        else:
            print('Not1')
            return not_found()
    except Exception as e:
        print('Not2')
        print(e)
    finally:
        cursor.close()
        conn.close()


# blog add route
@app.route('/blog/add', methods=['POST'])
# @cross_origin()
def add_blog():
    try:
        _username = request.form.getlist('username')[0]
        _text =  request.form.getlist('text')[0]
        _title = request.form.getlist('title')[0]
        _date = getLocalTime()
        # print(_username)
        # validate the received values
        if _username and _text and _date and _title and request.method == 'POST':
            # save edits
            sql = "INSERT INTO blog(username, blogtext, datewritten, title) VALUES(%s, %s, %s, %s)"
            data = (_username, _text, _date, _title)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify(status='Blog added successfully!')
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


# blog fetch route
@app.route('/blog/fetch', methods=['POST'])
# @cross_origin()
def fetch_blog():
    try:
        if request.method == 'POST':
            sql = "SELECT * FROM blog ORDER BY idblog DESC;"
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            conn.commit()
            resp = jsonify(blogs=rows)
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


# fetch my blogs route
@app.route('/blog/myblogs', methods=['POST'])
# @cross_origin()
def my_blog():
    try:
        _username = request.form.getlist('username')[0]
        if _username and request.method == 'POST':
            sql = "SELECT * FROM blog WHERE BINARY username=%s ORDER BY idblog DESC;"
            data = (_username)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql,data)
            rows = cursor.fetchall()
            conn.commit()
            resp = jsonify(blogs=rows)
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

# blog fetch route
@app.route('/user/check', methods=['POST'])
# @cross_origin()
def check_user():
    try:
        _username = request.form.getlist('username')[0]
        if _username and request.method == 'POST':
            sql = "SELECT username FROM user WHERE BINARY username = %s"
            data = (_username)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            rows = cursor.fetchall()
            conn.commit()
            # print(len(rows))
            if rows:
                resp = jsonify(valid=False)
            else:
                resp = jsonify(valid=True)
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

# 404 handler
@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp



if __name__ == "__main__":
    app.run()
