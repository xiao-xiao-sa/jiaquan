// pages/shopDetail/shopDetail.js
const request = require('../../utils/util.js').request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    imgheights: [], 
    imgwidth: 750,  
    current:0, 
    shopInfo:{
      //轮播图片
      imgUrls: [
        {
          src: '/images/shopDetail.jpg'
        },
        {
          src: '/images/shopDetail.jpg'
        },
        {
          src: '/images/shopDetail.jpg'
        }
      ],
      //id
      id:'01',
      //标题
      title:'商品标题商品标题商品标题商品标题商品标题商品标题商品',
      //价格
      price:200,
      //运费
      freight: 0.00,
      //总销量
      allSale:630,
      //剩余
      surplus:863,
      //满多少元包邮
      freeFreight:68,
      //商品详情的图片
      shopDetailImg:'/images/shopDetail0.jpg',
      shopDetailImgH:0
    }
  },
  imageLoad: function (e) {  
    //获取图片真实宽度  
    var imgwidth = e.detail.width,  
      imgheight = e.detail.height,  
      //宽高比  
      ratio = imgwidth / imgheight;  
    console.log(imgwidth, imgheight)  
    //计算的高度值  
    var viewHeight = 750 / ratio;  
    var imgheight = viewHeight  
    var imgheights = this.data.imgheights  
    //把每一张图片的高度记录到数组里  
    imgheights.push(imgheight)  
    this.setData({  
      imgheights: imgheights,  
    })  
  },
  getImgH:function(e){
    //获取图片真实宽度  
    var imgwidth = e.detail.width,  
      imgheight = e.detail.height,  
      //宽高比  
      ratio = imgwidth / imgheight;   
    //计算的高度值  
    var viewHeight = 750 / ratio;  
    this.setData({  
      shopDetailImgH: viewHeight 
    })
  },
  //去购物车页面
  toShoppingCar:function(){
    wx.switchTab({
      url:'/pages/shoppingCar/shoppingCar'
    })
  },
  //加入购物车
  addShoppingCar:function(e){
    var id = e.currentTarget.dataset.id;
    request({
      url:'',
      data:{
        id:id
      },
      success:function(res){
        if (res.statusCode === 200){
          wx.showToast({
            title: '成功加入购物车',
            icon:'none'
          })
        }
      }
    })
  },
  //立即购买，去订单结算页面
  toOrderAccounts:function(e){
    var sessionId = wx.getStorageSync(sessionId);
    //因为暂时还无法去后台获取sessionId,所以这里对sessionId的检测先注释，后续再开放
    // if (!sessionId) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '不好意思，您还未授权',
    //     success: function (res) {
    //       wx.redirectTo({
    //         url: '/pages/login/login'
    //       })
    //     }
    //   })
    //   return;
    // }
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/orderForm/orderAccounts/orderAccounts?id='+id,
    })
  },
  //分享功能
  onShareAppMessage: function (res) {
    var title=this.data.shopInfo.title;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: '/pages/index/index'
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