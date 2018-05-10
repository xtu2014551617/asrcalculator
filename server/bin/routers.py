# coding:utf8

import json
import flask
import aip

import config
import util


app = flask.Flask(__name__)
client = aip.AipSpeech(config.APP_ID, config.API_KEY, config.SECRET_KEY)


@app.route("/audio", methods=['POST'])
def post_audio():    
    mp3_file = flask.request.files['file']
    result = client.asr(util.mp3_to_pcm(mp3_file), 'wav', 16000, {
        'lan': 'zh',
    })
    asr_response = json.dumps(result, ensure_ascii=False)   
    if 'result' in result:
        result['result'] = util.convert(result['result'][0])
        app.logger.info("first -" + asr_response +  "second - [" + result['result'] + "]")
    else:
    	app.logger.info("first -" + asr_response + " - " + "[no result]")
    response = json.dumps(result, ensure_ascii=False)
    return response


@app.route("/audio", methods=['GET'])
def get():
    return "<h1>Hello World</h1>"




