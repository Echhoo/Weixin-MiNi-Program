const db = wx.cloud.database();
const _ = db.command;
let fes_name_list = ["清明", "五一", "端午", "儿童节", "中秋", "七夕", "国庆", "春节", "元宵"]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: ['success','waiting', 'clear'],
    status_icon_type: "",
    festivalViewList: [],
    loading: true,
    currentView: {},
    viewData: [],
    currentTab: 0,
    // cityViewIDList: [],
    festivalViewIDList: [],
    OpenID: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.callFunction({
      name:'getOPENID'
    }).then(res=>{
      this.setData({
        OpenID: res.result.openid
      })
      console.log("opind:", this.data.OpenID)
      this.loadMrysData();
    })
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight 
        });
      }
    })
  },
  onShow: function(){
    // this.loadMrysData();
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
      //获取待审核的数据
      db.collection("pending_attractions")
      .where({
        '_openid': this.data.OpenID
      })
      .get()
      .then(res=>{
        wx.stopPullDownRefresh();
          this.setData({
            festivalViewList: res.data,
          })
          console.log(res.data)
          //改造festivalViewList数据的fes_pic和fes_intro
          var i = 0;
          var len = this.data.festivalViewList.length;
          var views = []
          for (i; i < len; i++) {
            
            var aCurrentFesView = this.data.festivalViewList[i];
            var j = 0
            console.log("a current view; ", aCurrentFesView)
            if(aCurrentFesView.check_status == 'checking'){
              aCurrentFesView['icon_type'] = 'waiting'
            }else if(aCurrentFesView.check_status == 'isAccepted'){
              aCurrentFesView['icon_type'] = 'success'
            }else{
              aCurrentFesView['icon_type'] = 'clear'
            }
            for(j; j<9; j++){
              if(aCurrentFesView.festival[j] == true){
                aCurrentFesView.fes_pic = this.data.festivalViewList[i].fes_pic[j]
                aCurrentFesView.fes_intro = this.data.festivalViewList[i].fes_intro[j]
                aCurrentFesView['Festival'] = fes_name_list[j]
              }
            }
            views[i] = aCurrentFesView;
          }
          this.setData({
            festivalViewList: views
          })
          console.log("changed view: ", this.data.festivalViewList)
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
    // console.log("EEEE: ", e)
    console.log("pending ID",e.currentTarget.dataset.item._id)
    // wx.navigateTo({
    //   url: '../check/check?pendingViewID='+e.currentTarget.dataset.item._id
    // })
  },

  swichNav: function (e) {
    var that = this; 
    if (this.data.currentTab === e.target.dataset.current) {
    return false; 
    } else { 
      that.setData({
        currentTab: e.target.dataset.current,  
    })    
    }
    // console.log("currentTab: ", this.data.currentTab)    
    },    
    swiperChange: function (e) {    
    console.log(e);    
    this.setData({  
    currentTab: e.detail.current,  
    })
    },

})

