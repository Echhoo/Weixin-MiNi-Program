// const app = getApp()
// const Url = app.data.URL ?什么后台地址
let if_collect= 'false'
let if_like= 'false'
let ID = ''
let number = 1
let Datalist = []
let navlist = []
let selidx = 0
let indexx=0
let seldata = ""
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
const db = wx.cloud.database();
// pages/festival/festival.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerCurrent: 0, // 当前显示的banner
    bannerData:[],
    goodsList: '',
    searchStatus: false,
    user_id: '',
    filtrate: false,
    background: '#eee',
    color: '#333',
    select: '',
    priceMin: '',
    priceMax: '',
    fesName: "清明",
    nav1: [{
        name: "清明"
      }, {
        name: "五一"
      },
      {
        name: "端午"
      }, {
        name: "儿童节"
      },
      {
        name: "中秋"
      }, {
        name: "七夕"
      }, {
        name: "国庆"
      },
      {
        name: "春节"
      }, {
        name: "元宵"
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    selidx = 0;
     db.collection("attractions").where({
      ['festival.'+[selidx]]: true
    }).get()
    .then(res=>{
      this.setData({        
        bannerData: res.data,
      })
    //  console.log("bannerData",this.data.bannerData)
     var i = 0;
     var len = this.data.bannerData.length;
     var views = []
     for(i; i<len; i++){
      var aCurrentFesView = this.data.bannerData[i];
      aCurrentFesView.fes_intro = this.data.bannerData[i].fes_intro[selidx]
      aCurrentFesView.fes_pic = this.data.bannerData[i].fes_pic[selidx]
      views[i] = aCurrentFesView;
     }
      this.setData({
        bannerData: views
      })
      // console.log("Views: ",this.data.bannerData)
    })
  },
  // bannerSwiper
  bannerSwiper(e) {
    const that = this, bannerCurrent = e.detail.current;
    that.setData({
      bannerCurrent
    })
  },

  // 卡牌切换
  switchFlip: function (e) {
    // console.log(e);
    const that = this;
    const index = e.currentTarget.dataset.index;
    const bannerData = that.data.bannerData;
    const isOpenFilp = that.data.bannerData[index].isOpenFilp ? false : true;
    bannerData[index].isOpenFilp = isOpenFilp;
    that.setData({
      bannerData
    });
  },
  show: function () {
    this.setData({
      filtrate: true
    })
  },
  none: function () {
    this.setData({
      filtrate: false
    })
  },
  choose: function (e) {      
    let _index = e.currentTarget.dataset.index
    let _name = e.currentTarget.dataset.name
    selidx = _index
    // indexx=_index
    this.setData({
      fesName: _name,
      // filtrate: false,
    })
    db.collection("attractions").where({
      ['festival.'+[selidx]]: true
    }).get()
    .then(res=>{
      // console.log("RES 51", res)
      this.setData({        
        bannerData: res.data,
      })
    //  console.log("bannerData",this.data.bannerData)
     var i = 0;
     var len = this.data.bannerData.length;
     var views = []
     for(i; i<len; i++){
      var aCurrentFesView = this.data.bannerData[i];
      aCurrentFesView.fes_intro = this.data.bannerData[i].fes_intro[selidx]
      aCurrentFesView.fes_pic = this.data.bannerData[i].fes_pic[selidx]
      views[i] = aCurrentFesView;
     }
     
      // this.setData({
      //   bannerFrontPage: this.data.bannerData[0].fes_pic[selidx],
      //   bannerIntro: this.data.bannerData[0].fes_intro[selidx]
      // })
      this.setData({
        bannerData: views
      })
    })
  },
  click_collect(){
    console.log("here!!!",bannerData)
  },

  queren: function (e) {
    let that = this
    let name = e.seldata
    // console.log(name)
    that.setData({
      fesName:seldata,
      filtrate: false,
    });
    //传数据
    // wx.request({
    //   // url: Url + 'product/pagelist?keywords=' + that.data.keyword + '&material[]=' + data1 + '&technology[]=' + data2 + '&SurfaceEffect[]=' + data3 + '&design[]=' + data4 + '&style[]=' + data5 + '&priceMin=' + priceMin + '&priceMax=' + priceMax + '&priceFlag=' + datas + "&userid=" + that.data.user_id,
    //   method: 'post',
    //   success(res){

    //     that.setData({
    //       fesName:seldata,
    //       filtrate: false,
    //     });
    //     if (res.hasNext == false) {
    //       that.data.setData({
    //         moretxt2: "已加载全部"
    //       })
    //     }
    //   }
    // })
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    Datalist = []
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})