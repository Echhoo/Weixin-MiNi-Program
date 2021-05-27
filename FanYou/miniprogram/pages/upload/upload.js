Page({
  data: {
      fileID: "",
  },
  onLoad() {
      
  },
  uploadViewData(res){
    console.log(res.detail.value)
  },
  chooseAndUploadImage: function (e) {
      var that = this;
      wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      })
      .then(res=>{
        console.log("temp file: ",res.tempFilePaths[0])
        const filePath = res.tempFilePaths[0];
        const cloudPath = 'upload/city_img' + filePath.match(/\.[^.]+?$/)[0];
        console.log("cloudPath: ",cloudPath)
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          this.setData({
              fileID: res.fileID
          })
        }).catch(error => {
          // handle error
          console.log("up err", error)
        })
    
      })
  }
});