import Router = require("koa-router");
const chat:Router=new Router();

chat.get('/chat',(ctx:Router.RouterContext,next:() => Promise<any>)=>{
    ctx.body="聊天页面";
})

export {chat};