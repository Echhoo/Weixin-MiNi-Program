Page({
  data: {
      file: "",
  },
  onLoad() {
      this.setData({
          selectFile: this.selectFile.bind(this),
          uplaodFile: this.uplaodFile.bind(this)
      })
  },
  chooseImage: function (e) {
      var that = this;
      wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            console.log("RRRRRRR: ",res)
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              that.setData({
                  file: res.tempFilePaths
              });
              console.log("temp filse: ",res.tempFilePaths)
          }
      })
  },
  previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.filse // 需要预览的图片http链接列表
      })
  },
  selectFile(filse) {
      console.log('filse', filse)
      // 返回false可以阻止某次文件上传
  },
  uplaodFile(filse) {
      console.log('upload filse', filse)
      // 文件上传的函数，返回一个promise
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              reject('some error')
          }, 1000)
      })
  },
  uploadError(e) {
      console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
      console.log('upload success', e.detail)
  }
});