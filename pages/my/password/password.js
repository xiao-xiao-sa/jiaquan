// pages/my/password/password.js
var request = require('../../../utils/util.js').request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入的旧密码
    oldp:'',
    //输入的新密码
    newp:'',
    //再次的新密码
    againp:''
  },
  oldInput:function(e){
    this.setData({
      oldp:e.detail.value
    })
  },
  newInput:function(e){
    this.setData({
      newp: e.detail.value
    })
  },
  againInput:function(e){
    this.setData({
      againp: e.detail.value
    })
  },
  submit:function(){
    var that=this;
    var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    var oldp=this.data.oldp;
    var newp=this.data.newp;
    var againp=this.data.againp;
    if(reg.test(newp)){
      if(newp===againp){
        //发送请求修改密码
        request({
          url: '',
          data:{
            oldpwd:oldp,
            newpwd:newp
          },
          success:function(meg){
            //如果返回的meg=1,则修改成功，弹出提示信息，返回上一页
            //meg=2,旧密码输入错误，弹出提示信息return false
          }
        })
      }else{
        wx.showToast({
          title:'两次密码输入不一致',
          icon:'none'
        })
        return false;
      }
    }else{
      wx.showToast({
        title:'密码必须为8`16位数字和字母组合',
        icon:'none'
      })
      return false;
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