// components/goods/goods.js
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
      value:"01"
    },
    'src':{
      type:String,
      value:"../../images/goods.png"
    },
    'title':{
      type:String,
      value: "植物源熏蒸液(家用)ZJ-100 5kg..."
    },
    'price':{
      type:String,
      value:"200"
    },
    'sale':{
      type:String,
      value:"3"
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
