Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 8,
    storyList: [],
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    let { pageIndex, pageSize } = this.data;
    db.collection('attractions').where({
      collect : "true"
    }).limit(pageSize * pageIndex).get({
      success: res => {
        wx.stopPullDownRefresh();
        let list = this.data.storyList.concat(res.data);
        this.setData({
          storyList: res.data,
          loading: res.data.length == (pageSize * pageIndex)
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
  }
})