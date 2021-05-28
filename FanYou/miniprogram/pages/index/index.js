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
    tiger:""
  },
    toBook: function() {
      wx.navigateTo({
        url: '../catagory/catagory',
      })
    },
    
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth,
    })
    wx.cloud.init({
      env: 'wzx-cloudbase-1grg51bs80e42788'
    })
    wx.cloud.getTempFileURL({
      fileList: [
      'cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/index/face.png',
    ],
      success: res => {

        this.setData({bgUrl:res.fileList[0].tempFileURL,
        })
        console.log(res.fileList[0])
      },
    })
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

//   onGetOpenid: function() {
//     // 调用云函数
//     wx.cloud.callFunction({
//       name: 'login',
//       data: {},
//       success: res => {
//         console.log('[云函数] [login] user openid: ', res.result.openid)
//         app.globalData.openid = res.result.openid
//         wx.navigateTo({
//           url: '../userConsole/userConsole',
//         })
//       },
//       fail: err => {
//         console.error('[云函数] [login] 调用失败', err)
//         wx.navigateTo({
//           url: '../deployFunctions/deployFunctions',
//         })
//       }
//     })
//   },

})
