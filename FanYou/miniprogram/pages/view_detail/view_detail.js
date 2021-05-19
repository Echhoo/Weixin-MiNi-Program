let if_collect= 'false'
let if_like= 'false'
let ID = ''
let U_ID = ''
// pages/view_detail/view_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/收藏.png",
    like_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/喜欢.png",
    currentView: {},
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    console.log(options)
    var currentView = JSON.parse(options.currentView)
    var img_url = options.img;
    var introduction = options.introduction;
    console.log("Intro: ", introduction)
    currentView["img_url"] = img_url;
    currentView["introduction"] = introduction;
    if_collect = currentView.collect
    if_like = currentView.like  
    ID = currentView._id

    this.setData({
      currentView: currentView,
      collect_img_url : if_collect=='true' ? "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/收藏_1.png" : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/收藏.png",
      like_img_url : if_like=='true' ? "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/喜欢_1.png" : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/喜欢.png",
    })
    console.log("Pass from City: ", this.data.currentView) 
    
    
  },



//收藏的click方法
click_collect(){
  if(if_collect == 'true'){
    this.setData({
      collect_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/收藏.png"
    })
    if_collect = 'false'
    wx.cloud.callFunction({
      name:"collect",
      data:{
        id:ID,
        collect: if_collect
      }
    }).then(res=>{
      console.log("改变收藏状态成功", res)
    })
    .catch(res=>{
      console.log("改变收藏状态失败", res)
    })
    

  }else{
    this.setData({
      collect_img_url : "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/view_detail/收藏_1.png"
    })
    if_collect = 'true'
    wx.cloud.callFunction({
      name:"collect",
      data:{
        id:ID,
        collect: if_collect
      }
    }).then(res=>{
      console.log("改变收藏状态成功", res)
    })
    .catch(res=>{
      console.log("改变收藏状态失败", res)
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