import WebSocket from "ws";
// const MyWebSocket=require('ws');
var wss=new WebSocket.Server({
    port:8080
})
wss.on('connection',function(ws:any,request){
    ws.on('message',function(message:any){
        let info=JSON.parse(message);
        if(info.type==='login'){
            ws['user']=info.user;
        }else if(info.type==='addFriend'){
            
        }else if(info.type==='message'){
            wss.clients.forEach((element:WebSocket)=> {
                //@ts-ignore
                if(element['user']===info.to){
                    element.send(info.message)
                }
            });
        }
    })
})




