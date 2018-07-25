// pages/my/my.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{},
    //用户类型，页面加载时就需要获取的
    userType:1
  },
  //点击去订单页面
  toOrderForm:function(e){
    var cur = e.currentTarget.dataset.cur;
    app.globalData.curOrder=cur;
    wx.switchTab({
      url: '/pages/orderForm/orderForm',
    })
  },
  getJcbg:function(){
    wx.downloadFile({
      url: 'http://www.gov.cn/zhengce/pdfFile/2018_PDF.pdf',
      success: function (res) {
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success:function(res){
            wx.openDocument({
              filePath: res.savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      }
    })
  },
  getYsbg: function () {
    wx.downloadFile({
      url: 'http://www.gov.cn/zhengce/pdfFile/2018_PDF.pdf',
      success: function (res) {
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function (res) {
            wx.openDocument({
              filePath: res.savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = app.globalData.userInfo;
    //如何获取用户类型，后台需要怎么传过来呢？
    this.setData({
      userInfo:userInfo,
    })
    //因为暂时还无法去后台获取sessionId,所以这里对sessionId的检测先注释，后续再开放
    // if(!sessionId){
    //   wx.showModal({
    //     title: '提示',
    //     content: '不好意思，您还未授权',
    //     success:function(res){
    //       wx.redirectTo({
    //         url:'/pages/login/login'
    //       })
    //     }
    //   })
    // }
    
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