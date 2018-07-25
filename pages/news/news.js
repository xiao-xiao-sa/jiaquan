// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:[
        {
          id:'01',
          src:'../../images/news.jpg',
          title:'什么是甲醛？甲醛的危害是什么？',
          time:'2018-02-16 16:12:05'
        },
        {
          id: '02',
          src: '../../images/news.jpg',
          title: '甲醛中国销量世界第一！中国娃怎么能不得白血病？',
          time: '2018-02-16 16:12:05'
        }
      ]
  },
  toNewsDetail:function(e){
    console.log(e.currentTarget.dataset.id);
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './newsDetail/newsDetail?id='+id,
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