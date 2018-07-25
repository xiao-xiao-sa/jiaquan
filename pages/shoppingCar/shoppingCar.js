// pages/shoppingCar/shoppingCar.js
var request = require('../../utils/util.js').request;
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,    // 全选状态，默认不选中
    obj: {
      name: "hello"
    }
  },
  //获取购物车列表数据
  getCarts:function(){
    var that = this;
    //如果本地存储没有数据，页面加载时会去数据库获取购物车商品，并且存入本地存储
    if (!wx.getStorageSync('carts')) {
      request({
        url: 'https://',
        method: 'GET',
        success: function (res) {
          var carts = that.data.carts;
          if (res.data.length > 0) {
            carts.push(res.data);
            that.setData({
              carts: carts,
              hasList: true
            })
          } else {
            that.setData({
              hasList: false
            })
          }
        }
      })
    } else {
      //如果有数据就直接去本地获取数据
      var carts = wx.getStorageInfoSync('carts');
      that.setData({
        carts: carts
      })
    }
  },
  onLoad:function(options){
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
    // }
    this.getCarts();
  },
  onShow() {
    //暂时显示数据的，以后会删除
    this.setData({
      hasList: true,
      carts: [
        // { 
        //   id: 1, 
        //   title: '植物源熏蒸液(家用) ZJ-100 4桶箱装5kg', 
        //   src: '/images/order.jpg', 
        //   num: 4, 
        //   price: 0.01,
        //   //商品是否被选中，默认就是没有选中的，不会去数据库修改该状态 
        //   selected: false 
        // },
        // {
        //   id: 2,
        //   title: '植物源熏蒸液(家用) ZJ-100 4桶箱装5kg',
        //   src: '/images/order.jpg',
        //   num: 4,
        //   price: 0.01,
        //   selected: false
        // },
      ]
    });
    this.getTotalPrice();
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    //修改的购物车列表同时将本地存储也修改
    wx.setStorageSync('carts', carts);
    this.getTotalPrice();
    for(var i=0,len=carts.length;i<len;i++){
      if(carts[i].selected==false){
        this.setData({
          selectAllStatus:false
        })
        return;
      }
    }
    this.setData({
      selectAllStatus: true
    })
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    var id=carts[index].id;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    //修改的购物车列表同时将本地存储也修改
    wx.setStorageSync('carts', carts);
    //还需要将数据库中也同时修改
    request({
      url:'https://',
      data:{id:id},
      method:'GET',
      success:function(res){
        console.log(res);
      }
    })
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    //修改的购物车列表同时将本地存储也修改
    wx.setStorageSync('carts', carts);
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    //修改的购物车列表同时将本地存储也修改
    wx.setStorageSync('carts', carts);
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    //修改的购物车列表同时将本地存储也修改
    wx.setStorageSync('carts', carts);
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  //去订单结算页面
  toOrderAccounts:function(e){
    var carts=this.data.carts;
    var n=0;
    for(var i=0,len=carts.length;i<len;i++){
      if(carts[i].selected==true){
        n++;
        console.log(n)
      }
    }
    if(n>0){
      //如果有选中的商品，就把选中的商品保存在
      wx.navigateTo({
        url: '/pages/orderForm/orderAccounts/orderAccounts',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      wx.showToast({
        title: '您还未选择任何商品哦！',
        icon:'none'
      })
    }
  }
})