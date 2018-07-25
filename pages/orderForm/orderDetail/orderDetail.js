// pages/orderForm/orderDetail/orderDetail.js
const APP = getApp();
const request = require('../../../utils/util.js').request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户类型1-普通用户，2-供应商
    userType:1,
    orderInfo:{
      //收货人
      name:'王一',
      //联系电话
      phone:'12345678900',
      //收货地址
      address:'浙江省杭州市余杭区良渚街道 青云坊8幢2单元301室',
      //订单编号
      orderNumber: '0123456789',
      //订单状态 01-待付款，02-待发货，03-待收货，04-已完成
      status: '03',
      //商品图片
      src: '../../../images/order.jpg',
      //商品标题
      title: '商品标题商品标题商品标题商品标题',
      //商品价格
      price: 163.90,
      //商品数量
      num: 2,
      //运费
      freight: 0.00,
      //快递公司
      company:'',
      //快递单号
      postid:'',
      //订单创建时间
      orderTime01:'2018-04-26 13:12:24',
      //订单付款时间
      orderTime02:'2018-04-26 13:12:24',
      //订单发货时间
      orderTime03:'2018-04-26 13:12:24',
      //订单收货时间
      orderTime04:'2018-04-26 13:12:24'
    }
  },

  //是否取消订单
  cancelOrder: function (e) {
    var orderNumber = e.currentTarget.dataset.orn;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定取消该订单吗',
      success: function (res) {
        if (res.confirm) {
          request({
            url:'https://',
            data:{orderNumber:orderNumber},
            method:'POST',
            success:function(res){
              if(res.statusCode==200){
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      }
    })
  },
  //是否删除订单
  deleteOrder: function (e) {
    var orderNumber = e.currentTarget.dataset.orn;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除该订单吗',
      success: function (res) {
        if (res.confirm) {
          request({
            url: 'https://',
            data: { orderNumber: orderNumber },
            method: 'POST',
            success: function (res) {
              if (res.statusCode == 200) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      }
    })
  },
  //付款
  pay: function (e) {
    var that = this;
    //获取订单号，订单金额，如果是普通用户，需要调用微信支付接口，openid通过发送sessionid在后台获取，
    //如果是供应商，因为不走微信支付，直接通过后台充值积分，使用积分支付
    var orderNumber = e.currentTarget.dataset.orn;
    var totalFee = e.currentTarget.dataset.totalfee;
    if (userType==1) {
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
                  wx.navigateBack({
                    delta:1
                  })
                }
              })
            },
            'fail': function (res) {
              console.log('fail:' + JSON.stringify(res));
            }
          })
        }
      })
    } else if (userType==2) {
      request({
        url: 'https://',
        data: {
          orderNumber: orderNumber,
          totalFee: totalFee
        },
        method: 'POST',
        success: function (res) {
          //提交成功修改用户数据库中的积分，如果积分余额不足，则会提示用户，付款失败，积分余额不足，请充值
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }


  },
  //查看物流
  wuliu: function (e) {
    var company = e.currentTarget.dataset.company;
    var postid = e.currentTarget.dataset.postid;
    console.log(company, postid)
    wx.navigateTo({
      url: '/pages/orderForm/wuliu/wuliu?company=' + company + '&postid=' + postid,
    })
  },
  //确认收货
  receive: function (e) {
    var that = this;
    var orderNumber = e.currentTarget.dataset.orn;
    console.log(orderNumber);
    wx.showModal({
      title: '提示',
      content: '确认已经收到购买的商品了吗',
      success:function(res){
        if(res.confirm){
          request({
            url: 'https://',
            data: { orderNumber: orderNumber },
            method: 'POST',
            success: function (res) {
              wx.navigateBack({
                delta:1
              })
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
    var that=this;
    request({
      url:'',
      success:function(res){
        console.log(res);
        if(res.statusCode===200){
          that.setData({
            orderInfo:res.orderInfo
          })
        }
      }
    })
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