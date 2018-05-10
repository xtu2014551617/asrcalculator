//index.js
//获取应用实例
const app = getApp()
const defaultExpress = "0"
const recorderManager = wx.getRecorderManager()
var util = require("../../utils/util.js");
var express = defaultExpress

Page({

  data: {
    "express": express
  },

  onLoad: function (options) {
    console.log("index onLoad")    
    this.initRecorderManager()
    if (options.express) {
      express = options.express
    }
    this.setData({
      "express": express
    }) 
  },

  stop: function(res) {
    console.log('recorder stop', res)
    if (res.tempFilePath) {
      wx.uploadFile({
        url: 'https://studycpp.cn/audio',
        filePath: res.tempFilePath,
        name: 'file',
        success: res => {
          var jsonResult = JSON.parse(res.data)
          console.log(jsonResult['result'])
          express = jsonResult['result']
          this.setData({
            "express": jsonResult['result']
          })
        },
        fail: res => {
          console.log(res.data)
        }
      })
    }
  },

  initRecorderManager: function() {
    recorderManager.onStop(this.stop)
  },

  stopRecorder: function(e) {
    console.log("index stopRecorder")
    recorderManager.stop()
  },

  startRecorder: function(e) {
    console.log("index startRecorder")
    const options = {
      duration: 60000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 96000,
      format: 'mp3'
    }
    recorderManager.start(options)
  },

  checkExpress: function (e) {
    if (e.length == 0) {
      e = defaultExpress
    }
    var regexp = new RegExp("^0(\\d|\\(|-)");
    if (regexp.test(e)) {
      e = e.substring(1, express.length)
    }
    return e
  },

  pressBtn: function(event) {
    var val = event.currentTarget.dataset.value
    if (val === "del") {
      express = express.substring(0, express.length-1)
    } else if (val === "reset") {
      express = defaultExpress;
    } else if (val === "mode") {
      wx.redirectTo({
        url: '../mode/mode?express=' + express
      })
    } else if (val === "=") {
      express = util.calExpress(express + "=").toString()
    } else {  
      express += val;
    }
    express = this.checkExpress(express)
    this.setData({
      "express": express
    })
  }
})
