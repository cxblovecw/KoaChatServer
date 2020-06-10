
import Router=require('koa-router');
const message=new Router();

message.get('/message',(ctx:Router.RouterContext,next)=>{
    ctx.body="信息页面";
})



export {message}
