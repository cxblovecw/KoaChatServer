// 提供用户表操作的各种方法
import { User } from './init.js';

// 注册用户
function addUser(user: object) {
  User.insertMany([user])
}

// 根据字段的值获取用户信息
async function getUserInfoByField(field:string,value:any) {
  return User.where(field,value).findOne()
}

// 根据条件对象获取用户信息
async function getUserInfoByCondition(condition:object){
  return User.find(condition)
}

// 判断手机是否注册
async function userExists(phone:any){
  return User.exists({phone:phone})
}



// getUserInfo("account",10000)
// getUserInfoByCondition({
//   account:10000,
//   phone:"17606059886"
// })

// 根据账号修改某个字段
function updateField(account: number, updateContent: object) {
  User.findOneAndUpdate({ "account": account }, updateContent).then(() => {
  })
}

// 修改个性签名
async function updateSignature(account:number, signature:object) {
  User.update({
      "account": account
  }, {
      $push:{
        signature
      },
      // $pull:{
      //   signature:signature
      // },
      $set: {
          age: 88
      }
  }).exec().then(function (err) { console.log(err); });
  // User.findOneAndUpdate({"account":account},{
  //   $push:{
  //     signature:signature
  //   }
  // }).then(err=>console.log(err))
}

// updateSignature(10000,{
//   "date":new Date(),
//   "text":"成年人的世界没有容易二字"
// })

async function getNowAccount(){
  return User.count({})
}

// 根据_Id删除指定个性签名
async function removeSignature(account:Number,signatureId:string){
  User.updateOne({
    account:account
  },{
    $pull:{
      signature:{
        _id:signatureId
      }
    }
  }).then((err)=>{
    console.log(err)
  })
}

// 获取所有个性签名
async function getSignature(account:number){
  let lastedSignature=await User.find({
    account:account
  }).then(function (result) {
    return result[0].get("signature");
  });
  return lastedSignature;
}

// 添加好友
async function addFriend(){

}

// 删除好友
async function removeFriend(){

}

export{
  addUser,
  getUserInfoByField,
  getUserInfoByCondition,
  updateField,
  updateSignature,
  removeSignature,
  getSignature,
  addFriend,
  removeFriend,
  userExists,
  getNowAccount,
}
// getSignature(10000).then(result=>console.log(result))

// updateSignature(10000,{
//   text: "个性签名",
//   date: new Date(),
// })

// removeSignature(10000,"5edb5cd406e6b326281a8e6c")

// async function run(){
//   console.log(await getNowAccount())
// }

// run()