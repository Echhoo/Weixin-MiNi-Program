// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=img&step_word=&hs=0&pn=20&spn=0&di=70290&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2321266479%2C1415249797&os=4137256782%2C448888690&simid=3382893114%2C283668392&adpicid=0&lpn=0&ln=1785&fr=&fmq=1618837020511_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fimg.art138.com%2Fmerchant%2F2019%2F10%2F12%2FeyuEmYtjDKaifxnVEzrxWOth.jpeg%26refer%3Dhttp%3A%2F%2Fimg.art138.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1621429027%26t%3D9369edbe7a52d9eb0c9a58ab0a9e910f&fromurl=ippr_z2C%24qAzdH3FAzdH3Fgjof_z%26e3Bw6px7g_z%26e3Bv54AzdH3F8m88bmc_z%26e3Bfip4s&gsm=14&rpstart=0&rpnum=0&islist=&querylist=&force=undefined',
      'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=img&step_word=&hs=0&pn=25&spn=0&di=21560&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2106082601%2C3840237878&os=4070455972%2C3467574397&simid=3333726078%2C400171719&adpicid=0&lpn=0&ln=1785&fr=&fmq=1618837020511_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fimg.zhux2.com%2Feditor1557385287734903.jpg%26refer%3Dhttp%3A%2F%2Fimg.zhux2.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1621429027%26t%3Dac0381cfe707aa93a7a5279e36c2cc56&fromurl=ippr_z2C%24qAzdH3FAzdH3Fk5k5_z%26e3Bvs7k_z%26e3Bzi7x7gvg_z%26e3Bv54AzdH3Fw6ptvsjfAzdH3F8lacb0cn0_z%26e3Bip4s&gsm=14&rpstart=0&rpnum=0&islist=&querylist=&force=undefined',
      'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=img&step_word=&hs=0&pn=49&spn=0&di=225170&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3741749664%2C2740830265&os=3957064320%2C3367492878&simid=4153804425%2C573518045&adpicid=0&lpn=0&ln=1785&fr=&fmq=1618837020511_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fimg.zhux2.com%2Feditor1555552782133146.jpg%26refer%3Dhttp%3A%2F%2Fimg.zhux2.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1621429027%26t%3D622aa8adf4f8585420018f0b2569d99b&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bzi7x7gvg_z%26e3Bv54AzdH3Fw6ptvsjfAzdH3F8la9b9dam_z%26e3Bip4s&gsm=5a&rpstart=0&rpnum=0&islist=&querylist=&force=undefined'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
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