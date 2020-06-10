"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// 提供用户表操作的各种方法
var init_js_1 = require("./init.js");
// 注册用户
function addUser(user) {
    init_js_1.User.insertMany([user]);
}
exports.addUser = addUser;
// 根据字段的值获取用户信息
function getUserInfoByField(field, value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, init_js_1.User.where(field, value).find()];
        });
    });
}
exports.getUserInfoByField = getUserInfoByField;
// 根据条件对象获取用户信息
function getUserInfoByCondition(condition) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, init_js_1.User.find(condition).slice('signature', 1).then(function (result) {
                    console.log(result);
                })];
        });
    });
}
exports.getUserInfoByCondition = getUserInfoByCondition;
// getUserInfo("account",10000)
// getUserInfoByCondition({
//   account:10000,
//   phone:"17606059886"
// })
// 根据账号修改某个字段
function updateField(account, updateContent) {
    init_js_1.User.findOneAndUpdate({ "account": account }, updateContent).then(function () {
    });
}
exports.updateField = updateField;
// 修改个性签名
function updateSignature(account, signature) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            init_js_1.User.update({
                "account": account
            }, {
                $push: {
                    signature: signature
                },
                // $pull:{
                //   signature:signature
                // },
                $set: {
                    age: 88
                }
            }).exec().then(function (err) { console.log(err); });
            return [2 /*return*/];
        });
    });
}
exports.updateSignature = updateSignature;
// 根据_Id删除指定个性签名
function removeSignature(account, signatureId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            init_js_1.User.updateOne({
                account: account
            }, {
                $pull: {
                    signature: {
                        _id: signatureId
                    }
                }
            }).then(function (err) {
                console.log(err);
            });
            return [2 /*return*/];
        });
    });
}
exports.removeSignature = removeSignature;
// 获取所有个性签名
function getSignature(account) {
    return __awaiter(this, void 0, void 0, function () {
        var lastedSignature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, init_js_1.User.find({
                        account: account
                    }).then(function (result) {
                        return result[0].get("signature");
                    })];
                case 1:
                    lastedSignature = _a.sent();
                    return [2 /*return*/, lastedSignature];
            }
        });
    });
}
exports.getSignature = getSignature;
// 添加好友
function addFriend() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.addFriend = addFriend;
// 删除好友
function removeFriend() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.removeFriend = removeFriend;
// getSignature(10000).then(result=>console.log(result))
// updateSignature(10000,{
//   text: "个性签名",
//   date: new Date(),
// })
// removeSignature(10000,"5edb5cd406e6b326281a8e6c")
