import Router from "koa-router";
import fs=require('fs');
import path=require('path');
import { getUserInfoByField,userExists, getNowAccount, addUser} from "../../mongoDB/User";
const config=require('../../config.json');

// 注册
async function register(ctx:Router.RouterContext,next:any){
    console.log(ctx.query);
    let {phone,password,userName}=ctx.query;
    await userExists(phone).then(async result=>{
        if(result){
            ctx.body='registered';
        }else{
            let nowAccount=await getNowAccount()+10000;
            addUser({
                "account":nowAccount,
                "phone":phone,
                "userName":userName,
                "password":password,
                "avatarUrl":getRandomAvatar(),
                "sex":"保密",
                "age":18
            })
            ctx.body=nowAccount;
        }
    })
}

// 登录
async function login (ctx:Router.RouterContext,next:any){
        let {account,password}=ctx.query;
        account=parseInt(account)
        if(account){
            await getUserInfoByField("account",account).then(result=>{
                console.log(result)
                if(result.length==0){
                    ctx.body='noAccount';
                }else if(result.password!=password){
                    ctx.body="passwordError";
                }else{
                    ctx.body='validation';
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
async function updateSignature(){

}

// 修改用户信息
async function modifyUserInfo(){

}


export {login,register,getUserInfo}