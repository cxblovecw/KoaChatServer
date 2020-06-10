"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var message = new Router();
exports.message = message;
message.get('/message', function (ctx, next) {
    ctx.body = "信息页面";
});
