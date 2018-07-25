// components/news/news.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    'id':{
      type:String,
      value:'01',
    },
    'src':{
      type:String,
      value:'../../images/news.jpg'
    },
    'title':{
      type:String,
      value:'什么是甲醛？甲醛的危害是什么？'
    },
    'time':{
      type:String,
      value:'2018-02-16 16:12:05'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
   
  }
})
