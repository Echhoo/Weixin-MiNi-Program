// pages/book/catagory.js
let hidn = true;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // mohu:true,
    bgUrl:"",
    show:false,
    guideShow:false,
    shareImg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.getTempFileURL({
      fileList: [
      'cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/catalogue/mulu.png',
      'cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/index/share.png'
    ],
      success: res => {
        this.setData({
          bgUrl:res.fileList[0].tempFileURL,
          shareImg:res.fileList[1].tempFileURL
        })
      },
    })
    setTimeout(this.changeShow, 1000);
  }, 
  changeShow: function () { 
    this.setData({
      show:hidn  
    })
  },
  changeGuide: function () { 
    this.setData({
      guideShow:hidn
    })
  },
  introView: function(e){
    wx.navigateTo({ 
      url: '../mulu1/mulu1',       
    })
  },
  customView: function(e){
    wx.navigateTo({ 
      url: '../mulu2/mulu2',       
    })
  },
  personView: function(e){
    wx.navigateTo({ 
      url: '../mulu3/mulu3',       
    })
  },

  shows: function () {
    hidn = false;
    if(this.data.show){
      this.setData({
        show:false,
        // mohu:false
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
    let that = this;
    setTimeout(function () {
      app.slideupshow(this, 'slide_up1', -150, 1)
    }.bind(this), 2000);
    setTimeout(function () {
      app.slideupshow(this, 'slide_up2', -45, 1)
    }.bind(this), 2700);
    setTimeout(function () {
      app.slideupshow(this, 'slide_up3', 60, 1)
    }.bind(this), 3400);
    setTimeout(function () {
      app.slideupshow(this, 'slide_up4', 170, 1)
    }.bind(this), 4100);

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
  onShareAppMessage: function(res) {
    let that = this;
    return {
      title: "泛游·你旅行的好朋友",
      path: '/pages/index/index',
      imgUrl: that.data.shareImg,
      success: function(res) {
        console.log(res, "转发成功"),
        console.log(imgUrl)
      },
      fail: function(res) {
        // console.log(res, "转发失败")
      }
  
    }

  },
})