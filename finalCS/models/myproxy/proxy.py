import tornado.ioloop
import tornado.web
from tornado.web import *
from tornado.options import define,options
from tornado.httpclient import AsyncHTTPClient, HTTPRequest
import random


import serverinfo
import reload_module


class MainHandler(tornado.web.RequestHandler):
    
    def __init__(self, application, request, **kwargs):
   
        self.servers = serverinfo.ServerInfo()
       
        self.loadbalance_count = 0
        self.uri = "/"
        return super().__init__(application, request, **kwargs)



    def handle_request(self, response):
        if response.error:
            print("Error:", response.error)
        else:
            print(response.body)

    @asynchronous
    def get(self, uri="/"):
        self.uri = uri
        print("GET$"*20)
        #print(self.request)
        print("ip",self.request.remote_ip)
        if self.request.remote_ip in self.servers.get_blacklist():
            return self.block()
        
        headers = self.request.headers
        headers["X-Real-IP"] = self.request.remote_ip
        print('headers:', headers)


        #loadbalance
        target_url = self.servers.get_random_server()+uri
        print(target_url)
        http_client = AsyncHTTPClient()
        http_client.fetch(
            HTTPRequest(
                headers = headers,
                url = target_url,
                method = "GET",
                follow_redirects = False
            ), self.proxy)
        
    @asynchronous
    def post(self, uri="/"):
        #self.polling()
        self.uri = uri
        #data = self.get_argument()
        #print("param ================", param)
        print("POST$"*20)
        #print(self.request)
        print(self.request.remote_ip)
        if self.request.remote_ip in self.servers.get_blacklist():
            return self.block()

        headers = self.request.headers
        headers["X-Real-IP"] = self.request.remote_ip
        print(headers)
        data = (self.request.body)
        print(data)
        target_url = self.servers.get_random_server() + uri
        
        http_client = AsyncHTTPClient()
        http_client.fetch(
            HTTPRequest(
                url = target_url,
                method = "POST",
                body = data,
                headers = headers,
                follow_redirects = False
            ), self.proxy)
        


    




    def proxy(self, response):
        print(response)
        self.set_status(response.code)

        for header in ["Date", "Cache-Control", "Server", "Content-Type", "Location"]:
            param = response.headers.get(header)
            if param:
                self.set_header(header, param)
        print("#"*10,"response.body")
        print(response.body)
        print("#"*10,"response.body")
        if response.body:
            self.write(response.body)
        else:
            self.write("ERROR, NO RESPONSE")
        self.finish()


    def block(self):
        self.write("Sorry, your ip is blocked.")
        self.finish()

    



def make_app():
    return tornado.web.Application([
        (r"/(.*)", MainHandler),
    ])

if __name__ == "__main__":
    print("Start")
    #fetch("http://localhost:3000")
    #tornado.ioloop.IOLoop.instance().start()

    #+++++++++++++++++++++
    rm = reload_module.ReloadModule("serverinfo.py", serverinfo)
    rm.start()

    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()

    