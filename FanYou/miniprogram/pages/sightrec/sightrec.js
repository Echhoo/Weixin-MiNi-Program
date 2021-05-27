var app = getApp();
var that = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
    imgB64: '',
    content: '',
    ishow: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
  },
  /**
   * 选择图片
   */
  chooseimgTap: function() {
    that.setData({
      ishow: false,
      content: ''
    });
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log('调用图片的成功结果：', res);
        let filePath = res.tempFilePaths[0];
        let cloudPath = 'image/' + Date.now() + filePath.match(/\.[^.]+?$/)[0]
        console.log('cloudPath is : ',cloudPath)
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
        // that.getB64ByUrl(tempFilePaths);
        // that.setData({
        //   img: tempFilePaths
        // });

      }
    })
  },
  /**
   * 转b64
   */
  getB64ByUrl: function(url) {
    const FileSystemManager = wx.getFileSystemManager();
    FileSystemManager.readFile({
      filePath: url,
      encoding: 'base64',
      success(res) {
        // console.log(res.data);
        that.setData({
          imgB64: res.data
        });
      }
    })
  },

  /**
   * 植物识别
   */
  plantTap: function(e) {
    const imgB64 = that.data.imgB64;
    if (!imgB64) {
      that.setData({
        ishow: true
      });
      return;
    };

    that.getToken(function(token) {
      that.getResult(token);
    });
  },
  getToken: function(callback) {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=OyxjHvcGqXlmD3skUUt3GHEl&client_secret=MUMttTySPycE2U9U25MqlCxdoQCpOwfa',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        var token = res.data.access_token;
        console.log(token);

        return callback(token);
      }
    });
  },
  getResult: function(token) {
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=' + token, //仅为示例，并非真实的接口地址
      method: "post",
      data: {
        image: that.data.imgB64
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          content: JSON.stringify(res.data)
        });

      }
    });
  }

})