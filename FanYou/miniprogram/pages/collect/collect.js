Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 8,
    storyList: [],
    festivalViewList: [],
    loading: true,
    currentView: {},
    viewData: [],
    viewDataToPass : {},
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
    const db = wx.cloud.database();
    const _ = db.command;
    let { pageIndex, pageSize } = this.data;
    // 根据openid，获取viewIDList,并查询attractions中的数据
    wx.cloud.callFunction({
      name: "getOPENID"
    })
    .then(res=>{
      //获取city部分的数据
      db.collection("collections").where({
        OpenID: res.result.openid
      })
      .get()
      .then(res=>{
        console.log("根据OpenID获取的数据：",res)
        let data_list = res.data
        this.setData({
          cityViewIDList: data_list.map(obj=>{return obj.ViewID})
        })
        //在完成设置viewIDList才能继续进行
        db.collection("attractions").where({
          _id: _.in(this.data.cityViewIDList)
        })
        .limit(pageSize * pageIndex)
        .get({
          success: res => {
            wx.stopPullDownRefresh();
            // let list = this.data.storyList.concat(res.data);
            this.setData({
              storyList: res.data,
              loading: res.data.length == (pageSize * pageIndex),
              // currentView: this.data.viewData[0],
            })
            console.log('[数据库] [查询记录] 成功: ', res)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })
      })
      //获取festival的数据
      db.collection("festival_collections").where({
        OpenID: res.result.openid
      })
      .get()
      .then(res=>{
        console.log("根据OpenID获取的数据：",res)
        let data_list = res.data
        this.setData({
          festivalViewIDList: data_list.map(obj=>{return obj.ViewID})
        })
        //在完成设置viewIDList才能继续进行
        db.collection("attractions").where({
          _id: _.in(this.data.festivalViewIDList)
        })
        .limit(pageSize * pageIndex)
        .get({
          success: res => {
            wx.stopPullDownRefresh();
            // let list = this.data.storyList.concat(res.data);
            this.setData({
              festivalViewList: res.data,
              loading: res.data.length == (pageSize * pageIndex),
              // currentView: this.data.viewData[0],
            })
            console.log('fesivalViewList', res.data)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })
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

  onTapNavigateTo(e){
    var id = e.currentTarget.dataset.id
   wx.cloud.database().collection('attractions').where({
    _id : id
  }).get({
    success: res => {
      this.setData({
        viewData: res.data,
      })
      console.log('[数据库] [查询记录] 成功: ', res)
      var viewDataToPass = {}
      viewDataToPass["_id"] = this.data.viewData[0]._id;
      viewDataToPass["site_name"] = this.data.viewData[0].site_name;
      viewDataToPass["city"] = this.data.viewData[0].city;
      viewDataToPass["collect"] = this.data.viewData[0].collect;
      viewDataToPass["like"] = this.data.viewData[0].like;
     var str_currentView = JSON.stringify(viewDataToPass);
     var str_img_url = this.data.viewData[0].img_url;
     var str_introduction = this.data.viewData[0].introduction;
     wx.navigateTo({
       url: '../view_detail/view_detail?currentView='+str_currentView 
       +'&img='+str_img_url
       +'&introduction='+str_introduction
     })
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err)
    }
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

