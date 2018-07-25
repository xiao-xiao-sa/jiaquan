// pages/classify/classify.js
const app = getApp();
const request = require('../../utils/util.js').request;
Page({
  data: {
    winHeight: '',//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    tags: ['除醛系列', '除味系列', '快消系列', '空气净化器', '厂用系列', '辅助系列'], //商品分类
    //获取的商品
    allShopList: {
      '除醛系列':{
        shopList:[
          {
            id: '01',
            src: '/images/goods.jpg',
            title: '植物源熏蒸液(家用)ZJ-100 5kg...',
            price: 200,
            sale: '5'
          },
          {
            id: '01',
            src: '/images/goods.jpg',
            title: '植物源熏蒸液(家用)ZJ-100 5kg...',
            price: 200,
            sale: '5'
          },
          {
            id: '01',
            src: '/images/goods.jpg',
            title: '植物源熏蒸液(家用)ZJ-100 5kg...',
            price: 200,
            sale: '5'
          },
          {
            id: '01',
            src: '/images/goods.jpg',
            title: '植物源熏蒸液(家用)ZJ-100 5kg...',
            price: 200,
            sale: '5'
          },
          {
            id: '01',
            src: '/images/goods.jpg',
            title: '植物源熏蒸液(家用)ZJ-100 5kg...',
            price: 200,
            sale: '5'
          },
          {
            id: '01',
            src: '/images/goods.jpg',
            title: '植物源熏蒸液(家用)ZJ-100 5kg...',
            price: 200,
            sale: '5'
          }
        ]
      },
      '除味系列':{
        shopList:[]
      },
      '辅助系列':{
        shopList: [
          {
            id: '01',
            src: '/images/goods.jpg',
            title: '植物源熏蒸液(家用)ZJ-100 5kg...',
            price: 200,
            sale: '5'
          },
          {
            id: '01',
            src: '/images/goods.jpg',
            title: '植物源熏蒸液(家用)ZJ-100 5kg...',
            price: 200,
            sale: '5'
          }
        ]
      }
    }
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    let index = e.detail.current//分类
    console.log(e.detail);
    let tag=this.data.tags[index];
    console.log(tag);
    this.setData({
      currentTab: index
    });
    this.checkCor();
    if (!this.data.allShopList[tag]) {
      this.getShopData(tag);
    }
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      var tag=this.data.tags[cur];
      if (!this.data.allShopList[tag]) {
        this.getShopData(tag);
      }
    };
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 3) {
      this.setData({
        scrollLeft: 250
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  //onLoad加载时一个页面只会调用一次
  onLoad: function (option) {
    var that = this;
    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth;
        //rpxR = 750 / clientWidth;
        //var calc = clientHeight * rpxR - 180;
        //console.log(calc)
        that.setData({
          winHeight: clientHeight - 100,
        });
      }
    });
    console.log(option);
  },
  // footerTap: app.footerTap
  footerTap: function () {

  },
  //tag : 种类
  getShopData: function (tag) {
    let that = this;
    request({
      url: 'http://',
      data:{tag:tag},
      success:function(res){
        if (res.statusCode === 200) {
          var allShopList=that.data.allShopList;
          allShopList[tag]=res.data.shopList;
          that.setdata({
            allShopList:allShopList
          })
        }
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh');
    let data = this.data;
    wx.showNavigationBarLoading();
    this.getBooks(data.tags[data.currentTab], data.currentTab);
  },

  /**
   * 生命周期函数--监听页面显示,每次打开页面都会调用一次
   */
  onShow: function () {
    var currentTab = app.globalData.curClassify;
    this.setData({
      currentTab: currentTab
    });
    console.log(this.data.currentTab);
  },
  refresh: function () {
    console.log('refresh');
    //wx.startPullDownRefresh();
  },
  onReachBottom: function () {
    //console.log('onReachBottom');
  },
  onPageScroll: function (e) {
    //console.log('onpageScroll');
    //console.log(e.scrollTop);
  },
  //去商品详情页面
  toShopDetail:function(e){
    console.log(e.currentTarget.dataset.id);
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?id='+id
    })
  },
  //去搜索页面
  toSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})