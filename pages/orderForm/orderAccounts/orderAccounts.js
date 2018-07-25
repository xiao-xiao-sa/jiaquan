// pages/orderForm/orderAccounts/orderAccounts.js
var request = require('../../../utils/util.js').request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户类型1-普通用户，2-供应商
    userType: 1,
    orderInfo:{
      name:'王一',
      phone:'12345678900',
      address: '浙江省杭州市余杭区良渚街道 青云坊8幢2单元301室',
      shopList: [
        {
          id: 1,
          title: '植物源熏蒸液(家用) ZJ-100 4桶箱装5kg',
          src: '/images/order.jpg',
          num: 4,
          price: 100,
          message:''
        },
        {
          id: 2,
          title: '植物源熏蒸液(家用) ZJ-100 4桶箱装5kg',
          src: '/images/order.jpg',
          num: 4,
          price: 200,
          message:''
        },
      ],
      totalPrice:0,
      freight:0,
      pay:0
    }
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let shopList = this.data.orderInfo.shopList;
    let num = shopList[index].num;
    num = num + 1;
    shopList[index].num = num;
    var sp="orderInfo.shopList";
    this.setData({
      [sp]: shopList
    });
    this.getTotalPrice();
    this.getFreight();
    this.getPay();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    //const obj = e.currentTarget.dataset.obj;
    let shopList = this.data.orderInfo.shopList;
    let num = shopList[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    shopList[index].num = num;
    var sp="orderInfo.shopList";
    this.setData({
      [sp]: shopList
    }); 
    this.getTotalPrice();
    this.getFreight();
    this.getPay();
  },
  /**
   * 计算总价
   */
  getTotalPrice() {
    let shopList = this.data.orderInfo.shopList;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < shopList.length; i++) {         // 循环列表得到每个数据                    // 判断选中才会计算价格
      total += shopList[i].num * shopList[i].price;   // 所有价格加起来
    }
    console.log(total);
    var tp="orderInfo.totalPrice";
    this.setData({                                // 最后赋值到data中渲染到页面
      [tp]: total.toFixed(2)
    });
  },
  // 计算实付价格
  getPay:function(){
    var totalPrice=parseFloat(this.data.orderInfo.totalPrice);
    var freight=parseFloat(this.data.orderInfo.freight);
    var pay=totalPrice+freight;
    var py="orderInfo.pay";
    this.setData({
      [py]:pay.toFixed(2)
    })
  },
  //计算运费
  getFreight:function(){

  },
  //点击购买发生的事件
  account: function (e) {
    //获取订单号，订单金额，如果是普通用户，需要调用微信支付接口，openid通过发送sessionid在后台获取，
    //如果是供应商，因为不走微信支付，直接通过后台充值积分，使用积分支付
    //订单编号由后台生成，前台生成容易作死
    //需要给后台所有的订单信息
    //？如何获取用户类型，后台怎么传过来，需要保存在本地
    var data = this.data.orderInfo;
    if(userType==1){
      request({
        url: 'https://',
        method: 'POST',
        data: { data: data },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //需要把订单号返回
          var timeStamp = new Date().getTime();
          var orderNumber = res.data.orderNumber;
          wx.requestPayment({
            //当前时间戳
            'timeStamp': timeStamp,
            //随机字符串，32个字符以下
            'nonceStr': orderNumber,
            'package': 'prepay_id=' + res.data.prepay_id,
            'signType': 'MD5',
            'paySign': res.data._paySignjs,
            'success': function (res) {
              console.log(res);
              //如果支付成功就跳转交易成功页面，并且销毁当前页面

            },
            'fail': function (res) {
              console.log('fail:' + JSON.stringify(res));
            }
          })
        }
      })
    }else if(userType==2){
      request({
        url:'https://',
        data:{data:data},
        method:'POST',
        success:function(res){
          request({
            url: 'https://',
            data: {data:data},
            method: 'POST',
            success: function (res) {
              //提交成功修改用户数据库中的积分，如果积分余额不足，则会提示用户，付款失败，积分余额不足，请充值
              console.log(res)
              that.onShow();
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
      })
    }
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.id){
      //如果携带参数，是从立即购买进入页面的，则去数据库获取商品信息，和收货人信息
      var id = options.id;//传过来的商品id
      request({
        url: 'https://',
        data:{id:id},
        method: 'GET',
        success: function (res) {
          //获取该商品的id
          var shopList = [];
          shopList.push(res.shop);
          var sp='orderInfo.shopList';
          var n='orderInfo.name';
          var p='orderInfo.phone';
          var a='orderInfo.address';
          that.setData({
            [sp]: shopList,
            [n]:res.name,
            [p]:res.phone,
            [a]:res.address
          })
        }
      })
    }else{
      //如果没有携带参数，就是从购物车进入的，去本地存储获取商品，去数据库获取收货人信息
      request({
        url:'https://',
        method:'GET',
        success:function(res){
          var n = 'orderInfo.name';
          var p = 'orderInfo.phone';
          var a = 'orderInfo.address';
          that.setData({
            [n]: res.name,
            [p]: res.phone,
            [a]: res.address
          })
        }
      })
      var carts=wx.getStorageInfoSync('carts');
      var shopList=[];
      for(var i=0,len=carts.length;i<len;i++){
        if (carts[i].selected){
          var p=carts[i];
          var t={};
          t.id=p.id;
          t.title=p.title;
          t.src=p.src;
          t.num=p.num;
          t.price=p.price;
          t.message='';
          shopList.push(t);
        }
      }
      var sp="orderInfo.shopList";
      this.setData({
        [sp]:shopList
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
    this.getTotalPrice();
    this.getFreight();
    this.getPay();
    //获取用户的默认地址

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