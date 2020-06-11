import Router from "koa-router";
import {login,register} from './userController';
const user:Router=new Router();

user.get('/user',async(ctx,next)=>{
    ctx.body="用户界面";
})


user.get("/register",register)

user.get("/login",login)
export {user}