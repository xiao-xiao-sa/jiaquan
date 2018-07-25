//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmap = new QQMapWX({
  //在腾讯地图开放平台申请密钥 http://lbs.qq.com/mykey.html
  key: 'ETKBZ-FTBRF-VA2JG-N7ATV-ALN7J-ELBYA'
});
var request = require('../../utils/util.js').request;
Page({
  data: {
    //经度
    myLatitude: "",
    //纬度
    myLongitude: "",
    //获取的地址
    myAddress: "",
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000, 
    userInfo:{},
    backData:{
      //轮播图片
      imgUrls: [
        {
          src: '/images/banner1.png'
        },
        {
          src: '/images/banner2.jpg'
        },
        {
          src: '/images/banner1.png'
        }
      ],
      //导航栏的五个图标，文字，图片，跳转的路径
      navList: [
        {
          url: '/pages/about/about',
          src: '/images/about.png',
          text: '关于我们'
        },
        {
          url: '/pages/classify/classify',
          src: '/images/product.png',
          text: '产品中心'
        },
        {
          url: '/pages/join/join',
          src: '/images/shop.png',
          text: '招商加盟'
        },
        {
          url: '/pages/news/news',
          src: '/images/news.png',
          text: '新闻中心'
        },
        {
          url: '/pages/contact/contact',
          src: '/images/concact.png',
          text: '联系我们'
        },
      ],
      //两条新闻信息
      news:[
        {
          id:'01',
          src:'/images/news.jpg',
          title:'什么是甲醛？甲醛的危害是什么？',
          time:'2018-02-16 16:12:05'
        },
        {
          id: '02',
          src: '/images/news.jpg',
          title: '甲醛中国销量世界第一！中国娃怎么能不得白血病？',
          time: '2018-02-16 16:12:05'
        }
      ],
      //商品列表
      allShopList:[
        {
          shopType:'除醛系列',
          shopList:[
            {
              id:'01',
              src:'/images/goods.jpg',
              title:'植物源熏蒸液(家用)ZJ-100 5kg...',
              price:200,
              sale:'5'
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
        {
          shopType: '除味系列',
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
        },
        {
          shopType: '快消系列',
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
        },
        {
          shopType: '空气净化器',
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
        },
        {
          shopType: '厂用系列',
          shopList: [
            {
              id: '01',
              src: '../../images/goods.jpg',
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
        {
          shopType: '辅助系列',
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
      ]
    },
    liuyan:{
      name:'',
      phone:'',
      company:'',
      region:['','','']
    }
  },
  onLoad: function () {
    console.log(app.globalData.userInfo);
    var that = this;
    //用微信提供的api获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({ myLatitude: res.latitude, myLongitude: res.longitude })
        //用腾讯地图的api，根据经纬度获取城市
        qqmap.reverseGeocoder({
          location: {
            latitude: that.data.myLatitude,
            longitude: that.data.myLongitude
          },
          success: function (res) {
            console.log(res)
            var a = res.result.address_component
            //获取市和区（区可能为空）
            var city = a.city+'';
            var myAddress=city.substring(0,3);
            console.log(myAddress);
            that.setData({ myAddress: myAddress})
            //控制台输出结果
            // console.log(that.data.myAddress)
          }
        })
      }
    });
    request({
      url:'http://',
      success:function(res){
        //返回的数据为backData
      }
    })
  },
  //点击新闻去新闻详情页面
  toNewsDetail:function(e){
    console.log(e.currentTarget.dataset.id);
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/newsDetail/newsDetail?id='+id,
    })
  },
  //点击商品区商品详情页面
  toShopDetail:function(e){
    console.log(e.currentTarget.dataset.id);
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?id='+id
    })
  },
  //导航栏点击产品中心去分类页面
  toClassify:function(e){
    //跳转tabBar页面，只能用这种方式，这种方式不能带参数
    //所以把参数放在全局变量里
    //console.log(e.currentTarget.dataset.cur);
    if (e.currentTarget.dataset.cur){
      var cur = e.currentTarget.dataset.cur;
      app.globalData.curClassify = cur;
    }else{
      app.globalData.curClassify = 0;
    }
    wx.switchTab({    //跳转到tabBar页面，并关闭其他所有tabBar页面
      url:'/pages/classify/classify'
    })
  },
  toSearch:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var region="liuyan.region";
    this.setData({
      [region]: e.detail.value
    })
  },
  getName:function(e){
    var name="liuyan.name";
    this.setData({
      [name]:e.detail.value
    })
  },
  getPhone:function(e){
    var phone = "liuyan.phone";
    this.setData({
      [phone]: e.detail.value
    })
  },
  getCompany:function(e){
    var company = "liuyan.company";
    this.setData({
      [company]: e.detail.value
    })
  },
  //提交留言
  submitLiuyan:function(){
    var liuyan=this.data.liuyan;
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(liuyan.name==''){
      wx.showToast({
        title: '姓名不能为空',
        icon:'none'
      })
      return false;
    }else if(!reg.test(liuyan.phone)){
      wx.showToast({
        title: '联系电话格式不符合要求',
        icon: 'none'
      })
      return false;
    }else if(liuyan.company==''){
      wx.showToast({
        title: '公司地址不能为空',
        icon: 'none'
      })
      return false;
    }
    request({
      url: 'http://',
      data: {
        liuyan:liuyan
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        if(res.statusCode==200){
          wx.showToast({
            title: '提交成功，我们会尽快与您取得联系',
          })
        }
      },
      fail: function(res) {
        console.log('网络出错')
      },
      complete: function(res) {},
    })
  }
})
