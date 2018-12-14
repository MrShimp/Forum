from pymongo import MongoClient
from pprint import pprint
import datetime


client = MongoClient('mongodb://cssuser:ClientServerSystem@181.215.241.41:27017/css')
''' create database '''
db = client.UsedBook


''' insert data to users'''
def insertUsers():
    names = ['user1', 'user2', 'user3', 'user4', 'user5']
    password = ['password1', 'password2', 'password3', 'password4', 'password5']
    email = ['user1@gmail.com', 'user2@gmail.com', 'user3@gmail.com', 'user4@gmail.com', 'user5@gmail.com']
    for i in range(len(names)):
        user = {
            'name': names[i],
            'password': password[i],
            'email': email[i]
        }
        db.users.insert_one(user)


''' insert data to products'''
def insertProducts():
    names = ['Galactic Empire', 'Becoming', 'Rapid Falls', 'Winter Loon: A Novel']
    users = [db.users.find_one({'name': 'user1'})['_id'], db.users.find_one({'name': 'user2'})['_id'],
             db.users.find_one({'name': 'user3'})['_id'], db.users.find_one({'name': 'user3'})['_id']]
    prices = ['3.42', '8.21', '5.75', '1.54']
    for i in range(len(names)):
        product = {
            'name': names[i],
            'password': users[i],
            'email': prices[i]
        }
        db.products.insert_one(product)


def insertTopic():
    titles = ['Best book I\'ve ever read', 'Worst book ever']
    contents = ['blah, blah, b', 'eh........']
    times = [datetime.datetime.now(), datetime.datetime.now()]
    users = [db.users.find_one({'name': 'user1'})['_id'], db.users.find_one({'name': 'user2'})['_id']]

    for i in range(len(titles)):
        topic = {
            'title': titles[i],
            'content': contents[i],
            'time': times[i],
            'user': users[i]
        }
        db.topics.insert_one(topic)


def insertComment():
    contents = ['What are you saying?', 'like it']
    times = [datetime.datetime.now(), datetime.datetime.now()]
    users = [db.users.find_one({'name': 'user3'})['_id'], db.users.find_one({'name': 'user4'})['_id']]
    titles = [db.topics.find_one({'title': 'Best book I\'ve ever read'})['_id'], db.topics.find_one({'title': 'Best book I\'ve ever read'})['_id']]

    for i in range(len(titles)):
        comment = {
            'title': titles[i],
            'content': contents[i],
            'time': times[i],
            'user': users[i]
        }
        db.comments.insert_one(comment)


if __name__ == '__main__':
    insertComment()