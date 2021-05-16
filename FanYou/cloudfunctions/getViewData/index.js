// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  var _city = event.city;
  return await db.collection("new_attractions").where({
    city: _city
  }).get()
}