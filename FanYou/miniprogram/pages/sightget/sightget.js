// pages/sightget/sightget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      // 需要调用的云函数名
      name: 'baiduAI',
      // 需要传给云函数的参数
      data: {
        fileID: options.fileID
      },
      success: res => {
        console.log('百度ai传回来的数据：', res);
        wx.hideLoading();
        this.setData({
          pic: res.result.event.fileID
        })
        console.log(this.data.pic);
      },
      fail: error =>{
        console.log('接口失败：', error);
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