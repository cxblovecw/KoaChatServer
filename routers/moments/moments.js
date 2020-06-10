"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var moments = new Router();
exports.moments = moments;
moments.get('/moments', function (ctx, next) {
    ctx.body = "动态页面";
});
