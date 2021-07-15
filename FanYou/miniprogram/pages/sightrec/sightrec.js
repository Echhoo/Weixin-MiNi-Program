var app = getApp();
var that = '';
Page({
  data: {
    img: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this.data
    wx.cloud.getTempFileURL({
      fileList: ['cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/recognition/head.png',
    ],
      success: res => {
        this.setData({img:res.fileList[0].tempFileURL,
        })
      },
    })
  },
  /**
   * 选择图片
   */
  chooseimgTap: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // console.log('调用图片的成功结果：', res);
        let filePath = res.tempFilePaths[0];
        let cloudPath = 'image/' + Date.now() + filePath.match(/\.[^.]+?$/)[0]
        // console.log('cloudPath is : ',cloudPath)
        wx.cloud.uploadFile({  // 将图片上传至云存储空间
          // 指定上传到云路径
          cloudPath: cloudPath,
          // 指定要上传的文件的小程序临时文件路径
          filePath: filePath,
          // 成功回调
          success: res =>{
            console.log('上传成功：', res);
            //  跳转图片上传成功页面
            wx.navigateTo({
              url: `../sightget/sightget?fileID=${res.fileID}&&pic=${filePath}`,
            })
          },
          fail: err => {
            wx.showLoading({
              title: '图片上传失败！',
            })
          }
        })

      }
    })
  }




 
})