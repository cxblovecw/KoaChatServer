import Router from "koa-router";
import { getUserInfoByField,userExists} from "../../mongoDB/User";

// 注册
async function register(ctx:Router.RouterContext,next:any){
    console.log(ctx.query.phone);
    let {phone}=ctx.query;
    await userExists(phone).then(result=>{
        console.log(result)
        if(result){
            ctx.body='registered';
        }else{
            ctx.body=10009;
        }
    })
}

// 登录
async function login (ctx:Router.RouterContext,next:any){
        let {account,password}=ctx.query;
        if(account){
            await getUserInfoByField("account",account).then(result=>{
                if(result.length==0){
                    ctx.body='noAccount';
                }else if(result[0].password!=password){
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

// 修改头像
async function updateAvatar(){

}


// 修改个性签名
async function updateSignature(){

}

// 修改用户信息
async function modifyUserInfo(){

}


export {login,register}