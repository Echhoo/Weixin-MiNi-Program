let if_collect= 'false'
let if_like= 'false'
let db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collect_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/收藏.png",
    like_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/喜欢.png",
    currentView: {},
    //ID是当前景点的ID； OPENID则是当前用户的ID；
    ID: '',
    OPENID: ''
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
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
      db.collection("collections").where({
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
          collect_img_url: if_collect== true ? "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/收藏_1.png": "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/收藏.png",
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
          like_img_url: if_like== true ? "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/喜欢_1.png": "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/喜欢.png",
        })
      })

    })
  },

//收藏的click方法
click_collect(){
  if(if_collect == true){
    this.setData({
      collect_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/收藏.png"
    })
    if_collect = false
    db.collection("collections").where({
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
      collect_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/收藏_1.png"
    })
    if_collect = true

    db.collection("collections").add({
      data:{
        ViewID: this.data.ID,
        OpenID: this.data.OPENID
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
  if(if_like=='true'){
    this.setData({
      like_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/喜欢.png"
    })
    if_like = 'false'
    wx.cloud.callFunction({
      name:"like",
      data:{
        id:ID,
        like: if_like
      }
    }).then(res=>{
      console.log("改变点赞状态成功", res)
    })
    .catch(res=>{
      console.log("改变点赞状态失败", res)
    })
  }else{
    this.setData({
      like_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/喜欢_1.png"
    })
    if_like = 'true'
    wx.cloud.callFunction({
      name:"like",
      data:{
        id:ID,
        like: if_like
      }
    }).then(res=>{
      console.log("改变点赞状态成功", res)
    })
    .catch(res=>{
      console.log("改变点赞状态失败", res)
    })
  }
  
},
})