// pages/team/team.js
Page({
  data: {
    teamUrl:"",
  },
  onLoad: function (options) {
    wx.cloud.getTempFileURL({
      fileList: [
      'cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/team/teamPic.jpg'
    ],
      success: res => {
        this.setData({
          teamUrl:res.fileList[0].tempFileURL
        })
      },
    })

  },

  onReady: function () {

  },
  onShow: function () {

  },
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