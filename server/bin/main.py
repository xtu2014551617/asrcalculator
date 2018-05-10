# coding:utf-8

import logging

import routers
import config


if __name__ == '__main__':
    handler = logging.FileHandler(config.LOG_PATH)
    handler.setLevel(logging.DEBUG)
    logging_format = logging.Formatter(
        '%(asctime)s - %(levelname)s - %(filename)s - %(funcName)s - %(lineno)s - %(message)s')
    handler.setFormatter(logging_format)
    routers.app.logger.addHandler(handler)
    routers.app.run(host=config.HOST, port=config.PORT, debug=config.DEBUG)


