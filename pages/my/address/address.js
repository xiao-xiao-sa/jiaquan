// pages/my/address/address.js
var request =  require('../../../utils/util.js').request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[
      {
        id:'01',
        name:'王一',
        phone:'12345678900',
        region: ['浙江省','杭州市','余杭区'],
        detailed:'仓前互联网村23幢102',
        isDefault:1
      },
      {
        id:'02',
        name: '徐风年',
        phone: '12345678900',
        region: ['浙江省', '杭州市', '余杭区'],
        detailed: '仓前互联网村23幢102',
        isDefault:0
      }
    ]
  },
  //修改默认地址
  changDefault:function(e){
    var that=this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var addressList=this.data.addressList;
    for(var i=0,len=addressList.length;i<len;i++){
      if(i===index){
        addressList[i].isDefault=1;
      }else{
        addressList[i].isDefault = 0;
      }
    };
    this.setData({
      addressList:addressList
    })
    //发送请求去后台修改
    //var id=this.data.addressList[index].id;
    // request({
    //   url:'http://',
    //   data:{
    //     id:id
    //   },
    //   success:function(res){

    //   }
    // })
  },
  //编辑地址
  editAddress:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../newAddress/newAddress?id='+id,
    })
  },
  //删除地址
  deleteAddress:function(e){
    var index = e.currentTarget.dataset.index;
    var addressList=this.data.addressList;
    var id =addressList[index].id;
    addressList.splice(index,1);
    console.log(addressList);
    this.setData({
      addressList:addressList
    })
    // request({
    //   url:'http://',
    //   data:{id:id},
    //   success:function(res){
    //     if(res.statusCode==200){
    //       //删除成功后，将重新返回的地址列表渲染到页面上
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    request({
      url: 'http://',
      success: function (res) {
        if (res.statusCode == 200) {
          var addressList = res.addressList;
          that.setData({
            addressList: addressList
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