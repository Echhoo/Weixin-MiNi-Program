let if_collect= 'false'
let if_like= 'false'
let ID = ''
// pages/view_detail/view_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_img_url : "cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/collect/collect_not.png",
    like_img_url : "cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/collect/like_gray.png",
    currentView: {},
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    var currentView = JSON.parse(options.currentView)
    if_collect = currentView.collect
    if_like = currentView.like  
    ID = currentView._id

    this.setData({
      currentView: currentView,
      collect_img_url : if_collect=='true' ? "cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/collect/collect_yes.png" : "cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/collect/collect_not.png",
      like_img_url : if_like=='true' ? "cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/collect/like_yellow.png" : "cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/collect/like_gray.png",

    })
    console.log("Pass from City: ", this.data.currentView) 
    
    
  },



//收藏的click方法
click_collect(){
  if(if_collect == 'true'){
    this.setData({
      collect_img_url : "cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/collect/collect_not.png"
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
      collect_img_url : "cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/collect/collect_yes.png"
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
      like_img_url : "cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/collect/like_gray.png"
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
      like_img_url : "cloud://cloud1-4gt82x70cccbf17e.636c-cloud1-4gt82x70cccbf17e-1305568781/picture/collect/like_yellow.png"
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