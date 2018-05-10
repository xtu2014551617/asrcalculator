# coding:utf-8

import pydub
import os

audio_segment = pydub.AudioSegment

def get_file_content(file_path):
    with open(file_path, 'rb') as fp:
        return fp.read()


def mp3_to_pcm(mp3_file):
   """
   mp3_file: File 
   """
   sound = audio_segment.from_mp3(mp3_file)
   pcm_file =  sound.export(out_f='/tmp/'+mp3_file.filename+'.wav', format="wav")
   pcm_file.seek(pcm_file.tell() * (-1), os.SEEK_CUR)
   return pcm_file.read()


d = {
    u"一": "1",
    u"二": "2",
    u"三": "3",
    u"四": "4",
    u"五": "5",
    u"六": "6",
    u"七": "7",
    u"八": "8",
    u"九": "9",
    u"1": "1",
    u"2": "2",
    u"3": "3",
    u"4": "4",
    u"5": "5",
    u"6": "6",
    u"7": "7",
    u"8": "8",
    u"9": "9",
    u"加": '+',
    u"减": '-',
    u"乘": "*",
    u"除": "/",
    u"以": "",
    u",": "",
    u".": "",
    u"，": "",
    u"。": ""
}

def convert(string):
    express = ""
    for s in string:
        if s in d:
            express = express + d[s]
        else:
            express = express + ""
    return express
   
