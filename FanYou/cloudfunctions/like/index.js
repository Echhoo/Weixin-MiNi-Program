// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log("Event.ID: ", event.id)
  return await cloud.database().collection("attractions").doc(event.id)
    .update({
      data:{
        like : event.like
      }
    })
    .then(res=>{
      // console.log("改变点赞状态成功", res)
      return res
    })
    .catch(res=>{
      // console.log("改变点赞状态失败", res)
      return res
    })
}