from pymongo import MongoClient
import sys
sys.path.append('..')
from models import db

client = MongoClient('mongodb://cssuser:ClientServerSystem@181.215.241.41:27017/css')
''' create database '''
db = client.UsedBook


def finduser(email, password):
    user = db.users.find_one({"email": email, "password": password})
    if user:
        return user['name']
    else:
        return ""



def insertUser(name,email,password):
    user = {
        'name': name,
        'password': password,
        'email': email
    }
    db.users.insert_one(user)


if __name__ == '__main__':
    user = finduser('user1@gmail.com','password1')
    print(user)


