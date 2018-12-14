#coding = utf-8

import os
import hashlib
import threading
import os.path
import time
import threading
from importlib import reload




class ReloadModule(threading.Thread):
    def __init__(self, filename, module, delay=3):
        threading.Thread.__init__(self)
        self.filename = filename
        self.delay = delay
        self.modified_time = 0
        self.md5 = 0
        self.module = None
        print(os.getcwd())
        if filename:
            self.modified_time = self.get_modify_time()
            self.md5 = self.get_file_md5()
            self.module = module

            
            
        


    def set_file(self, filename):
        self.filename = filename
        self.modulename = os.path.splitext(filename)[0]
        self.modified_time = self.get_modify_time()
        self.md5 = self.get_file_md5()

    def get_modify_time(self):
        mtime = os.path.getmtime(self.filename)
        #print(time.ctime(mtime))
        return mtime
    
    def get_file_md5(self):
        md5 = None
        with open(self.filename, 'rb') as file:
            data = file.read()   
            md5obj = hashlib.md5()
            md5obj.update(data)
            md5 = str(md5obj.hexdigest())
            #print("md5: ", md5)
        return md5

    def is_modified(self):
        if self.modified_time == self.get_modify_time():
            return False
        else:
            self.modified_time = self.get_modify_time()
            return True

    def md5_is_changed(self):
        if self.md5 == self.get_file_md5():
            return False
        else:
            self.md5 = self.get_file_md5()
            return True


    def run(self):
        print("start, file name is ", self.filename)
        while True:
            if self.is_modified():
                print("modified time is changed")
                if self.md5_is_changed():
                    print(self.filename, "md5 is changed")
                    print("reload", self.module.__name__)
                    reload(self.module)
            time.sleep(self.delay)
    





