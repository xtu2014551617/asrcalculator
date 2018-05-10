# coding:utf-8

class Error:
   def __init__(self, error_no, error_msg):
       self.error_no = error_no
       self.error_msg = error_msg

PARAMS_ERROR = (0, "params error")

