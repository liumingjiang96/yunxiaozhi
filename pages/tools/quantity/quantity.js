const app = getApp()
import WxCountUp from '../../../utils/wxCountUp.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    name: '',
    did: '',
    area_id: '',
    electricity: 0,
    water: 0,
    isFresh: false,
    articleUrl:'http://mp.weixin.qq.com/s?__biz=MzI1NTUwNDIzNQ==&mid=100003016&idx=1&sn=5d3dc0dcc63f5691c7bf98ec4146fbf8&chksm=6a35b6cc5d423fdaf32d2718d2df9c0c83ef11e08af49def86ba18300d261d587ce6bfa81a6f#rd'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.isLogin('/' + that.route).then(function (res) {
      that.getData()
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
    if(this.data.isFresh){
      this.getData()
      this.setData({
        isFresh: false
      })
    }
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

  },

  //获取宿舍信息和水电余额
  getData:function(){
    let _this = this
    app.httpRequest({
      url: 'dormitory/getQuantityDetail',
      success:function(res){
        _this.setData({
          loading: false
        })
        if(res.data.data != []){
          let data = res.data.data
          data.waterGrade = _this.getGrade(data.water)
          data.electricityGrade = _this.getGrade(data.electricity)
          _this.setData(data)
          _this.startWaterUp(data.water)
          _this.startElectricityUp(data.electricity)
        }
      }
    })
  },
  setDormitory:function(){
    wx.navigateTo({
      url: '/pages/my/dormitory/dormitory',
    })
  },
  //获取等级
  getGrade:function(number){
    if(number <=0){
      return 'null'
    }else if(number <= 50){
      return 'a'
    }else if(number <= 100){
      return 'b'
    }else if(number <= 300){
      return 'c'
    }else{
      return 'd'
    }
  },
  //水量滚动
  startWaterUp:function(number){
    this.countUp = new WxCountUp('water', number, { decimalPlaces:2}, this)
    this.countUp.start()
  },
  //电量滚动
  startElectricityUp:function(number){
    this.countUp = new WxCountUp('electricity', number, { decimalPlaces:2}, this)
    this.countUp.start()
  },
  viewArticle:function(){
    wx.navigateTo({
      url: '/pages/article/article?src=' + encodeURIComponent(this.data.articleUrl),
    })
  }
})