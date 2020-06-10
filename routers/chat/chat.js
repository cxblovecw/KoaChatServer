"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var chat = new Router();
exports.chat = chat;
chat.get('/chat', function (ctx, next) {
    ctx.body = "聊天页面";
});
