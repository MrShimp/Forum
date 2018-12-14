from flask import Flask
import requests

def getchatroom():
     #r = requests.get('http://127.0.0.1/3000/users/list')
     r = requests.get('http://localhost:3000/users/list')
     res = r.json()
     return res


if __name__ == "__main__":
     getchatroom()