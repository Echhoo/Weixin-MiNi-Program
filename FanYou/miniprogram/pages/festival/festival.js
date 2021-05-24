// const app = getApp()
// const Url = app.data.URL ?什么后台地址
let if_collect= false
// let if_like= 'false'
let fes_name_list = ["清明" ,"五一", "端午", "儿童节", "中秋", "七夕", "国庆", "春节","元宵"]
let number = 1
let Datalist = []
let navlist = []
let selidx = 0
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
    ID: '',
    OPENID: '',
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
  //设定当前卡片的被收藏的情况
  setCollectIcon: function(){
    db.collection("festival_collections")
        .where({
          ViewID: this.data.ID,
          OpenID: this.data.OPENID,
          Festival: fes_name_list[selidx]
        })
        .get()
        .then(res=>{
        //根据数据库中的情况，来设定收藏情况
          // console.log("收藏：",res)
          var len = res.data.length
          if(len == 0){
            if_collect = false;
          }else{
            if_collect = true;
          }
        })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    selidx = 0;
    //查询指定节日的数据
    db.collection("attractions")
    .where({
      ['festival.'+[selidx]]: true
    }).get()
    .then(res=>{
      this.setData({        
        bannerData: res.data,
      })
    //  console.log("bannerData",this.data.bannerData)
    //改造bannerData数据的fes_pic和fes_intro
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

      //获取当前view的id，和用户的openid
      var currentViewID = this.data.bannerData[this.data.bannerCurrent]._id;
      wx.cloud.callFunction({
        name: "getOPENID"
      })
      .then(res=>{
        this.setData({
          OPENID: res.result.openid,
          ID: currentViewID
        })
        // console.log("ViewID: ",this.data.ID)
        // console.log("OpenID: ", this.data.OPENID)
        //获取ViewID和OpenID后，设定当前view的收藏状态
        this.setCollectIcon()
      }) 
    })
  },
  // bannerSwiper
  bannerSwiper(e) {
    const that = this, bannerCurrent = e.detail.current;
    that.setData({
      bannerCurrent
    })
    this.setData({
      ID: this.data.bannerData[this.data.bannerCurrent]._id,
    })
    // console.log("CurrentView",this.data.bannerData[this.data.bannerCurrent])
    //设定当前view的收藏状态
    this.setCollectIcon()
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

    this.setData({
      ID: this.data.bannerData[this.data.bannerCurrent]._id,
    })
    // console.log("CurrentView",this.data.bannerData[this.data.bannerCurrent])
    //设定当前view的收藏状态
    this.setCollectIcon()
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
    var timeOut=setTimeout(
      function() 
      { filtrate: false }, 2000)
    this.setData({
      fesName: _name,
      timeOut,
      filtrate:false
      
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
      this.setData({
        bannerData: views
      })
    })
  },
  click_collect(){
    if(if_collect == true){
      if_collect = false;
      db.collection("festival_collections").where({
        OpenID: this.data.OPENID,
        ViewID: this.data.ID,
        Festival: fes_name_list[selidx]
      })
      .remove()
      .then(res=>{
        console.log("取消收藏成功", res)
        console.log(if_collect)
      })
      .catch(res=>{
        console.log("取消收藏失败", res)

      })
    }
    else{
      if_collect = true;
      db.collection("festival_collections").add({
        data:{
          ViewID: this.data.ID,
          OpenID: this.data.OPENID,
          Festival: fes_name_list[selidx],
          SiteName: this.data.bannerData[this.data.bannerCurrent].site_name,
          FesPic: this.data.bannerData[this.data.bannerCurrent].fes_pic,
          FesIntro: this.data.bannerData[this.data.bannerCurrent].fes_intro
        }
      })
      .then(res=>{
        console.log("增加收藏成功", res)
        console.log(if_collect)
      })
      .catch(res=>{
        console.log("增加收藏失败", res)
      })
    }
  },

<<<<<<< HEAD
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
  //分享功能
  // onShareAppMessage(res){
  //     let a = getCurrentPages()[getCurrentPages().length - 1]
  //     let path = a.__route__
  //     let shareFrom = this.getShareData()
  //     path += '?productId=' + this.productId
  //     if (path.indexOf('?') > 0) {
  //       path += '&scene=!' + this.gainPValue()
  //     } else {
  //       path += '?scene=!' + this.gainPValue()
  //     }
  //     if (shareFrom) {
  //       if (path.indexOf('?') > 0) {
  //         path += '&shareFrom=' + encodeURIComponent(JSON.stringify(shareFrom))
  //       } else {
  //         path += '?shareFrom=' + encodeURIComponent(JSON.stringify(shareFrom))
  //       }
  //     }
  //     let shareObj = {
  //       title: "转发测试",
  //       path: path
  //     }
  //     return shareObj
  // },
   //分享功能
   onShareAppMessage(res){
    //判断触发的方式是否为按钮
    if(res.from=="button"){
      //参数
      let uid = "111";
      return{
        title:"标题",
        path:"/pages/festival/festival?uid="+uid
      }
    }
  },
=======

>>>>>>> 8cff3bf205c224ea589e760f23b24121f1330479
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