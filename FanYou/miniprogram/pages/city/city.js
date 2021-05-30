
var that
const db = wx.cloud.database();
var touch = [0,0];
var openid = ''
Page({
  data: {
    empty_city: false,
    //new-picker-data
    city: " ",
    is_show_picker: false,
    picker_data: [{name: "北京"},{name: "北京"}],
    picker_index: [0,0],
    province_city_list:[
        {'name': '北京', 'children': [{'name': '北京'}]}, {'name': '安徽', 'children': [{'name': '安庆'}, {'name': '蚌埠'}, {'name': '巢湖'}, {'name': '池州'}, {'name': '滁州'}, {'name': '阜阳'}, {'name': '淮北'}, {'name': '淮南'}, {'name': '黄山'}, {'name': '六安'}, {'name': '马鞍山'}, {'name': '宿州'}, {'name': '铜陵'}, {'name': '芜湖'}, {'name': '宣城'}, {'name': '亳州'}]}, {'name': '福建', 'children': [{'name': '福州'}, {'name': '龙岩'}, {'name': '南平'}, {'name': '宁德'}, {'name': '莆田'}, {'name': '泉州'}, {'name': '三明'}, {'name': '厦门'}, {'name': '漳州'}]}, {'name': '甘肃', 'children': [{'name': '兰州'}, {'name': '白银'}, {'name': '定西'}, {'name': '甘南'}, {'name': '嘉峪关'}, {'name': '金昌'}, {'name': '酒泉'}, {'name': '临夏'}, {'name': '陇南'}, {'name': '平凉'}, {'name': '庆阳'}, {'name': '天水'}, {'name': '武威'}, {'name': '张掖'}]}, {'name': '广东', 'children': [{'name': '广州'}, {'name': '深圳'}, {'name': '潮州'}, {'name': '东莞'}, {'name': '佛山'}, {'name': '河源'}, {'name': '惠州'}, {'name': '江门'}, {'name': '揭阳'}, {'name': '茂名'}, {'name': '梅州'}, {'name': '清远'}, {'name': '汕头'}, {'name': '汕尾'}, {'name': '韶关'}, {'name': '阳江'}, {'name': '云浮'}, {'name': '湛江'}, {'name': '肇庆'}, {'name': '中山'}, {'name': '珠海'}]}, {'name': '广西', 'children': [{'name': '南宁'}, {'name': '桂林'}, {'name': '百色'}, {'name': '北海'}, {'name': '崇左'}, {'name': '防城港'}, {'name': '贵港'}, {'name': '河池'}, {'name': '贺州'}, {'name': '来宾'}, {'name': '柳州'}, {'name': '钦州'}, {'name': '梧州'}, {'name': '玉林'}]}, {'name': '贵州', 'children': [{'name': '贵阳'}, {'name': '安顺'}, {'name': '毕节'}, {'name': '六盘水'}, {'name': '黔东南'}, {'name': '黔南'}, {'name': '黔西南'}, {'name': '铜仁'}, {'name': '遵义'}]}, {'name': '海南', 'children': [{'name': '海口'}, {'name': '三亚'}, {'name': '白沙'}, {'name': '保亭'}, {'name': '昌江'}, {'name': '澄迈县'}, {'name': '定安县'}, {'name': '东方'}, {'name': '乐东'}, {'name': '临高县'}, {'name': '陵水'}, {'name': '琼海'}, {'name': '琼中'}, {'name': '屯昌县'}, {'name': '万宁'}, {'name': '文昌'}, {'name': '五指山'}, {'name': '儋州'}]}, {'name': '河北', 'children': [{'name': '石家庄'}, {'name': '保定'}, {'name': '沧州'}, {'name': '承德'}, {'name': '邯郸'}, {'name': '衡水'}, {'name': '廊坊'}, {'name': '秦皇岛'}, {'name': '唐山'}, {'name': '邢台'}, {'name': '张家口'}]}, {'name': '河南', 'children': [{'name': '郑州'}, {'name': '洛阳'}, {'name': '开封'}, {'name': '安阳'}, {'name': '鹤壁'}, {'name': '济源'}, {'name': '焦作'}, {'name': '南阳'}, {'name': '平顶山'}, {'name': '三门峡'}, {'name': '商丘'}, {'name': '新乡'}, {'name': '信阳'}, {'name': '许昌'}, {'name': '周口'}, {'name': '驻马店'}, {'name': '漯河'}, {'name': '濮阳'}]}, {'name': '黑龙江', 'children': [{'name': '哈尔滨'}, {'name': '大庆'}, {'name': '大兴安岭'}, {'name': '鹤岗'}, {'name': '黑河'}, {'name': '鸡西'}, {'name': '佳木斯'}, {'name': '牡丹江'}, {'name': '七台河'}, {'name': '齐齐哈尔'}, {'name': '双鸭山'}, {'name': '绥化'}, {'name': '伊春'}]}, {'name': '湖北', 'children': [{'name': '武汉'}, {'name': '仙桃'}, {'name': '鄂州'}, {'name': '黄冈'}, {'name': '黄石'}, {'name': '荆门'}, {'name': '荆州'}, {'name': '潜江'}, {'name': '神农架林区'}, {'name': '十堰'}, {'name': '随州'}, {'name': '天门'}, {'name': '咸宁'}, {'name': '襄阳(襄樊市)'}, {'name': '孝感'}, {'name': '宜昌'}, {'name': '恩施'}]}, {'name': '湖南', 'children': [{'name': '长沙'}, {'name': '张家界'}, {'name': '常德'}, {'name': '郴州'}, {'name': '衡阳'}, {'name': '怀化'}, {'name': '娄底'}, {'name': '邵阳'}, {'name': '湘潭'}, {'name': '湘西'}, {'name': '益阳'}, {'name': '永州'}, {'name': '岳阳'}, {'name': '株洲'}]}, {'name': '吉林', 'children': [{'name': '长春'}, {'name': '吉林'}, {'name': '白城'}, {'name': '白山'}, {'name': '辽源'}, {'name': '四平'}, {'name': '松原'}, {'name': '通化'}, {'name': '延边'}]}, {'name': '江苏', 'children': [{'name': '南京'}, {'name': '苏州'}, {'name': '无锡'}, {'name': '常州'}, {'name': '淮安'}, {'name': '连云港'}, {'name': '南通'}, {'name': '宿迁'}, {'name': '泰州'}, {'name': '徐州'}, {'name': '盐城'}, {'name': '扬州'}, {'name': '镇江'}]}, {'name': '江西', 'children': [{'name': '南昌'}, {'name': '抚州'}, {'name': '赣州'}, {'name': '吉安'}, {'name': '景德镇'}, {'name': '九江'}, {'name': '萍乡'}, {'name': '上饶'}, {'name': '新余'}, {'name': '宜春'}, {'name': '鹰潭'}]}, {'name': '辽宁', 'children': [{'name': '沈阳'}, {'name': '大连'}, {'name': '鞍山'}, {'name': '本溪'}, {'name': '朝阳'}, {'name': '丹东'}, {'name': '抚顺'}, {'name': '阜新'}, {'name': '葫芦岛'}, {'name': '锦州'}, {'name': '辽阳'}, {'name': '盘锦'}, {'name': '铁岭'}, {'name': '营口'}]}, {'name': '内蒙古', 'children': [{'name': '呼和浩特'}, {'name': '阿拉善盟'}, {'name': '巴彦淖尔盟'}, {'name': '包头'}, {'name': '赤峰'}, {'name': '鄂尔多斯'}, {'name': '呼伦贝尔'}, {'name': '通辽'}, {'name': '乌海'}, {'name': '乌兰察布市'}, {'name': '锡林郭勒盟'}, {'name': '兴安盟'}]}, {'name': '宁夏', 'children': [{'name': '银川'}, {'name': '固原'}, {'name': '石嘴山'}, {'name': '吴忠'}, {'name': '中卫'}]}, {'name': '青海', 'children': [{'name': '西宁'}, {'name': '果洛'}, {'name': '海北'}, {'name': '海东'}, {'name': '海南'}, {'name': '海西'}, {'name': '黄南'}, {'name': '玉树'}]}, {'name': '山东', 'children': [{'name': '济南'}, {'name': '青岛'}, {'name': '滨州'}, {'name': '德州'}, {'name': '东营'}, {'name': '菏泽'}, {'name': '济宁'}, {'name': '莱芜'}, {'name': '聊城'}, {'name': '临沂'}, {'name': '日照'}, {'name': '泰安'}, {'name': '威海'}, {'name': '潍坊'}, {'name': '烟台'}, {'name': '枣庄'}, {'name': '淄博'}]}, {'name': '山西', 'children': [{'name': '太原'}, {'name': '长治'}, {'name': '大同'}, {'name': '晋城'}, {'name': '晋中'}, {'name': '临汾'}, {'name': '吕梁'}, {'name': '朔州'}, {'name': '忻州'}, {'name': '阳泉'}, {'name': '运城'}]}, {'name': '陕西', 'children': [{'name': '西安'}, {'name': '安康'}, {'name': '宝鸡'}, {'name': '汉中'}, {'name': '商洛'}, {'name': '铜川'}, {'name': '渭南'}, {'name': '咸阳'}, {'name': '延安'}, {'name': '榆林'}]}, {'name': '上海', 'children': [{'name': '上海'}]}, {'name': '四川', 'children': [{'name': '成都'}, {'name': '绵阳'}, {'name': '阿坝'}, {'name': '巴中'}, {'name': '达州'}, {'name': '德阳'}, {'name': '甘孜'}, {'name': '广安'}, {'name': '广元'}, {'name': '乐山'}, {'name': '凉山'}, {'name': '眉山'}, {'name': '南充'}, {'name': '内江'}, {'name': '攀枝花'}, {'name': '遂宁'}, {'name': '雅安'}, {'name': '宜宾'}, {'name': '资阳'}, {'name': '自贡'}, {'name': '泸州'}]}, {'name': '天津', 'children': [{'name': '天津'}]}, {'name': '西藏', 'children': [{'name': '拉萨'}, {'name': '阿里'}, {'name': '昌都'}, {'name': '林芝'}, {'name': '那曲'}, {'name': '日喀则'}, {'name': '山南'}]}, {'name': '新疆', 'children': [{'name': '乌鲁木齐'}, {'name': '阿克苏'}, {'name': '阿拉尔'}, {'name': '巴音郭楞'}, {'name': '博尔塔拉'}, {'name': '昌吉'}, {'name': '哈密'}, {'name': '和田'}, {'name': '喀什'}, {'name': '克拉玛依'}, {'name': '克孜勒苏'}, {'name': '石河子'}, {'name': '图木舒克'}, {'name': '吐鲁番'}, {'name': '五家渠'}, {'name': '伊犁'}]}, {'name': '云南', 'children': [{'name': '昆明'}, {'name': '怒江'}, {'name': '普洱'}, {'name': '丽江'}, {'name': '保山'}, {'name': '楚雄'}, {'name': '大理'}, {'name': '德宏'}, {'name': '迪庆'}, {'name': '红河'}, {'name': '临沧'}, {'name': '曲靖'}, {'name': '文山'}, {'name': '西双版纳'}, {'name': '玉溪'}, {'name': '昭通'}]}, {'name': '浙江', 'children': [{'name': '杭州'}, {'name': '湖州'}, {'name': '嘉兴'}, {'name': '金华'}, {'name': '丽水'}, {'name': '宁波'}, {'name': '绍兴'}, {'name': '台州'}, {'name': '温州'}, {'name': '舟山'}, {'name': '衢州'}]}, {'name': '重庆', 'children': [{'name': '重庆'}]}, {'name': '香港', 'children': [{'name': '香港'}]}, {'name': '澳门', 'children': [{'name': '澳门'}]}, {'name': '台湾', 'children': [{'name': '台湾'}]}
      ],
    //view-card-list:
    swiperIndex: "0",
    currentView: {},
    viewData: [],
  },
  onLoad(options){
    
    that = this;
    var _city = this.data.picker_data[1]["name"]
    this.setData({
      city: _city
    })
    wx.cloud.callFunction({
      name: "getViewData",
      data: {
        city: _city
      }
    })
    .then(res => {
      // console.log("该城市的数据", res.result.data);
      var _data = res.result.data;
      that.setData({
        viewData: _data
      })
      //必须在加载完 viewData 后设置
      this.setData({
        currentView: this.data.viewData[0],
        swiperIndex: "0"
      })
    }) 
  },
  //新省市选择器相关函数
  showPicker: function () {
    this.setData({
      is_show_picker: true
    })
  },
  sureCallBack (e) {
    // let data = e.detail
    this.setData({
      is_show_picker: false,
      picker_data: e.detail.choosedData,
      picker_index:e.detail.choosedIndexArr
    })
    // console.log("picker_index: ",this.data.picker_index);
    // console.log("picker_data: ", this.data.picker_data)
    this.setData({
      city: this.data.picker_data[1]["name"]
    });
    // console.log("city: ", this.data.city);
    wx.cloud.callFunction({
      name: "getViewData",
      data: {
        city: this.data.city
      }
    })
    .then(res => {
      // console.log(res.result)
      var _data = res.result.data;
      if(_data.length == 0){
        this.setData({
          viewData: [
            {img_url: "cloud://wzx-cloudbase-1grg51bs80e42788.777a-wzx-cloudbase-1grg51bs80e42788-1305328067/picture/city/no_city.png",
            introduction: "尚无信息",
          }
          ],
          empty_city: true
        })
        this.setData({
          currentView: this.data.viewData[0],
          swiperIndex: "0",
        })
      }else{
        //先加载新的数据
        this.setData({
          viewData: res.result.data,
          empty_city: false
        })
        //后初始化wxml显示第一张卡片
        this.setData({
          currentView: this.data.viewData[this.data.swiperIndex],
        })
      }
    })
    .catch(err => {
      //处理错误情况，展示空页面
      //注意，后面要对错误显示进行特殊处理
      // console.log("ERROR! ",err)
    })
  },
  cancleCallBack () {
    this.setData({
      is_show_picker: false,
    })
  },
  swiperChange(e) {
    that = this;
    const swiperIndex = e.detail.current;
    that.setData({
      swiperIndex: swiperIndex,
      currentView: that.data.viewData[swiperIndex]
    })
  },
  //跳转到详情介绍页
 onTapNavigateTo(e){
  // wx.navigateTo({
  //   url: '../view_detail/view_detail?currentViewID='+this.data.currentView._id
  // })
  wx.navigateTo({
    url: '../detail/detail?currentViewID='+this.data.currentView._id
  })
 },
 // 图片单击放大预览
  scaleImg: function(){
    var imgUrl = this.data.currentView.img_url;
    wx.previewImage({
      urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
//长按保存图片(两个函数)
saveImg(){
  var url = this.data.currentView.img_url;
  //用户需要授权
  wx.getSetting({
    success: (res) => {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success:()=> {
            // 同意授权
            this.saveImg1(url);
          },
          fail: (res) =>{
            // console.log(res);
          }
        })
      }else{
        // 已经授权了
        this.saveImg1(url);
      }
    },
    fail: (res) =>{
      // console.log(res);
    }
  })   
},
saveImg1(url){
  wx.getImageInfo({
    src: url,
    success:(res)=> {
      var path = res.path;
      wx.saveImageToPhotosAlbum({
        filePath:path,
        success:(res)=> { 
          // console.log(res);
        },
        fail:(res)=>{
          // console.log(res);
        }
      })
    },
    fail:(res)=> {
      // console.log(res);
    }
  })
},
onShareAppMessage: function(){
  // return{
  //   title: "泛游邀请你一起看",
  //   desc: this.data.currentView.city+"的"+this.data.currentView.site_name,
  //   path: "/pages/city/city?"
  // }
}
})


