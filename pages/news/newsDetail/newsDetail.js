// pages/news/newsDetail/newsDetail.js
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsDetail:{
      id:'01',
      title:'什么是甲醛？甲醛的危害是什么？',
      time:'2018-02-16',
      form:'筑净科技',
      /*
      *新闻详情的格式图片<img src='' />
      *文字 <view>文字</view>
      *外面不需要包裹其他标签
      * */
      article: "<img src='/images/newd1.jpg' /><view >甲醛是无色、具有强烈气味的刺激性气体，其35%~40%的水溶液通称福尔马林。甲醛是原浆毒物，能与蛋白质结合，吸入高浓度甲醛后，会出现呼吸道的严重刺激和水肿、眼刺痛、头痛，也可发生支气管哮喘。皮肤直接接触甲醛，可引起皮炎、色斑、坏死。经常吸入少量甲醛，能引起慢性中毒，出现粘膜充血、</view><img src='/images/newd2.jpg' /><view>全身症状有头痛、乏力、胃纳差、心悸、失眠、体重减轻以及植物神经紊乱等。 各种人造板材(刨花板、纤维板、胶合板等)中由于使用了粘合剂，因而可含有甲醛。新式家具的制作，墙面、地面的装饰铺设，都要使用粘合剂。凡是大量使用粘合剂的地方，总会有甲醛释放。此外，某些化纤地毯、油漆涂料也含有一定量的甲醛。</view>"
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WxParse.wxParse('article', 'html', this.data.newsDetail.article, this, 0);
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