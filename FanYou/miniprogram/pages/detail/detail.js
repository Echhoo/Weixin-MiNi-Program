// pages/detail/detail.js
let if_collect= 'false'
let if_like= 'false'
let db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_img_url : "https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/detial/%E4%B8%8D%E6%94%B6%E8%97%8F.png?sign=824802fd21da8befce4473e720f6f094&t=1622028817",
    like_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/detial/不喜欢.png",
    currentView: {},
    //ID是当前景点的ID； OPENID则是当前用户的ID；
    ID: '',
    OPENID: '',
    imgUrls: [
      'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=img&step_word=&hs=0&pn=20&spn=0&di=70290&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2321266479%2C1415249797&os=4137256782%2C448888690&simid=3382893114%2C283668392&adpicid=0&lpn=0&ln=1785&fr=&fmq=1618837020511_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fimg.art138.com%2Fmerchant%2F2019%2F10%2F12%2FeyuEmYtjDKaifxnVEzrxWOth.jpeg%26refer%3Dhttp%3A%2F%2Fimg.art138.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1621429027%26t%3D9369edbe7a52d9eb0c9a58ab0a9e910f&fromurl=ippr_z2C%24qAzdH3FAzdH3Fgjof_z%26e3Bw6px7g_z%26e3Bv54AzdH3F8m88bmc_z%26e3Bfip4s&gsm=14&rpstart=0&rpnum=0&islist=&querylist=&force=undefined',
      'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=img&step_word=&hs=0&pn=25&spn=0&di=21560&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2106082601%2C3840237878&os=4070455972%2C3467574397&simid=3333726078%2C400171719&adpicid=0&lpn=0&ln=1785&fr=&fmq=1618837020511_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fimg.zhux2.com%2Feditor1557385287734903.jpg%26refer%3Dhttp%3A%2F%2Fimg.zhux2.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1621429027%26t%3Dac0381cfe707aa93a7a5279e36c2cc56&fromurl=ippr_z2C%24qAzdH3FAzdH3Fk5k5_z%26e3Bvs7k_z%26e3Bzi7x7gvg_z%26e3Bv54AzdH3Fw6ptvsjfAzdH3F8lacb0cn0_z%26e3Bip4s&gsm=14&rpstart=0&rpnum=0&islist=&querylist=&force=undefined',
      'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=img&step_word=&hs=0&pn=49&spn=0&di=225170&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3741749664%2C2740830265&os=3957064320%2C3367492878&simid=4153804425%2C573518045&adpicid=0&lpn=0&ln=1785&fr=&fmq=1618837020511_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fimg.zhux2.com%2Feditor1555552782133146.jpg%26refer%3Dhttp%3A%2F%2Fimg.zhux2.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1621429027%26t%3D622aa8adf4f8585420018f0b2569d99b&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bzi7x7gvg_z%26e3Bv54AzdH3Fw6ptvsjfAzdH3F8la9b9dam_z%26e3Bip4s&gsm=5a&rpstart=0&rpnum=0&islist=&querylist=&force=undefined'
      ],
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

    var currentViewID = options.currentViewID
    
    //根据city传递的viewID，从数据库查询并设置data中的currentView对象
    wx.cloud.callFunction({
      name: "getViewDataByID",
      data: {
        ID: currentViewID 
      }
    })
    .then(res=>{
      console.log("从城市页面跳转得到的数据 ",res)
      this.setData({
        currentView: res.result.data,
      })
      console.log("CURRENTVIEW: ", this.data.currentView)
      var imgs = [this.data.currentView.img_url]
      var i =0;
      // console.log("current View: ", this.data.currentView)
      for(i; i<9; i++){
        if(this.data.currentView.fes_pic[i].length != 0){
          imgs.push(this.data.currentView.fes_pic[i])
        }
      }
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
          collect_img_url: if_collect== true ? "https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/detial/%E6%94%B6%E8%97%8F.png?sign=051e3aa8a07a1dcdd9e914c6ff2bad0d&t=1622028859": "https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/detial/%E4%B8%8D%E6%94%B6%E8%97%8F.png?sign=824802fd21da8befce4473e720f6f094&t=1622028817",
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
  if(if_collect == true){
    this.setData({
      collect_img_url : "https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/detial/%E4%B8%8D%E6%94%B6%E8%97%8F.png?sign=f245662a9daf0f91b018b5477497aa1c&t=1622028879"
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
      collect_img_url : "https://777a-wzx-cloudbase-1grg51bs80e42788-1305328067.tcb.qcloud.la/picture/detial/%E6%94%B6%E8%97%8F.png?sign=9ffe97b4fa08655b93dbeee8b81d4427&t=1622028900"
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