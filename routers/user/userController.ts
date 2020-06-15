import Router from "koa-router";
import fs=require('fs');
import path=require('path');
const qrImage=require("qr-image");
import * as User from "../../mongoDB/User";
import { getUserInfoByField,userExists, getNowAccount, addUser} from "../../mongoDB/User";
const config=require('../../config.json');

// 注册
async function register(ctx:Router.RouterContext,next:any){
    console.log(ctx.query);
    let {phone,password,userName}=ctx.query;
    await User.userExists(phone).then(async result=>{
        if(result){
            ctx.body='registered';
        }else{
            let nowAccount=await User.getNowAccount()+10000;
            fs.mkdir("assets/users/"+nowAccount,{recursive:true},function(err,result){
                if(err){}
                else{
                    var qrPng = qrImage.image(JSON.stringify({
                        "account":nowAccount
                    }), { type: 'png' });
                    let qrCodeUrl="users/"+nowAccount+"/qrcode.png";
                    qrPng.pipe(fs.createWriteStream("assets/"+qrCodeUrl))
                    User.addUser({
                        "account":nowAccount,
                        "phone":phone,
                        "userName":userName,
                        "password":password,
                        "avatarUrl":getRandomAvatar(),
                        "sex":"保密",
                        "age":18,
                        "qrCodeUrl":`http://${config.host}:${config.port}/${qrCodeUrl}`
                    })
                }
            })
        
            ctx.body=nowAccount;
        }
    })
}
// 登录
async function login (ctx:Router.RouterContext,next:any){
        let {account,password}=ctx.query;
        let field="account";
        if(account.length>8){
            field="phone";
        }
        else{
            field="account";
            account=parseInt(account)
        }
        if(account){
            await getUserInfoByField(field,account).then(result=>{
                if(result.length==0){
                    ctx.body='noAccount';
                }else if(result.password!=password){
                    ctx.body="passwordError";
                }else{
                    (result.account)
                    ctx.body=result.account;
                }
            }).catch(err=>{
                console.log(err)
                ctx.body='error';
            });
        }else{
            ctx.body='error';
        }
}

// 获取随机头像
function getRandomAvatar(){
   let avatarList=fs.readdirSync(path.resolve("assets/project/images/avatars"))
   return "http://"+config.host+":"+config.port+"/project/images/avatars/"+avatarList[Math.floor(Math.random()*21)];
}

// 获取用户信息
async function getUserInfo(ctx:Router.RouterContext,next:any){
    let {account}=ctx.query;
    console.log(await getUserInfoByField("account",account))
    ctx.body=(await getUserInfoByField("account",account))
}

// 修改头像
async function updateAvatar(){
}


// 修改个性签名
async function updateSignature(ctx:Router.RouterContext,next:any){
    let {account,signature}=ctx.query;
    User.updateSignature(account,{
        date:new Date(),
        text:signature
    }).then(result=>{
        ctx.body="ok"
    }).catch(err=>{
        ctx.body="err"
    })
}

// 修改用户信息
async function updateUserInfo(ctx:Router.RouterContext,next:any){
    let {account,userName,age,sex}=ctx.query;
    User.updateField(account,{
        "userName":userName,
        "age":age,
        "sex":sex
    })
    ctx.body="ok"
}
export {login,register,getUserInfo,updateUserInfo,updateSignature}