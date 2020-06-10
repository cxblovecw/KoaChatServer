import Router from "koa-router";
import { getUserInfoByField } from "../../mongoDB/User";
const user:Router=new Router();

user.get('/user',async(ctx,next)=>{
    ctx.body="用户界面";
})


user.get("/register",async(ctx,next)=>{
    ctx.body="注册";
    
})

user.get("/login",async(ctx,next)=>{
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
            ctx.body='error';
        });
    }else{
        ctx.body='error';
    }
})

export {user}