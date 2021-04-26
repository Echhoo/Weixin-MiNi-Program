// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  var city = event.city;
  console.log("Event: ",event);
  console.log("City", city)
  return await db.collection("city_view")
  
}