import config from "../compatible"
var requestnum = 0;
const addnum = function () {
    if (requestnum == 0) {
        wx.showLoading({
            title: "加载中...",
            mask: true
        })
    }
    requestnum++;
}
const reducenum = function () {
    requestnum--;
    if (requestnum == 0) {
        wx.hideLoading();
    }
}
export const httpget = (obj, nomsg, extendheader) => {
    if (obj.loading !== false) {
        addnum();
    }
    var { url, data, success, fail } = obj;
    //var authorization = wx.getStorageSync("authorization");
    if (!/^https?\:\/\//.test(obj.url)) {
        url = config.BaseUrl + url;
        console.log(config.BaseUrl);
    }
    var time = new Date().getTime();
    console.log("请求触发", time, url);
    var header = {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json"
    }
    if (extendheader) {
        header = Object.assign(extendheader, header)
    }
    wx.Request({
        url: url,
        method: "GET",
        header: header,
        data: data,
        success: function (res) {
            if (res.data && res.data.status == 60116) {
                wx.removeStorageSync("app_userinfo");
                // wx.navigateTo({
                //     url: "/pages/login/index?status=60116"
                // })
                config.toLogin();
                return;
            }
            if (res.statusCode != 200 || res.data.status != 200) {
                if (res.data.message && !nomsg) {
                    setTimeout(() => {
                        wx.showToast({
                            title: res.data.message,
                            icon: "none"
                        })
                    }, 50)
                }
            }

            success && success(res);

        },
        fail: function (error) {
            fail && fail(error);
            //config.log(url,"param",param,"res",error);

        },
        complete: function () {
            if (obj.loading !== false) {
                setTimeout(function () {
                    reducenum();
                }, 0);
            }
            console.log('完成', new Date().getTime() - time, url);
        }
    })
}
export const httppost = (obj, nomsg, extendheader) => {
    if (obj.loading !== false) {
        addnum();
    }
    var { url, data, success, fail,other } = obj;
    //var authorization = wx.getStorageSync("authorization");
    if (!/^https?\:\/\//.test(url)) {
        url = config.BaseUrl + url;
    }
    var header = {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json"
    }
    if (extendheader) {
        header = Object.assign(extendheader, header)
    }
    wx.Request({
        url: url,
        method: "POST",
        header: header,
        data: data,
        success: function (res) {
            //config.log(url,"param",param,"res",res);
            if (res.data && res.data.status == 60116) {
                wx.removeStorageSync("app_userinfo");
                config.toLogin();
                return;
            };
            if(res.data && res.data.status == 11222999){
                setTimeout(function () {
                    other && other(res);
                }, 0);
                return;
            };
            if(res.data && res.data.status == 11222998){
                return;
            };
            if (res.statusCode != 200 || res.data.status != 200) {
                if (res.data.message && !nomsg) {
                    setTimeout(function () {
                        wx.showToast({
                            title: res.data.message,
                            icon: "none"
                        })
                    }, 50);
                }
            }
            setTimeout(function () {
                success && success(res);
            }, 0);
        },
        fail: function (error) {
            //config.log(url,"param",param,"res",error);
            fail && fail(error);
        },
        complete: function () {
            if (obj.loading !== false) {
                setTimeout(function () {
                    reducenum();
                }, 0);
            }
        }
    })
}
export const post = (url, loading, extendheader) => {
    return (data, success, fail,other) => {
        httppost(Object.assign({
            url,
            loading
        }, {
                data,
                success,
                fail,
                other
            }), false, extendheader)
    }
}
export const postNomsg = (url, loading, extendheader) => {
    return (data, success, fail) => {
        httppost(Object.assign({
            url,
            loading
        }, {
                data,
                success,
                fail
            }), true, extendheader)
    }
}
export const get = (url, loading, extendheader) => {
    return (data, success, fail) => {
        httpget(Object.assign({
            url,
            loading
        }, {
                data,
                success,
                fail
            }), extendheader)
    }
}
export const getNomsg = (url, loading, extendheader) => {
    return (data, success, fail) => {
        httpget(Object.assign({
            url,
            loading
        }, {
                data,
                success,
                fail
        }), true, extendheader)
    }
}

export const getUrlPara = (url) => {
    var index = url.indexOf("?");
    var newurl = url.substring(index + 1);
    var infos = newurl.split("&");
    var para = {};
    infos.map(item => {
        var info = item.split("=");
        para[info[0]] = info[1];
    })
    return para;
}