// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step:1,
    phone:'',
    code:'',
    pwd:'',
    apwd:''
  },
  getPhone:function(e){
    var phone=e.detail.value;
    this.setData({
      phone:phone
    })
  },
  //bind:myevent是子组件中定义的函数 来获取内部的值
  onGetCode: function (e) {
    this.setData({
      code: e.detail.val
    })
  },
  nextStep:function(){
    //如果验证码验证正确，则执行下一步
    if(true){
      this.setData({
        step:2
      })
    }else{
      wx.showToast({
        title: '验证码错误，请重新输入',
        icon:'none'
      })
    }
  },
  getPwd:function(e){
    var pwd=e.detail.value;
    this.setData({
      pwd:pwd
    })
  },
  getaPwd:function(e){
    var apwd=e.detail.value;
    this.setData({
      apwd:apwd
    })
  },
  //确认提交注册
  submit:function(){
    var phone=this.data.phone;
    var pwd=this.data.pwd;
    var apwd=this.data.apwd;
    var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if(reg.test(pwd)){
      if(pwd===apwd){
        wx.login({
          success:function(res){
            if(res.code){
              wx.request({
                url: 'http://',
                data: {
                  phone: phone,
                  pwd: pwd,
                  code:res.code
                },
                success: function (res) {
                  //如果返回注册成功，则跳转到登录页面
                  if (true) {
                    wx.showToast({
                      title: '注册成功',
                    })
                    wx.redirectTo({
                      url: '../login/gysLogin/gysLogin',
                    })
                  } else {
                    //否则弹出错误提示信息
                    wx.showToast({
                      title: '后台返回的错误提示信息',
                      icon: 'none'
                    })
                  }
                }
              })
            }else{
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        wx.request({
          url: 'http://',
          data:{
            phone:phone,
            pwd:pwd
          },
          success:function(res){
            //如果返回注册成功，则跳转到登录页面
            if(true){
              wx.showToast({
                title: '注册成功',
              })
              wx.redirectTo({
                url: '../login/gysLogin/gysLogin',
              })
            }else{
              //否则弹出错误提示信息
              wx.showToast({
                title: '后台返回的错误提示信息',
                icon:'none'
              })
            }
          }
        })
      }
    }else{
      wx.showToast({
        title: '密码格式不符合要求，请重新输入',
        icon:'none'
      })
    }
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
    this.setData({
      step:1
    })
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