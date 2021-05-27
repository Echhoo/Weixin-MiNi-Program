// // 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }
// 云函数入口文件
const cloud = require('wx-server-sdk')
let AirpImageClassifyClient = require('baidu-aip-sdk').imageClassify;

// 设置APPID/AK/SK
let APP_ID = "24250779"
let API_KEY = "F3mih75YnY7TLlvoDWQZlhzG";
let SECRET_KEY = "yUXwVAS27pqWyFZ7t0MYhOTbsQRbAH66";
// 新建一个对象，只保存一个对象调用服务接口
let client = new AirpImageClassifyClient(APP_ID, API_KEY,SECRET_KEY);

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { fileID } = event;   

  let res = await cloud.downloadFile({   // 云服务的下载
    fileID: fileID  
  })
  
  console.log('调用百度ai函数打印1：', res);

  let image = res.fileContent.toString("base64");   // 将图片转成base64格式，因为这里百度ai只接受base64格式

  let val = await client.advancedGeneral(image);  

  return {
    val
  }
}