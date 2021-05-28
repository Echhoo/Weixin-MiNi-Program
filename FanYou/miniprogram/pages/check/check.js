// pages/detail/detail.js
let if_collect= 'false'
let if_like= 'false'
let db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_img_url : "https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/icon/20%E7%88%B1%E5%BF%83%20(2).png?sign=f4395722ac7146644fe84919f2f1daab&t=1622111860",
    // like_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/detial/不喜欢.png",
    currentView: {},
    isReady: false,
    //ID是当前景点的ID； OPENID则是当前用户的ID；
    ID: '',
    OPENID: '',
    imgUrls: [],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      swiperIndex: 0,
      },
      
      swiperChange(e) {
      const that = this;
      that.setData({
      swiperIndex: e.detail.current,
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var currentViewID = options.pendingViewID
    
    //根据city传递的viewID，从数据库查询并设置data中的currentView对象
    db.collection("pending_attractions").doc(currentViewID).get()
    .then(res=>{
      console.log("从审核页面跳转得到的数据 ",res)
      this.setData({
        currentView: res.data,
      })
     
      var status = this.data.currentView.check_status;
      if(status == 'checking' || status == 'isRejected'){
        this.setData({
          isReady: false
        })
      }else{
        this.setData({
          isReady: true
        })
      }
      console.log("isReady: ", this.data.isReady)
      var imgs = [this.data.currentView.img_url]
      var i =0;
      // console.log("current View: ", this.data.currentView)
      for(i; i<9; i++){
        if(this.data.currentView.fes_pic[i].length != 0){
          imgs.push(this.data.currentView.fes_pic[i])
          this.setData({
            'currentView.introduction': this.data.currentView.fes_intro[i]
          })
        }
      }
      console.log("CURRENTVIEW: ", this.data.currentView)
      this.setData({
        imgUrls: imgs
      })
    })

    //设定ID 和 OPENID  
    wx.cloud.callFunction({
      name: "getOPENID"
    })
    .then(res=>{
      //设置ID和OPENID的具体句子
      this.setData({
        OPENID: res.result.openid,
        ID: currentViewID
      })
      console.log("ViewID: ",this.data.ID)
      console.log("OpenID: ", this.data.OPENID)
     
      

      //获取ViewID和OpenID后，设定当前view的收藏状态
      db.collection("city_collections").where({
        ViewID: this.data.ID,
        OpenID: this.data.OPENID
      })
      .get()
      .then(res=>{
        //根据数据库中的情况，来设定收藏情况
        console.log("收藏：",res)
        var len = res.data.length
        if(len == 0){
          if_collect = false;
        }else{
          if_collect = true;
        }
        this.setData({
          collect_img_url: len != 0 ?  "https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/icon/20%E7%88%B1%E5%BF%83%20(1).png?sign=9af3fd2dfb226e69a319260cc2a48555&t=1622111802":"https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/icon/20%E7%88%B1%E5%BF%83%20(2).png?sign=f4395722ac7146644fe84919f2f1daab&t=1622111860",
        })
      })
      
      //获取ViewID和OpenID后，设定当前view的喜欢状态
      db.collection("likes").where({
        ViewID: this.data.ID,
        OpenID: this.data.OPENID
      })
      .get()
      .then(res=>{
        //根据数据库中的情况，来设定喜欢情况
        console.log("喜欢：",res)
        var len = res.data.length
        if(len == 0){
          if_like = false;
        }else{
          if_like = true;
        }
        this.setData({
          like_img_url: if_like== true ? "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/detial/喜欢.png": "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/detial/不喜欢.png",
        })
      })
   
    })
  },
  //收藏的click方法
click_collect(){
  var len = 0
  db.collection("city_collections").where({
    ViewID: this.data.ID,
    OpenID: this.data.OPENID
  })
  .get()
  .then(res=>{
     len = res.data.length;
     if(len != 0){
      this.setData({
        collect_img_url :  "https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/icon/20%E7%88%B1%E5%BF%83%20(2).png?sign=f4395722ac7146644fe84919f2f1daab&t=1622111860",
      })
      if_collect = false
      db.collection("city_collections").where({
        OpenID: this.data.OPENID,
        ViewID: this.data.ID
      })
      .remove()
      .then(res=>{
        console.log("取消收藏成功", res)
      })
      .catch(res=>{
        console.log("取消收藏失败", res)
      })
      
  
    }else{
    //如果用户没有收藏该景点且点击了收藏button则:
      //更改图片
      this.setData({
        collect_img_url :"https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/icon/20%E7%88%B1%E5%BF%83%20(1).png?sign=9af3fd2dfb226e69a319260cc2a48555&t=1622111802"
      })
      if_collect = true
  
      db.collection("city_collections").add({
        data:{
          ViewID: this.data.ID,
          OpenID: this.data.OPENID,
          SiteName: this.data.currentView.site_name,
          City: this.data.currentView.city,
          CityImg: this.data.currentView.img_url,
          CityIntro: this.data.currentView.introduction
        }
      })
      .then(res=>{
        console.log("增加收藏成功", res)
      })
      .catch(res=>{
        console.log("增加收藏失败", res)
      })
    }
  })
  
},

click_like(){
  if(if_like==true){
    this.setData({
      like_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/detial/不喜欢.png"
    })
    if_like = false
    db.collection("likes").where({
      ViewID: this.data.ID,
      OpenID: this.data.OPENID
    })
    .remove()
    .then(res=>{
      console.log("取消喜欢成功", res)
    })
    .catch(res=>{
      console.log("取消喜欢失败", res)
    })
  }else{
    this.setData({
      like_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/detial/喜欢.png"
    })
    if_like = true
    db.collection("likes").add({
      data:{
        ViewID: this.data.ID,
        OpenID: this.data.OPENID
      }
    })
    .then(res=>{
      console.log("增加点赞成功", res)
    })
    .catch(res=>{
      console.log("增加点赞失败", res)
    })
  }
  
},
  onShareAppMessage: function(res) {
    let that = this;
    return {
      title: "发送给好友",
      success: function(res) {
        console.log(res, "转发成功")
      },
      fail: function(res) {
        console.log(res, "转发失败")
      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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