//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listdata: [],
    listtype: ['gn','gj','cj','yl','js','ty','other'],
    currentTab: 0

  },
  onLoad() {
    // this.getList()
    // this.getInfo()
    this.getInternet()
  },
  onPullDownRefresh() {
    this.getInternet(() => {
      wx.stopPullDownRefresh()
    })
  }, swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
      }),
        this.getInternet()      
    }
  },
  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
  },
 getInfo(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: '1523074607642'
      },
      success: res => {
        console.log(res)
        let result = res.data.result
      },
      complete: () => {
        callback && callback()
      }
    })
  }, onShareAppMessage: function () {
    return {
      title: '自定义标题',
      desc: '自定义分享描述',
      path: '/page/ueser?id=123'
    }
  }, getInternet(callback) {
    console.log(this.data. listtype[this.data.currentTab])
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.listtype[this.data.currentTab]
      },
      success: res => {
        let listdata_get = res.data.result
        let listdata = []
        for (let i = 0; i < listdata_get.length; i++) {
          listdata.push({
            id:listdata_get[i].id,
            title: listdata_get[i].title,
            firstImage: listdata_get[i].firstImage,
            date: listdata_get[i].date.substring(5, 10),
            source: listdata_get[i].source+"     "
          })
        }
        this.setData({
          listdata: listdata
        })

      },
      complete: () => {
        callback && callback()
      }
    })
  }, listtap: function (e) {
      var id =e.currentTarget.id
      console.log(id)
      wx.navigateTo({
        url: '/pages/info/info?id=' +id,
      })
  }


})
