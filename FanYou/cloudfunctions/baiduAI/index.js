// 云函数入口文件
const cloud = require('wx-server-sdk')
let AirpImageClassifyClient = require('baidu-aip-sdk').imageClassify;

// 设置APPID/AK/SK
let APP_ID = "24250779"
let API_KEY = "F3mih75YnY7TLlvoDWQZlhzG";
let SECRET_KEY = "yUXwVAS27pqWyFZ7t0MYhOTbsQRbAH66";
// 新建一个对象，建议只保存一个对象调用服务接口
let client = new AirpImageClassifyClient(APP_ID, API_KEY,SECRET_KEY);

cloud.init({
  env: 'wzx-cloudbase-1grg51bs80e42788'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let img = event.fileID  
  let { fileID } = event;   // 这里是因为我们这个函数只需要一个fileID的参数

  let res = await cloud.downloadFile({   // 云服务的下载
    fileID: fileID  
  })
  // console.log('调用百度ai函数打印1：', res);

  let image = res.fileContent.toString("base64");   // 将图片转成base64格式，因为这里百度ai只接受base64格式
  var options = {};
  options["baike_num"] = "5";
  let val = await client.plantDetect(image,options);  

  return {
    val,img
  }
}