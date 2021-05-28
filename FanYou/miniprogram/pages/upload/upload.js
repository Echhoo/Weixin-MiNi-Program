var db = wx.cloud.database();
Page({
  data: {
     submited: false,
      files: [],
      img_urls: [],
      OpenID: '',
      fes_array: ['清明', '五一', '端午', '儿童节', '中秋', '七夕', '国庆', '春节', '元宵'],
      fes_index: 0,
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      fes_index: e.detail.value
    })
  },
  onLoad() {
      wx.cloud.callFunction({
        name: "getOPENID"
      }).then(res=>{
        this.setData({
          OpenID: res.result.event.openid
        })
      })
      this.setData({
        selectFile: this.selectFile.bind(this),
        uplaodFile: this.uplaodFile.bind(this)
    })
  },
  reset(){
    this.setData({
      submited: false
    })
  },
  submitViewData(res){
    var data = res.detail.value;
    console.log(res.detail.value)
    var view = {}
    view['site_name'] = data.site_name;
    view['city'] = data.city;
    view['fes_intro'] = ["","","","","","","","",""];
    view['fes_intro'][this.data.fes_index] = data.intro
    // view['introduction'] = data.intro;
    view['festival'] = [false,false,false,false,false,false,false,false,false];
    view['festival'][this.data.fes_index] = true;
    view['img_url'] = this.data.img_urls[0];
    view['fes_pic'] = ["","","","","","","","",""]
    view['fes_pic'][this.data.fes_index] = this.data.img_urls[1];
    // check_status 有checking，accepted 和 rejected
    view['check_status'] =  {"checking": true, "accepted":false, "rejected":false};
    console.log("new View: ",view)
    db.collection("pending_attractions").add({
      data: view
    })
    .then(res=>{
      console.log("add res: ", res)
    })
    this.setData({
      submited: true
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log("res", res)
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
                files: that.data.files.concat(res.tempFilePaths)
            });
        }
    })
},
previewImage: function(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
},
selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
},
uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database()
      // console.log('upload files', files);
      let filesData = files.tempFilePaths;
      this.setData({
          arrurls:[]
      })
      var object = {};
      const that = this;
      for (let i = 0; i < filesData.length; i++) {
      const filePath = filesData[i];
      const name = 'upload/'+'upload_img-'+parseInt(Math.random() * 100000000);
      const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          // console.log('[上传文件] 成功：', res);
          that.setData({
            arrurls: that.data.arrurls.concat(res.fileID)
          });
          object['urls'] = that.data.arrurls;
        
          if(that.data.arrurls.length == filesData.length){
            console.log(object);
            resolve(object)
          }
        //   _this.setData({
        //     upimgData: _this.data.upimgData.concat(res.fileID)
        //   })
        },
        fail: res => {
          console.error('[上传文件] 失败：', res)
        //   wx.showToast({
        //     icon: 'none',
        //     title: '上传失败',
        //   })
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    }
    })
},
uploadError(e) {
    console.log('upload error', e.detail)
},
uploadSuccess(e) {
  console.log('upload success', e.detail.urls)
  this.setData({
    img_urls: e.detail.urls
  })
  console.log("img urls: ", this.data.img_urls)
}
});