const recorderManager = wx.getRecorderManager()
var express = ""
var log = ""
var power = ""
var util = require("../../utils/util.js");

Page({
  data: {
    "express": express,
    "log_modal": true,  
    "x_modal" : true
  },

  onLoad: function (options) {
    this.initRecorderManager()
    express = options.express
    this.setData({
      "express": express
    })  
  },

  stop: function (res) {
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

  initRecorderManager: function () {
    recorderManager.onStop(this.stop)
  },

  stopRecorder: function (e) {
    console.log("index stopRecorder")
    recorderManager.stop()
  },

  startRecorder: function (e) {
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

  cancle: function(e) {
    this.setData({
      "x_modal": true,
      "log_modal": true
    })  
  },

  input: function(event) {
    log = event.detail.value
    power = event.detail.value
  },

  xConfirm: function(e) {
    var result = util.calExpress(express + "=")
    express = Math.pow(result, power)
    wx.redirectTo({
      url: '../index/index?express=' + express
    })
  },

  logConfirm: function (e) {
    var result = util.calExpress(express + "=")
    express = parseFloat((Math.log(result) / Math.log(log)).toFixed(10))
    wx.redirectTo({
      url: '../index/index?express=' + express
    })
  },

  pressBtn: function (event) {
    var val = event.currentTarget.dataset.value
    var result = util.calExpress(express + "=")
    var isRedirect = true
    if (val === "sin") {
      express = parseFloat(Math.sin(Math.PI/(180/result)).toFixed(10))
    } else if (val === "cos") {
      express = parseFloat(Math.cos(Math.PI / (180 / result)).toFixed(10))
    } else if (val === "tan") {
      express = parseFloat(Math.tan(Math.PI / (180 / result)).toFixed(10))
    } else if (val === "asin") {
      express = parseFloat((Math.asin(result) * 180 / Math.PI).toFixed(10))
    } else if (val === "acos") {
      express = parseFloat((Math.acos(result) * 180 / Math.PI).toFixed(10))
    } else if (val === "atan") {
      express = parseFloat((Math.atan(result) * 180 / Math.PI).toFixed(10))
    } else if (val === "lg") {
      express = parseFloat(Math.log10(result).toFixed(10))
    } else if (val === "ln") {
      express = parseFloat(Math.log(result).toFixed(10))
    } else if (val === "^2") {
      express = parseFloat((result * result).toFixed(10))
    } else if (val === "^3") {
      express = parseFloat((result * result * result).toFixed(10))
    } else if (val === "bin") {
      express = result.toString(2)
    } else if (val === "oct") {
      express = result.toString(8)
    } else if (val === "hex") {
      express = result.toString(16)
    } else if (val === "back") {

    } else if (val === "pi") {
      express = parseFloat(Math.PI.toFixed(10))
    } else if (val === "e") {
      express = parseFloat(Math.E.toFixed(10))
    } else if (val === "^x") { 
      this.setData({
        "x_modal": false
      })
      isRedirect = false
    } else if (val === "log") {
      this.setData({
        "log_modal": false
      })
      isRedirect = false
    } else if (val === "show") {

    }
    if (isRedirect) {
      wx.redirectTo({
        url: '../index/index?express=' + express
      })
    }
  }
})
