import Router=require('koa-router');
const moments=new Router();

moments.get('/moments',(ctx,next)=>{
    ctx.body="动态页面";
})

export {moments}
