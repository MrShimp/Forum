from pymongo import MongoClient
from flask import jsonify
import json
import sys
import types
import datetime
sys.path.append('..')
from models import db

client = MongoClient('mongodb://cssuser:ClientServerSystem@181.215.241.41:27017/css')
''' create database '''
db = client.UsedBook


def findAll():
    results = []
    coms = db.topics.find({})
    for com in coms:
        if type(com['title']) == type('this'):
            res = {'title': com['title'], 'content': com['content']}
            results.append(res)
    return results


def findCom(email):
    user = db.users.find_one({'email': email})['_id']
    coms = db.topics.find_one({'user': user})
    res = {'title':coms['title'], 'content': coms['content']}
    print(res)
    return res


def findAllCom(title, name):
    results = []
    title1 = db.topics.find_one({'title': title})['_id']
    comments = db.comments.find({'title': title1})
    for comment in comments:
        #name = db.user.find_one({'_id': comment['user']})
        res = {'comment': comment['content'], 'user': name}
        results.append(res)
    return results


def insertCom(comment,title, user):
    comment = {
        'title': title,
        'content': comment,
        'time': datetime.datetime.now(),
        'user':  db.users.find_one({'name': user})['_id']
    }
    db.comments.insert_one(comment)


if __name__ == '__main__':
    test = findAll()

