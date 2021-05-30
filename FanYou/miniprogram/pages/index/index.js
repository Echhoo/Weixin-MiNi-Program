//index.js
const app = getApp();
const back = wx.getBackgroundAudioManager();
Page(
  
  {
    
  data: {
    height:0,
    width:0,
    rate:0,
    bgUrl: "",
    iconUrl:"",
    tiger:"",

  },
    toBook: function() {
      wx.redirectTo({
        url: '../catagory/catagory',
      })
    },
    
  onLoad: function (options) {
    wx.cloud.init({
      env: 'wzx-cloudbase-1grg51bs80e42788'
    })
    wx.cloud.getTempFileURL({
      fileList: [
      'cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/index/home.png',
      
    ],
      success: res => {

        this.setData({
          bgUrl:res.fileList[0].tempFileURL,
          
        })
        // console.log(res.fileList[0])
      },
      
    })
    setTimeout(() => {
        this.toBook()
    }, 1700);
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },
  onShareAppMessage: function(res) {
    let that = this;
    return {
      title: "泛游·你旅行的好朋友",
      path: '/pages/index/index',
      imgUrl: this.data.shareImg,
      success: function(res) {
        // console.log(res, "转发成功")
      },
      fail: function(res) {
        // console.log(res, "转发失败")
      }
    }

  },

})
