// const app = getApp()
// const Url = app.data.URL ?什么后台地址
let number = 1
let Datalist = []
let navlist = []
let selidx = 0
let seldata = ""
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
const db = wx.cloud.database();
// pages/festival/festival.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerCurrent: 0, // 当前显示的banner
    bannerData2: [
      {
        'id': 1, 'focus': 'https://www.duoguyu.com/dist/flip/flipImg-1.jpg', 'img': 'https://www.duoguyu.com/dist/flip/flipImg-s1.jpg', 'title': '阿丽塔：战斗天使', 'isOpenFilp': false, 'lines': '“我们应该到那里去，我们属于那里。” \n“不，我们不属于任何地方，除了彼此身边。”', 'score': '7.6', 'releaseDate': '2019/02/22', 'otherInfo':'Alita: Battle Angel' },
      {
        'id': 2, 'focus': 'https://www.duoguyu.com/dist/flip/flipImg-2.jpg', 'img': 'https://www.duoguyu.com/dist/flip/flipImg-s2.jpg', 'title': '我不是药神', 'isOpenFilp': false, 'lines': '你是不是看不起我？ \n\n是…以前是…', 'score': '9.0', 'releaseDate': '2018/07/05', 'otherInfo': 'Dying to Survive'  },
      { 'id': 3, 'focus': 'https://www.duoguyu.com/dist/flip/flipImg-3.jpg', 'img': 'https://www.duoguyu.com/dist/flip/flipImg-s3.jpg', 'title': '风语咒', 'isOpenFilp': false, 'lines': '人法地法天法道法自然，传说中的神功根本就不是练出来的，人与自然本就是一体的。\n\n我即是自然，自然即是我。\n我在驭风，风在驭我。', 'score': '6.9', 'releaseDate': '2018/08/03', 'otherInfo': 'The Wind Guardians' },
      { 'id': 4, 'focus': 'https://www.duoguyu.com/dist/flip/flipImg-4.jpg', 'img': 'https://www.duoguyu.com/dist/flip/flipImg-s4.jpg', 'title': '飞驰人生', 'isOpenFilp': false, 'lines': '巴音布鲁克，1462道弯，109公里。耍小聪明，赢得了一百米，赢不了一百公里。\n\n你问我绝招？\n绝招只有两个字：奉献。\n就是把你的全部奉献给你所热爱的一切。\n你并不是征服了这片土地，你只是战胜了你的对手。', 'score': '7.2', 'releaseDate': '2019/02/05', 'otherInfo': 'Pegasus'  },
      {
        'id': 5, 'focus': 'https://www.duoguyu.com/dist/flip/flipImg-5.jpg', 'img': 'https://www.duoguyu.com/dist/flip/flipImg-s5.jpg', 'title': '大黄蜂', 'isOpenFilp': false, 'lines': '"You kissed me!" \n"On the cheek."\n"Still counts, still counts."', 'score': '7.0', 'releaseDate': '2019/01/04', 'otherInfo': 'Bumblebee'  },
    ],
    bannerData:[],
    bannerFrontPage:'',
    bannerIntro:'',
    // imgUrls: [
    //   'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=img&step_word=&hs=0&pn=20&spn=0&di=70290&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2321266479%2C1415249797&os=4137256782%2C448888690&simid=3382893114%2C283668392&adpicid=0&lpn=0&ln=1785&fr=&fmq=1618837020511_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fimg.art138.com%2Fmerchant%2F2019%2F10%2F12%2FeyuEmYtjDKaifxnVEzrxWOth.jpeg%26refer%3Dhttp%3A%2F%2Fimg.art138.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1621429027%26t%3D9369edbe7a52d9eb0c9a58ab0a9e910f&fromurl=ippr_z2C%24qAzdH3FAzdH3Fgjof_z%26e3Bw6px7g_z%26e3Bv54AzdH3F8m88bmc_z%26e3Bfip4s&gsm=14&rpstart=0&rpnum=0&islist=&querylist=&force=undefined',
    //   'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=img&step_word=&hs=0&pn=25&spn=0&di=21560&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2106082601%2C3840237878&os=4070455972%2C3467574397&simid=3333726078%2C400171719&adpicid=0&lpn=0&ln=1785&fr=&fmq=1618837020511_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fimg.zhux2.com%2Feditor1557385287734903.jpg%26refer%3Dhttp%3A%2F%2Fimg.zhux2.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1621429027%26t%3Dac0381cfe707aa93a7a5279e36c2cc56&fromurl=ippr_z2C%24qAzdH3FAzdH3Fk5k5_z%26e3Bvs7k_z%26e3Bzi7x7gvg_z%26e3Bv54AzdH3Fw6ptvsjfAzdH3F8lacb0cn0_z%26e3Bip4s&gsm=14&rpstart=0&rpnum=0&islist=&querylist=&force=undefined',
    //   'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=img&step_word=&hs=0&pn=49&spn=0&di=225170&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3741749664%2C2740830265&os=3957064320%2C3367492878&simid=4153804425%2C573518045&adpicid=0&lpn=0&ln=1785&fr=&fmq=1618837020511_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fimg.zhux2.com%2Feditor1555552782133146.jpg%26refer%3Dhttp%3A%2F%2Fimg.zhux2.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1621429027%26t%3D622aa8adf4f8585420018f0b2569d99b&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bzi7x7gvg_z%26e3Bv54AzdH3Fw6ptvsjfAzdH3F8la9b9dam_z%26e3Bip4s&gsm=5a&rpstart=0&rpnum=0&islist=&querylist=&force=undefined'
    // ],
    // indicatorDots: false,
    // autoplay: false,
    // interval: 5000,
    // duration: 1000,
    goodsList: '',
    // bgUrl:"",
    searchStatus: false,
    user_id: '',
    filtrate: false,
    background: '#eee',
    color: '#333',
    select: '',
    priceMin: '',
    priceMax: '',
    fesName: "清明",
    nav1: [{
        name: "清明"
      }, {
        name: "五一"
      },
      {
        name: "端午"
      }, {
        name: "儿童节"
      },
      {
        name: "中秋"
      }, {
        name: "七夕"
      }, {
        name: "国庆"
      },
      {
        name: "春节"
      }, {
        name: "元宵"
      },
    ],
    // 当前节日的对象列表
    currentFestivalViews: []

  },

  // swiperChange(e) {
  //   const that = this;
  //   that.setData({
  //     swiperIndex: e.detail.current,
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     db.collection("new_attractions").where({
      ['festival.'+[selidx]]: true
    }).get()
    .then(res=>{
      this.setData({        
        bannerData: res.data,
      })
     console.log("bannerData",this.data.bannerData)
     var i = 0;
     var len = this.data.bannerData.length;
     var views = []
     for(i; i<len; i++){
      var aCurrentFesView = this.data.bannerData[i];
      aCurrentFesView.fes_intro = this.data.bannerData[i].fes_intro[selidx]
      aCurrentFesView.fes_pic = this.data.bannerData[i].fes_pic[selidx]
      views[i] = aCurrentFesView;
     }
     
      // this.setData({
      //   bannerFrontPage: this.data.bannerData[0].fes_pic[selidx],
      //   bannerIntro: this.data.bannerData[0].fes_intro[selidx]
      // })
      this.setData({
        bannerData: views
      })
      console.log("Views: ",this.data.bannerData)
    })
  },
  // bannerSwiper
  bannerSwiper(e) {
    const that = this, bannerCurrent = e.detail.current;
    that.setData({
      bannerCurrent
    })
  },

  // 卡牌切换
  switchFlip: function (e) {
    console.log(e);
    const that = this;
    const index = e.currentTarget.dataset.index;
    const bannerData = that.data.bannerData;
    const isOpenFilp = that.data.bannerData[index].isOpenFilp ? false : true;
    bannerData[index].isOpenFilp = isOpenFilp;
    that.setData({
      bannerData
    });
  },
  show: function () {
    this.setData({
      filtrate: true
    })
  },
  none: function () {
    this.setData({
      filtrate: false
    })
  },
  choose: function (e) {
    let index = e.currentTarget.dataset.index
    let name = e.currentTarget.dataset.name
    console.log(name)
    this.setData({
      selidx: index,
      fesName: name,
      filtrate: false,
    })
  },

  queren: function (e) {
    let that = this
    let name = e.seldata
    console.log(name)
    that.setData({
      fesName:seldata,
      filtrate: false,
    });
    //传数据
    // wx.request({
    //   // url: Url + 'product/pagelist?keywords=' + that.data.keyword + '&material[]=' + data1 + '&technology[]=' + data2 + '&SurfaceEffect[]=' + data3 + '&design[]=' + data4 + '&style[]=' + data5 + '&priceMin=' + priceMin + '&priceMax=' + priceMax + '&priceFlag=' + datas + "&userid=" + that.data.user_id,
    //   method: 'post',
    //   success(res){

    //     that.setData({
    //       fesName:seldata,
    //       filtrate: false,
    //     });
    //     if (res.hasNext == false) {
    //       that.data.setData({
    //         moretxt2: "已加载全部"
    //       })
    //     }
    //   }
    // })
  },
  // onLoad: function (options) {
  //   let that = this
  //   wx.getStorage({
  //     key: 'info',
  //     success: function (res) {
  //       that.setData({
  //         user_id: res.data.user_id
  //       })
  //     },
  //   })

  // },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    Datalist = []
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