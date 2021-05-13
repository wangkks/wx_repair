// pages/clockIn/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showInputCode: false,
        emptyList:[
            {code: ''},
            {code: ''},
            {code: ''},
            {code: ''},
            {code: ''},
            {code: ''},
        ],
        inputCode: '',
        vallength: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    scanCodeHandler(){
        wx.scanCode({
            success: (res) => {
                console.log(res.result)
                wx.navigateTo({
                    url: '/pages/position/index',
                })
            }
        })
    },
    inputCodeHandler(){
        this.setData({ showInputCode :true});
    },
    inputHandler(e){
        let val = e.detail.value.split(''),
            emptyList = this.data.emptyList.slice(),
            numV = emptyList.filter(item=> item.code);
        if (val.length <= numV.length){
            emptyList[val.length].code = '';
            this.setData({ 
                emptyList, 
                inputCode: e.detail.value,
                code: val
            })
            return;
        }
        if(val.length){
            val.map((item,index)=>{
                emptyList[index].code = item;
            })

        }else{
            emptyList = emptyList.map((item, index) => {
                item.code = '';
                return item;
            })
        }
        this.setData({ 
            emptyList, 
            inputCode: e.detail.value,
            code: val
        });
    },
    confirmHandler(){
        if(!this.data.inputCode){
            wx.showToast({
                title: '请输入完整编号！',
                icon: 'none'
            })
            return;
        }
        wx.navigateTo({
            url: '/pages/position/index',
        })
    },
    cancelHandler(){
        this.setData({ showInputCode: false,inputCode: ''});
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})