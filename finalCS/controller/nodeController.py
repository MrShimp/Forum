from flask import Flask
import requests
import base64
import json
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend


def decrypt(data):
     AES_CBC_KEY = "1234567890123456"
     AES_CBC_KEY = AES_CBC_KEY.encode()
     AES_CBC_IV = "1234567890123456"
     AES_CBC_IV = AES_CBC_IV.encode()
     cipher = Cipher(algorithms.AES(AES_CBC_KEY), modes.CBC(AES_CBC_IV), backend=default_backend())
     decrypt = cipher.decryptor()
     res = decrypt.update(data)
     #res = res.decode()
     return res


def decrypt1(data):
     data = base64.b64decode(data)
     data = json.loads(data)
     print(type(data))
     return data



def getnode():
     #r = requests.get('http://127.0.0.1/3000/users/list')
     r = requests.get('http://localhost:3000/users/list')
     res = r.content
     #res = res.encode()
     return res


if __name__ == "__main__":
     res = getnode()
     data = decrypt1(res)
     print(data)