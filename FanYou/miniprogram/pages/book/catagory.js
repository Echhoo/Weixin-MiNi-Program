// pages/book/catagory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    bgUrl:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.getTempFileURL({
      fileList: [
      'cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/catalogue/com.png'
    ],
      success: res => {
        this.setData({
          bgUrl:res.fileList[0].tempFileURL
        })
      },
    })
  },
  festivalView: function(e){
    wx.navigateTo({ 
      url: '../festival/festival',       
    })
  },
  cityView: function(e){
    wx.navigateTo({ 
      url: '../city/city',       
    })
  },
  personView: function(e){
    wx.navigateTo({ 
      url: '../collect/collect',       
    })
  },
  teamView: function(e){
    wx.navigateTo({ 
      url: '../team/team',       
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