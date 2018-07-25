// components/getCode/getCode.js
const app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    phone: {            // 属性名（父组件传的值）
      type: Number,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },
  data: {
    canCode: true,
    times: 60,
    name: ''
  },
  methods: {
    // 这里放置自定义方法  
    getCode: function () {
      var that = this;
      var phone = that.data.phone;
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      //如果手机号为空，弹出提示信息
      if (phone == '') {
        wx.showToast({
          title: '请输入手机号',
          icon:'none'
        })
        return false
        //如果手机号输入不正确，弹出提示信息
      }else if(!reg.test(phone)){
        wx.showToast({
          title: '输入的手机号格式不正确，请检查',
          icon: 'none'
        })
        return false;
      }
      //否则的话，就调取倒计时函数
      that.settimes()
    },
    settimes: function () {
      var that = this;
      var second = that.data.times;
      second--;
      that.setData({
        times: second,
        canCode: false
      })
      //回调
      var ss = setTimeout(function () {
        that.settimes()
      }, 1000);
      if (second < 1) {
        clearTimeout(ss);
        that.setData({
          canCode: true,
          times: 60
        })
      }
    },
    //将输入的验证码传给父组件
    bindCode: function (e) {
      var myEventDetail = {
        val: e.detail.value
      } // detail对象，提供给事件监听函数
      this.triggerEvent('myevent', myEventDetail)
    }
  }
})  