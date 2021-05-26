const innerAudioContext = wx.createInnerAudioContext()
let util = require("../../utils/util.js")
util.formatDate(new Date())
let if_collect = false;
let random = Math.floor(Math.random() * 8);
let fes_name_list = ["清明", "五一", "端午", "儿童节", "中秋", "七夕", "国庆", "春节", "元宵"]
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
const db = wx.cloud.database();
Page({

  data: {
    ID: '',
    OPENID: '',
    bannerCurrent: 0, // 当前显示的banner
    bannerData: [{
      'id': 1,
      'fes_pic': 'https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/index/face.png?sign=2b16d42e62f4f0daadddff5a5244fab2&t=1622017917',
      'img': 'https://www.duoguyu.com/dist/flip/flipImg-s1.jpg',
      'site_name': '开始你的旅途',
      'isOpenFilp': false,
      'fes_intro': '“我们应该到那里去，我们属于那里。” \n“不，我们不属于任何地方，除了彼此身边。”',
      'score': '7.6',
      'city': ''
    }],
    startTime: 0,
    x: 0,
    y: 0,
    isFirstCallBack: true,
    isExecute: false,
    isShow: false,
    list: [],
    shakeTip: ''
  },
  onLoad: function (options) {
    // this.setRandow()
  },
  onShow: function () {
    var that = this;
    that.isShow = true;
    wx.onAccelerometerChange(function (e) {
      // console.log("###",e)
      if (!that.isShow) {
        return
      }
      if (that.data.isFirstCallBack) {
        that.setData({
          startTime: (new Date()).getTime(),
          x: e.x,
          y: e.y,
          isFirstCallBack: false
        })
      } else {
        var endTime = (new Date()).getTime()
        var speedX = (e.x - that.data.x) / (endTime - that.data.startTime) * 100000
        var speedY = (e.y - that.data.y) / (endTime - that.data.startTime) * 100000
        that.setData({
          startTime: endTime,
          x: e.x,
          y: e.y
        })
        if ((Math.abs(speedX) > 20000) || (Math.abs(speedY) > 20000)) {
          if (that.data.isExecute) {
            console.log("正在执行")
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            wx.vibrateLong({})
            // this.setRandow()
          } else {

            // innerAudioContext.play();
            setTimeout(function () {
              that.setData({
                isExecute: true,
              })

            }, 1000)
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            wx.vibrateLong({})
            
            setTimeout(function () {
              that.setData({
                isExecute: false,
              })
            }, 1000)
          }
        }
      }
    })
  },
  onUnload: function () {
    this.isShow = false;
    wx.stopAccelerometer({})
    // innerAudioContext.destroy()
  },
  // 卡牌翻转
  switchFlip: function (e) {
    const that = this;
    const index = e.currentTarget.dataset.index;
    const bannerData = that.data.bannerData;
    const isOpenFilp = that.data.bannerData[index].isOpenFilp ? false : true;
    bannerData[index].isOpenFilp = isOpenFilp;
    that.setData({
      bannerData
    });

    this.setData({
      ID: this.data.bannerData[this.data.bannerCurrent]._id,
    })
    // console.log("CurrentView",this.data.bannerData[this.data.bannerCurrent])
    //设定当前view的收藏状态
    // this.setCollectIcon()
  },
  // checkCollect: function (e) {
  //   db.collection("festival_collections")
  //     .where({
  //       ViewID: this.data.ID,
  //       OpenID: this.data.OPENID,
  //       Festival: fes_name_list[random]
  //     })
  //     .get()
  //     .then(res => {
  //       //根据数据库中的情况，来设定收藏情况
  //       // console.log("收藏：",res)
  //       var len = res.data.length
  //       if (len == 0) {
  //         if_collect = false;
  //       } else {
  //         if_collect = true;
  //       }
  //     })
  // },
  // 随机筛选数据库
  // setRandow: function (e) {
  //   //随机数
  //   //
  //   while (!if_collect) {
  //     this.checkCollect();
  //   }
  //   db.collection('attractions')
  //     .aggregate()
  //     .sample({
  //       size: 1
  //     })
  //     .end().then(res => {
  //       console.log(res.list[0].concent);
  //       console.log(res.list);
  //     })

  // }
  //   db.collection("attractions")
  //   .where({
  //     ['festival.'+[selidx]]: true
  //   }).get()
  //   .then(res=>{
  //     this.setData({        
  //       bannerData: res.data,
  //     })
  // })
})