// pages/orderForm/orderForm.js
var request = require('../../utils/util.js').request;
var app= getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //用户类型1-普通用户，2-供应商
    userType: 1,
    orderNav:['全部','待付款','待发货','待收货','已完成'],
    currentTab:0,//默认当前tab项为0
    backData:[
      {
        //订单号
        orderNumber:'0123454789',
        //商品id
        id:'01',
        //订单图片
        src:'/images/order.jpg',
        //商品title
        title:'商品标题商品标题商品标题商品标题',
        //商品价格
        price:163.90,
        //商品数量
        num:2,
        //订单状态 01-待付款，02-待发货，03-待收货，04-已完成
        status:'01',
        //运费
        freight: 0.00,
        //快递公司
        company:'',
        //快递单号
        postid:''
      },
      {
        //订单号
        orderNumber:'0127556789',
        //商品id
        id:'01',
        //订单图片
        src:'/images/order.jpg',
        //商品title
        title:'商品标题商品标题商品标题商品标题',
        //商品价格
        price:163.90,
        //商品数量
        num:2,
        //订单状态 01-待付款，02-待发货，03-待收货，04-已完成
        status:'02',
        //运费
        freight: 0.00,
        //快递公司
        company: '',
        //快递单号
        postid: ''
      },
      {
        //订单号
        orderNumber: '0123866789',
        //商品id
        id: '01',
        //订单图片
        src: '/images/order.jpg',
        //商品title
        title: '商品标题商品标题商品标题商品标题',
        //商品价格
        price: 163.90,
        //商品数量
        num: 2,
        //订单状态 01-待付款，02-待发货，03-待收货，04-已完成
        status: '03',
        //运费
        freight: 0.00,
        //快递公司
        company: 'yunda',
        //快递单号
        postid: '3831699397708'
      },
      {
        //订单号
        orderNumber: '0123656789',
        //商品id
        id: '01',
        //订单图片
        src: '/images/order.jpg',
        //商品title
        title: '商品标题商品标题商品标题商品标题',
        //商品价格
        price: 163.90,
        //商品数量
        num: 2,
        //订单状态 01-待付款，02-待发货，03-待收货，04-已完成
        status: '04',
        //运费
        freight: 0.00,
        //快递公司
        company:'yuantong',
        //快递单号
        postid:'884044987614211278'
      }
    ],
    //待付款的订单数量 注:页面刚开始加载的时候就遍历返回的数据数组，记录每一个状态下订单的数量
    status01:1,
    //待发货的订单数量
    status02:1,
    //待收货的订单数量
    status03:1,
    //交易成功的订单数量
    status04:1
  },
  changeTab:function(e){
    var cur=e.currentTarget.dataset.cur;
    var that=this;
    this.setData({
      currentTab:cur
    })
  },
  //删除订单
  del:function(val){
    var orderNumber=val;
    var backData = this.data.backData;
    //遍历订单数组，删除该订单
    for (var i = 0, len = backData.length; i < len; i++) {
      if (backData[i].orderNumber == orderNumber) {
        var status = backData[i].status;
        if (status == '01') {
          var status01 = this.data.status01;
          status01 -= 1;
          this.setData({
            status01: status01
          })
        } else if (status == '02') {
          var status02 = this.data.status02;
          status02 -= 1;
          this.setData({
            status02: status02
          })
        } else if (status == '03') {
          var status03 = this.data.status03;
          status03 -= 1;
          this.setData({
            status03: status03
          })
        } else if (status == '04') {
          var status04 = this.data.status04;
          status04 -= 1;
          this.setData({
            status04: status04
          })
        }
        backData.splice(i, 1);
        console.log(backData);
        this.setData({
          backData: backData
        })
        break;
      }
    }
    //发送订单号去数据库删除该订单
    // request({
    //   url:'http://',
    //   data:{orderNumber:orderNumber},
    //   method:'POST',
    //   success:function(){}
    // })
  },
  //是否取消订单
  cancelOrder:function(e){
    var orderNumber = e.currentTarget.dataset.orn;
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定取消该订单吗',
      success:function(res){
        if (res.confirm){
          that.del(orderNumber);
        }
      }
    })
  },
  //是否删除订单
  deleteOrder:function(e){
    var orderNumber = e.currentTarget.dataset.orn;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除该订单吗',
      success: function (res) {
        if (res.confirm) {
          that.del(orderNumber);
        }
      }
    })
  },
  //付款
  pay:function(e){
    var that=this;
    //获取订单号，订单金额，如果是普通用户，需要调用微信支付接口，openid通过发送sessionid在后台获取，
    //如果是供应商，因为不走微信支付，直接通过后台充值积分，使用积分支付
    var orderNumber = e.currentTarget.dataset.orn;
    var totalFee = e.currentTarget.dataset.totalfee;
    if(userType==1){
      request({
        url: 'https://',
        method: 'POST',
        data: {
          orderNumber: orderNumber,
          totalFee: totalFee
        },
        success: function (res) {
          var timeStamp = new Date().getTime();
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
              //如果支付成功，去数据库修改当前订单的转态，重新获得订单列表
              request({
                url: 'https://',
                data: {
                  orderNumber: orderNumber
                },
                method: 'POST',
                success: function (res) {
                  that.onShow();
                }
              })
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
        data:{
          orderNumber:orderNumber,
          totalFee:totalFee
        },
        method:'POST',
        success:function(res){
          //提交成功修改用户数据库中的积分，如果积分余额不足，则会提示用户，付款失败，积分余额不足，请充值
          console.log(res)
          that.onShow();
        },
        fail:function(res){
          console.log(res)
        }
      })
    }
    
    
  },
  //查看物流
  wuliu:function(e){
    var company = e.currentTarget.dataset.company;
    var postid=e.currentTarget.dataset.postid;
    console.log(company,postid)
    wx.navigateTo({
      url: '/pages/orderForm/wuliu/wuliu?company='+company+'&postid='+postid,
    })
  },
  //确认收货
  receive:function(e){
    var that=this;
    var orderNumber = e.currentTarget.dataset.orn;
    console.log(orderNumber);
    wx.showModal({
      title: '提示',
      content: '确认已经收到了购买的商品了吗',
      success:function(res){
        if(res.confirm){
          request({
            url: 'https://',
            data: { orderNumber: orderNumber },
            method: 'POST',
            success: function (res) {
              //修改成功之后，重新获取订单列表
              that.onShow();
            },
          })
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var sessionId = wx.getStorageSync(sessionId);
    //页面加载时就需要获取用户类型!如何获取？需要发送请求去获取吗？
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
    // }
  },
  //查看物流订单详情
  toOrderDetail:function(e){
    var orn=e.currentTarget.dataset.orn;
    console.log(orn);
    wx.navigateTo({
      url: '/pages/orderForm/orderDetail/orderDetail?orderNumber='+orn
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //获取订单数据列表
  getOrderForm:function(){
    var that = this;
    request({
      url: 'http://',
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          var backData = res.backData
          //循环遍历数组，
          var status01 = 0;
          var status02 = 0;
          var status03 = 0;
          var status04 = 0;
          for (var i = 0, len = backData.length; i < len; i++) {
            var item = backData[i];
            if (item.status == '01') {
              status01 += 1;
            } else if (item.status == '02') {
              status02 += 1;
            } else if (item.status == '03') {
              status03 += 1;
            } else if (item.status == '04') {
              status04 += 1;
            }
          }
          that.setData({
            status01: status01,
            status02: status02,
            status03: status03,
            status04: status04,
            backData: backData
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var currentTab=app.globalData.curOrder;
    this.setData({
      currentTab:currentTab
    })
    this.getOrderForm();
    console.log(1000);
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
    this.onShow();
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