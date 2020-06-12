"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var app = new koa_1.default();
var assets = require("koa-static");
var bodyParser = require("koa-bodyparser");
var user_js_1 = require("./routers/user/user.js");
var chat_js_1 = require("./routers/chat/chat.js");
var message_js_1 = require("./routers/message/message.js");
var moments_js_1 = require("./routers/moments/moments.js");
var contact_js_1 = require("./routers/contact/contact.js");
app.use(bodyParser()).use(assets(__dirname + "/assets"));
app
    .use(user_js_1.user.routes())
    .use(chat_js_1.chat.routes())
    .use(message_js_1.message.routes())
    .use(contact_js_1.contact.routes())
    .use(moments_js_1.moments.routes());
app.listen(4200);
