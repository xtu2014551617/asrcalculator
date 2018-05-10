# coding:utf8

import ConfigParser


cf = ConfigParser.SafeConfigParser()
cf.read("../conf/asr.conf")

HOST = cf.get("server", "host")
PORT = int(cf.get("server", "port"))
DEBUG = cf.get("server", "debug")

APP_ID = cf.get("asr", "appid")
API_KEY = cf.get("asr", "key")
SECRET_KEY = cf.get("asr", "secret")

LOG_PATH = cf.get("log", "log_path")
LOG_LEVEL = cf.get("log", "log_level")
