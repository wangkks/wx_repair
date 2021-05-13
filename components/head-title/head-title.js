const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        titleName: {
            type: String,
            value: ''
        },
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        navHeight: app.globalData.navHeight,
        marginTop: app.globalData.navHeight / app.globalData.scale
    },
    onload() {
        console.log('222',this.data.navHeight);
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
    }
})
