"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
// const MyWebSocket=require('ws');
var wss = new ws_1.default.Server({
    port: 8080
});
wss.on('connection', function (ws, request) {
    ws.on('message', function (message) {
        var info = JSON.parse(message);
        if (info.type === 'login') {
            ws['user'] = info.user;
        }
        else if (info.type === 'addFriend') {
        }
        else if (info.type === 'message') {
            wss.clients.forEach(function (element) {
                //@ts-ignore
                if (element['user'] === info.to) {
                    element.send(info.message);
                }
            });
        }
    });
});
