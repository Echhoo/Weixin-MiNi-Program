// pages/sightget/sightget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context:[],
    pic:"",
    bgUrl:"",
    is_bg:false,
    score:0,
    content:true,
    scoreOcc:true,
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
        // console.log('百度ai传回来的数据：', res);
        wx.hideLoading();
        // console.log("百度ai传回来的数据2：", res.result.val.result)
        this.setData({
          context: res.result.val.result,
          pic:res.result.img,
          score:res.result.val.result[0].score.toPrecision(2)
        })
        // console.log(this.data.context);
        // console.log(this.data.pic);
        var img = this.data.pic
        // console.log(img)        
        wx.cloud.getTempFileURL({
          fileList:[img,],
          success: res => {
            this.setData({
              bgUrl:res.fileList[0].tempFileURL,
            })
          },
        })
        setTimeout(this.boxMove, 2000)
      },
      fail: error =>{
        // console.log('接口失败：', error);
      }
    })
  },
boxMove:function(e){
  if(!this.data.is_bg){
    this.setData({
      is_bg:true,
      content:false
    })
  }
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