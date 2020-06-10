import Router from "koa-router";

const contact=new Router();

contact.get('/contact',(ctx:Router.RouterContext,next)=>{
    ctx.body="联系人页面";
    next();
})


export {contact}
