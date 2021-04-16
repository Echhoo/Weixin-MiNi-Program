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
        url: '../book/catagory',
      })
    },
    playBackgroundAudio: function () {
      player();
      function player(){
      back.src="http://music.163.com/#/song?id=5271030";
      back.title="绿光";
      back.coverImgUrl="https://img-blog.csdnimg.cn/20200402100157151.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc3Mzk0MQ==,size_16,color_FFFFFF,t_70";
      back.play();
      back.onEnded(()=>{
        player();
      })
      }
 },
  onLoad: function (options) {
    this.playBackgroundAudio();
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth,
    })
    wx.cloud.init({
      env: 'cloud1-4gt82x70cccbf17e'
    })
    wx.cloud.getTempFileURL({
      fileList: [
      'cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/tiger/fanyou.png',
      'cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/tiger/tiger.png',
      'cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/tiger/yinzhang.png'
    ],
      success: res => {
        this.setData({bgUrl:res.fileList[0].tempFileURL,
          iconUrl:res.fileList[1].tempFileURL,
          tiger:res.fileList[2].tempFileURL
        })
        console.log(res.fileList[1].tempFileURL)
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

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  jumpAnimation: function(){
    
  },
  // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {
  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]
        
  //       // 上传图片
  //       const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath
            
  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })
  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },

})
