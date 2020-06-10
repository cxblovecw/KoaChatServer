import koa from 'koa';
const app=new koa();
import bodyParser=require('koa-bodyparser')
import {user} from "./routers/user/user.js";
import {chat} from "./routers/chat/chat.js";
import {message} from "./routers/message/message.js";
import {moments} from "./routers/moments/moments.js";
import {contact} from "./routers/contact/contact.js";


app.use(bodyParser());
app
.use(user.routes())
.use(chat.routes())
.use(message.routes())
.use(contact.routes())
.use(moments.routes())

app.listen(4200);
