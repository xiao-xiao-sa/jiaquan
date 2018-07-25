// pages/search/searchDetail/searchDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [
      // {
      //   id: '01',
      //   src: '/images/goods.jpg',
      //   title: '植物源熏蒸液(家用)ZJ-100 5kg...',
      //   price: 200,
      //   sale: '5'
      // },
      // {
      //   id: '01',
      //   src: '/images/goods.jpg',
      //   title: '植物源熏蒸液(家用)ZJ-100 5kg...',
      //   price: 200,
      //   sale: '5'
      // }
    ]
  },
  toSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toShopDetail:function(e){
    console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?id=' + id
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