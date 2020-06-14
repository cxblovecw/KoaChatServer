import Router from "koa-router";
import {login,register,getUserInfo,updateUserInfo,updateSignature} from './userController';
const user:Router=new Router();

user.get('/user',async(ctx,next)=>{
    ctx.body="用户界面";
})


user.get("/register",register)

user.get("/login",login)

user.get('/info',getUserInfo)

user.get("/updateUserInfo",updateUserInfo)

user.get("/updateSignature",updateSignature)

export {user}