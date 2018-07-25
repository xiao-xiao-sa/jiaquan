// pages/login/gysLogin/gysLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uphone:'',
    upwd:''
  },
  uPhoneInput:function(e){
    this.setData({
      uPhone:e.detail.value
    })
  },
  uPwdInput:function(e){
    this.setData({
      uPwd:e.detail.value
    })
  },
  submitLogin:function(){
    var uPhone=this.data.uPhone;
    var uPwd=this.data.uPwd;
    wx.login({
      success:function(res){
        if(res.code){
          wx.request({
            url: 'https://',
            data: {
              uPhone: uPhone,
              uPwd: uPwd,
              code:res.code
            },
            method: 'POST',
            success: function (res) {
              if (res.statusCode == 200) {
                console.log('请求成功');
                //判断用户名和密码是否正确，
                //如果用户名密码正确，则将sessionId存入本地存储中，并且跳到首页
                if (true) {
                  //将返回的sessionId存入本地存储中
                  wx.setStorageSync('sessionId', res.data.sessionId);
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                } else {
                  wx.showToast({
                    title: '返回的错误信息',
                    icon: 'none'
                  })
                }
              }
            }
          })
        }else{
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
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