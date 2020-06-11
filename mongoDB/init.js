"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chatApp", { useUnifiedTopology: true, useNewUrlParser: true });
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    userName: String,
    password: String,
    phone: String,
    friend: [
        {
            account: Number,
            subGroup: String,
            remark: String,
            records: {
                type: {
                    recordType: String,
                    localUrl: String,
                    remoteUrl: String,
                    time: String,
                    from: Number,
                    to: Number,
                    fileName: String,
                    context: String,
                    callDuration: Number,
                },
                index: true
            }
        },
    ],
    account: Number,
    qcCodeUrl: String,
    avatarUrl: String,
    signature: {
        type: [{
                date: String,
                text: String,
            }],
        index: true,
    },
    group: Array,
    sex: String,
    age: Number,
    birthday: String
});
var User = mongoose.model('user', UserSchema);
exports.User = User;
