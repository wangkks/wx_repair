const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

var app = getApp()
import token from './sign.js'
const portsEndUrl = {
    justifyGetSuccInfo: 'weimao-new-project/queryAwardList', //新人礼成功详情
}

/**
 * 请求封装GET
 */
function handleRequest(url, params, type = 'post', successFunction, failFunction,loading) {
    if(loading){
        wx.showLoading({
            title: '加载中'
        })
    }
    wx.Request({
        url: app.globalData.wx_conf.wxapp_old_baseurl + url,
        data: params,
        method: type,
        header: {
            'content-type': type == 'get' ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            wx.hideLoading()
            if (typeof successFunction == "function") {
                successFunction(res);
            }
        },
        fail: function(res) {
            wx.hideLoading()
            if (typeof failFunction == "function") {
                failFunction(res);
            }
        }
    })
}

/**
 * 请求封装GET
 */
function memoRequest(url, params, type = 'post', successFunction, failFunction, isShow = true) {
    if (isShow)
        wx.showLoading({
            title: '加载中'
        })
    wx.Request({
        url: app.globalData.wx_conf.wxapp_old_baseurl + url,
        data: params,
        method: type,
        header: {
            'content-type': type == 'get' ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            if (isShow)
                wx.hideLoading()
            if (typeof successFunction == "function") {
                successFunction(res);
            }
        },
        fail: function(res) {
            if (isShow)
                wx.hideLoading()
            if (typeof failFunction == "function") {
                failFunction(res);
            }
        }
    })
}

/**
 * 请求封装GET
 */
function localityRequest(url, params, type = 'post', successFunction, failFunction,loading) {
    if(loading){
        wx.showLoading({
            title: '加载中'
        })
    }
    wx.Request({
        url: app.globalData.wx_conf.wxapp_old_baseurl + url,
        data: params,
        method: type,
        header: {
            'content-type': type == 'get' ? 'application/json' : 'application/json'
        },
        success: function(res) {
            wx.hideLoading()
            if (typeof successFunction == "function") {
                successFunction(res);
            }
        },
        fail: function(res) {
            wx.hideLoading()
            if (typeof failFunction == "function") {
                failFunction(res);
            }
        }
    })
}

let requestObj = null;
wx.Request = function(data = {}) {
    if (data.method === 'GET') {
        function objKeySort(obj) {
            var newkey = Object.keys(obj).sort();
            var newObj = {};
            for (var i = 0; i < newkey.length; i++) {
                newObj[newkey[i]] = obj[newkey[i]];
            }
            return newObj;
        }

        function serialize(obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        }
        if (data.data) {
            requestObj = serialize(objKeySort(data.data));
        } else {
            requestObj = '';
        }
    } else {
        requestObj = JSON.stringify(data.data)
    }
    data.header = Object.assign({
        "Content-Type": "application/json",
        token: token(requestObj)
    }, data.header);

    var success = data.success;
    data.success = function(res) {
        if (typeof success == 'function') {
            success(res);
        }

    }

    var fail = data.fail;

    data.fail = function(err) {
        if (typeof fail == 'function') {
            fail(err)
        }
    }
    wx.request(data)
}

function buttonClicked(self) {
    self.setData({
        buttonClicked: true
    })
    setTimeout(function () {
        self.setData({
            buttonClicked: false
        })
    }, 2000)
}

module.exports = {
    formatTime: formatTime,
    handleRequest: handleRequest,
    memoRequest: memoRequest,
    portsEndUrl: portsEndUrl,
    localityRequest: localityRequest,
    buttonClicked: buttonClicked
}