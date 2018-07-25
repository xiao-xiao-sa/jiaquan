// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      avatarUrl: "",
      nickName:''
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //供应商登录
  gysLogin:function(e){
    console.log(e.detail.userInfo);
    //获取用户的授权个人信息，并存入全局变量userInfo中
    app.globalData.userInfo = e.detail.userInfo;
    wx.navigateTo({
      url: 'gysLogin/gysLogin',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  /*
  *登录流程，页面加载时，查看是否授权，1、如果授权就调用登录事件，登录事件要做的事情：判断登录态是否过期，a.如果没有过期，查看sessionId是否存在，存在直接去首页，不存在就登录获取保存本地再去首页，b.如果过期重新登录获取保存本地再去首页;2、如果没有授权就停留在这个页面
   */
  onLoad: function (options) {
    var that=this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              //将userInfo存入全局变量中
              app.globalData.userInfo = res.userInfo;
              that.login();
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo);
    //获取用户的授权个人信息，并存入全局变量userInfo中
    app.globalData.userInfo=e.detail.userInfo;
    this.login();
  },
  //用户登录获取sessionId
  login:function(){
    wx.checkSession({
      success: function () {
        console.log('登录未失效')
        //session_key 未过期，并且在本生命周期一直有效
        //如果sessionId已经存在，就说明已经登录，直接跳转去首页
        //wx.getStorageSync('sessionId')
        if (true) {
          wx.switchTab({
            url: '/pages/index/index',
          })
          return;
        };
        var that = this;
        //如果sessionId不存在，说明没有登录，就让用户登录获取sessionId，然后再去首页
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.request({
                url: 'http://',
                data: { code: res.code },
                method: 'GET',
                sucess: function (res) {
                  if (res.statusCode == 200) {
                    wx.setStorageSync('sessionId', res.data.SessionId);
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
                }
              })
            }
          },
          fail: function () {
            console.log('登录时网络出错');
          },
          complete: function () { }
        })
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        //重新登录，获取sessionId存入本地
        console.log('登录已经失效')
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.request({
                url: 'http://',
                data: { code: res.code },
                method: 'GET',
                sucess: function (res) {
                  if (res.statusCode == 200) {
                    wx.setStorageSync('sessionId', res.data.SessionId);
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
                }
              })
            }
          },
          fail: function () {
            console.log('登录时网络出错');
          },
          complete: function () { }
        })
      }
    })
    
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