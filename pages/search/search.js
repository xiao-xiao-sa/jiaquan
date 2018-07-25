// pages/search/search.js
var request = require('../../utils/util.js').request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList:[],
    searchInput:'',
    hasHistory:false
  },
  getSearchInput:function(e){
    this.setData({
      searchInput:e.detail.value
    })
  },
  search:function(e){
    console.log(10000);
    var searchInput = e.currentTarget.dataset.item || this.data.searchInput;
    if(searchInput==''){
      wx.showToast({
        title: '请输入关键词搜索',
        icon:'none'
      })
      return;
    } 
    if (wx.getStorageSync('history')){
      var history = wx.getStorageSync('history');
      if(history.searchList.length>5){
        history.searchList=history.searchList.slice(0,5);
      }
      if(history.searchList.indexOf(searchInput)==-1){
        history.searchList.unshift(searchInput);
      }
      this.setData({
        searchList:history.searchList
      })
      wx.setStorage({
        key: 'history',
        data: history,
      })
    }else{
      var history={};
      history.searchList=[];
      history.searchList.unshift(searchInput);
      this.setData({
        searchList:history.searchList
      })
      console.log(history);
      wx.setStorage({
        key: 'history',
        data: history,
      })
      console.log(wx.getStorageSync('history'));
    }
    wx.redirectTo({
      url: '/pages/search/searchDetail/searchDetail'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //存储在本地的历史搜索记录history:{searchList:[]}
    if (wx.getStorageSync('history')){
      var searchList = wx.getStorageSync('history').searchList;
      this.setData({
        searchList:searchList,
        hasHistory:true
      })
    }
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