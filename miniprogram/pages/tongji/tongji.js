// pages/tongji/tongji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list : [],
      morningNum : '',
      lunchNum : '',
      Y : '',
      M : '',
      D : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.shuaxin();
    
    this.getTime();
    const db = wx.cloud.database();
    //查询集合shitang中的数据   
    db.collection('shitang').get().then(res => {    
          this.setData({
            list : res.data
          })
          //console.log('获取的list：')
          //console.log(this.data.list)
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

  },

    getTime(){
      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp);
      //获取年份  
      var Y1 =date.getFullYear();
      //获取月份  
      var M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //获取当日日期 
      var D1 = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
      this.setData({
        Y : Y1,
        M : M1,
        D : D1
      })
    },

    shuaxin(e) {
      var timestamp = Date.parse(new Date());
   var date = new Date(timestamp);
   //获取年份  
   var Y =date.getFullYear();
   //获取月份  
   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
   //获取当日日期 
   var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
      const db = wx.cloud.database();
    //查询集合shitang中的数据   
    db.collection('shitang').get().then(res => {    
          this.setData({
            list : res.data
          })
          //console.log('获取的list：')
          //console.log(this.data.list)
    })
    db.collection("shitang").where({gender:'早餐'}).where({day:D}).limit(1000).get().then(res => {    
      console.log('早餐统计人数:'+res.data.length)
      this.setData({
        morningNum : res.data.length
      })
    })
    db.collection("shitang").where({gender:'午餐'}).where({day:D}).limit(1000).get().then(res => {    
      console.log('午餐统计人数:'+res.data.length)
      this.setData({
        lunchNum : res.data.length
      })
      
    })
    }

})