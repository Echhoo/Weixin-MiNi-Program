const innerAudioContext = wx.createInnerAudioContext()
let if_collect = false;
let random=0;
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
    fav_icon: false,
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
    ranData: [],
    // bannerData:[],
    startTime: 0,
    x: 0,
    y: 0,
    isFirstCallBack: true,
    isExecute: false,
    isShow: false,
    list: [],
    shakeTip: ''
  },
  setCollectIcon: function () {
    db.collection("festival_collections")
      .where({
        ViewID: this.data.ID,
        OpenID: this.data.OPENID,
        Festival: fes_name_list[random]
      })
      .get()
      .then(res => {
        //根据数据库中的情况，来设定收藏情况
        // // console.log("收藏：",res)
        var len = res.data.length
        if (len == 0) {
          if_collect = false;
          this.setData({
            fav_icon: false
          })
        } else {
          if_collect = true;
          this.setData({
            fav_icon: true
          })
        }
      })
  },
  onLoad: function (options) {
    // this.setRandow();
  },
  // 摇一摇
  onShow: function () {
    var that = this;
    that.isShow = true;
    wx.onAccelerometerChange(function (e) {
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
        if ((Math.abs(speedX) > 800) || (Math.abs(speedY) > 800)) {
          if (that.data.isExecute) {
            // // console.log("正在执行")
            // setRandow();
            wx.showToast({
              title: "摇一摇\n你的景点来了",
              icon: 'none',
              duration: 2000
            })
            wx.vibrateLong({})
            that.setRandow();
          } else {

            // innerAudioContext.play();
            setTimeout(function () {
              that.setData({
                isExecute: true,
              })

            }, 1000)
            wx.showToast({
              title: "摇一摇\n你的景点来了",
              icon: 'none',
              duration: 2000
            })
            that.setRandow();
            wx.vibrateLong({})
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
    // // console.log("CurrentView",this.data.bannerData[this.data.bannerCurrent])
    //设定当前view的收藏状态
    this.setCollectIcon()
  },
  // 随机筛选数据库
  setRandow: function () {
    var that = this;
    random = Math.floor(Math.random() * 8)
    // // console.log(random)
    db.collection('attractions')
      .where({
        ['festival.' + [random]]: true
      })
      .get()
      .then(res => {
        that.setData({
          ranData: res.data,
        })
        // console.log("ranData", that.data.ranData)
        var i = 0;
        var len = this.data.ranData.length;
        var views = []
        for (i; i < len; i++) {
          var aCurrentFesView = this.data.ranData[i];
          aCurrentFesView.fes_intro = this.data.ranData[i].fes_intro[random]
          aCurrentFesView.fes_pic = this.data.ranData[i].fes_pic[random]
          // aCurrentFesView.img_url = this.data.ranData[i].img_url
          // aCurrentFesView.level = this.data.ranData[i].level
          // aCurrentFesView.score = this.data.ranData[i].score
          views[i] = aCurrentFesView;
        }
        this.setData({
          bannerData: views
        })
        // console.log("bannnerData", this.data.bannerData)
        var random_index = Math.floor(Math.random() * len)
        this.setData({
          bannerCurrent: random_index
        })
        // 注意bannerData必须保持list格式
        var list = [this.data.bannerData[random_index]]
        this.setData({
          bannerData: list
        })
        // console.log("random banncurrent: ", random_index);
        var currentViewID = this.data.bannerData[0]._id;
        wx.cloud.callFunction({
            name: "getOPENID"
          })
          .then(res => {
            this.setData({
              OPENID: res.result.openid,
              ID: currentViewID
            })
            // console.log("ViewID: ",this.data.ID)
            // console.log("OpenID: ", this.data.OPENID)
            // console.log("BannerData: ", this.data.bannerData)
            // 获取ViewID和OpenID后，设定当前view的收藏状态
            this.setCollectIcon()
          })
      })
  },
  click_collect() {
    // // console.log("OpenID: ", this.data.OpenID)
    // // console.log("ViewID: ", this.data.ViewID)
    if (if_collect == true) {
      this.setData({
        fav_icon: false
      })
      if_collect = false;
      db.collection("festival_collections").where({
          OpenID: this.data.OPENID,
          ViewID: this.data.ID,
          Festival: fes_name_list[random]
        })
        .remove()
        .then(res => {
          wx.showToast({
            title: "取消收藏成功",
            icon: 'success',
            duration: 2000
          })
        })
        .catch(res => {
          wx.showToast({
            title: '取消收藏失败',
            icon: 'error',
            duration: 2000
          })

        })
    } else {
      this.setData({
        fav_icon: true
      })
      if_collect = true;
      db.collection("festival_collections").add({
          data: {
            ViewID: this.data.ID,
            OpenID: this.data.OPENID,
            Festival: fes_name_list[random],
            SiteName: this.data.bannerData[0].site_name,
            FesPic: this.data.bannerData[0].fes_pic,
            FesIntro: this.data.bannerData[0].fes_intro,
            Index: this.data.bannerCurrent
          }
        })
        .then(res => {
          // console.log("Res: ", res)
          wx.showToast({
            title: '增加收藏成功',
            icon: 'success',
            duration: 2000
          })
        })
        .catch(res => {
          wx.showToast({
            title: '增加收藏失败',
            icon: 'error',
            duration: 2000
          })
        })
    }
  },
})