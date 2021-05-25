// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var ID = event.ID;
  return await db.collection("attractions").doc(ID).get()
}