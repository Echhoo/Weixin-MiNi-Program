const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // pageIndex: 1,
    // pageSize: 8,
    storyList: [],
    festivalViewList: [],
    loading: true,
    currentView: {},
    viewData: [],
    // viewDataToPass : {},
    currentTab: 0,
    //cityViewIDList: 存放该用户所有收藏的view_id
    cityViewIDList: [],
    festivalViewIDList: [],
    OPENID: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight 
        });
      }
    })
    this.loadMrysData();
  },

  /**
   * 获取列表数据
   */
  loadMrysData: function() {
    if (!this.data.loading) {
      return;
    }
    // let { pageIndex, pageSize } = this.data;
    // 根据openid，获取viewIDList,并查询attractions中的数据
    wx.cloud.callFunction({
      name: "getOPENID"
    })
    .then(res=>{
      //获取city部分的数据
        db.collection("city_collections")
        .where({
          OpenID: res.result.openid
        })
        // .limit(pageSize * pageIndex)
        .get({
          success: res => {
            wx.stopPullDownRefresh();
            this.setData({
              storyList: res.data,
              // loading: res.data.length == (pageSize * pageIndex),
              // currentView: this.data.viewData[0],
            })
          },
        })

      //获取festival的数据
      db.collection("festival_collections").where({
        OpenID: res.result.openid
      })
      // .limit(pageSize * pageIndex)
      // .limit(20)
      .get({
        success: res => {
          wx.stopPullDownRefresh();
          // let list = this.data.storyList.concat(res.data);
          this.setData({
            festivalViewList: res.data,
          })
          console.log('fesivalViewList', res.data)
        }
      })
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 1,
      loading: true
    })
    this.loadMrysData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let pageIndex = this.data.pageIndex + 1;
    this.setData({
      pageIndex: pageIndex
    })
    this.loadMrysData();
  },

  onCityTapNavigateTo(e){
     wx.navigateTo({
       url: '../detail/detail?currentViewID='+e.currentTarget.dataset.id
     })
  },

  onFesTapNavigateTo(e){
    // console.log("EEEE: ", e)
    // console.log("fes",e.currentTarget.dataset.item.Festival)
    // console.log("index",e.currentTarget.dataset.item.Index)
    wx.navigateTo({
      url: '../festival/festival?fes='+e.currentTarget.dataset.item.Festival+
      '&index='+e.currentTarget.dataset.item.Index
    })
  },

  swichNav: function (e) {
    console.log(e);  
    var that = this; 
    if (this.data.currentTab === e.target.dataset.current) {
    return false; 
    } else { 
      that.setData({
        currentTab: e.target.dataset.current,  
    })    
    }
    console.log("currentTab: ", this.data.currentTab)    
    },    
    swiperChange: function (e) {    
    console.log(e);    
    this.setData({  
    currentTab: e.detail.current,  
    })
    },

})

