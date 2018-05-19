# coding:utf-8

import pydub
import os
import re

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
    u"零": "0",
    u"一": "1",
    u"两": "2",
    u"二": "2",
    u"三": "3",
    u"四": "4",
    u"五": "5",
    u"六": "6",
    u"七": "7",
    u"八": "8",
    u"九": "9",
    u"十": u"十",
    u"百": u"百",
    u"千": u"千",
    u"前": u"千",
    u"万": u"万",
    u"亿": u"亿",
    u"左": u"(",
    u"右": u")",
    u"0": "0",
    u"1": "1",
    u"2": "2",
    u"3": "3",
    u"4": "4",
    u"5": "5",
    u"6": "6",
    u"7": "7",
    u"8": "8",
    u"9": "9",
    u"把": "8",
    u"夹": "+",
    u"加": '+',
    u"家": "+",
    u"减": '-',
    u"诚": "*",
    u"成": "*",
    u"层": "*",
    u"乘": "*",
    u"除": "/",
    u"以": "",
    u",": "",
    u".": ".",
    u"点": ".",
    u"，": "",
    u"。": ""
}

units = {
    u'十':   10,
    u'百':   100,
    u'千':   1000,
    u'万':   10000,
    u'亿':   100000000,
}


def unit_to_num(string):
    res = 0
    i = 0
    while i < len(string):
        num, index = get_num(string[i:])
        i += index
        unit, index = get_unit(string[i:])
        i += index
        res += (num * unit)
    return res


def get_unit(string):
    tmp = 1
    index = 0
    for char in string:
        if char in units.keys():
            tmp *= units[char]
            index += 1
        else:
            break
    return tmp, index


def get_num(string):
    num = '0'
    index = 0
    for char in string:
        if char not in units.keys():
            if num == '0':
                num = ''
            num += char
            index += 1
        else:
            break
    if num == '0':
        num = '1'
    if '.' in num:
        return float(num), index
    else:
        return int(num), index


def get_express(string):
    express = ''
    pattern = re.compile(r"[\+\-\*\/]")
    ops = pattern.findall(string)
    nums = pattern.split(string)
    for i in range(0, len(nums)):
        tmp = unit_to_num(nums[i])
        express += str(tmp)
        if i < len(ops):
            express += str(ops[i])
    return express

def convert(string):
    express = ""
    for s in string:
        if s in d:
            express = express + d[s]
        else:
            express = express + ""
    return get_express(express)
   
