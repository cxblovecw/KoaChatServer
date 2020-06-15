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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var qrImage = require("qr-image");
var User = __importStar(require("../../mongoDB/User"));
var User_1 = require("../../mongoDB/User");
var config = require('../../config.json');
// 注册
function register(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, phone, password, userName;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(ctx.query);
                    _a = ctx.query, phone = _a.phone, password = _a.password, userName = _a.userName;
                    return [4 /*yield*/, User.userExists(phone).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var nowAccount_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!result) return [3 /*break*/, 1];
                                        ctx.body = 'registered';
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, User.getNowAccount()];
                                    case 2:
                                        nowAccount_1 = (_a.sent()) + 10000;
                                        fs.mkdir("assets/users/" + nowAccount_1, { recursive: true }, function (err, result) {
                                            if (err) { }
                                            else {
                                                var qrPng = qrImage.image(JSON.stringify({
                                                    "account": nowAccount_1
                                                }), { type: 'png' });
                                                var qrCodeUrl = "users/" + nowAccount_1 + "/qrcode.png";
                                                qrPng.pipe(fs.createWriteStream("assets/" + qrCodeUrl));
                                                User.addUser({
                                                    "account": nowAccount_1,
                                                    "phone": phone,
                                                    "userName": userName,
                                                    "password": password,
                                                    "avatarUrl": getRandomAvatar(),
                                                    "sex": "保密",
                                                    "age": 18,
                                                    "qrCodeUrl": "http://" + config.host + ":" + config.port + "/" + qrCodeUrl
                                                });
                                            }
                                        });
                                        ctx.body = nowAccount_1;
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
// 登录
function login(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, account, password, field;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = ctx.query, account = _a.account, password = _a.password;
                    field = "account";
                    if (account.length > 8) {
                        field = "phone";
                    }
                    else {
                        field = "account";
                        account = parseInt(account);
                    }
                    if (!account) return [3 /*break*/, 2];
                    return [4 /*yield*/, User_1.getUserInfoByField(field, account).then(function (result) {
                            if (result.length == 0) {
                                ctx.body = 'noAccount';
                            }
                            else if (result.password != password) {
                                ctx.body = "passwordError";
                            }
                            else {
                                (result.account);
                                ctx.body = result.account;
                            }
                        }).catch(function (err) {
                            console.log(err);
                            ctx.body = 'error';
                        })];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    ctx.body = 'error';
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
// 获取随机头像
function getRandomAvatar() {
    var avatarList = fs.readdirSync(path.resolve("assets/project/images/avatars"));
    return "http://" + config.host + ":" + config.port + "/project/images/avatars/" + avatarList[Math.floor(Math.random() * 21)];
}
// 获取用户信息
function getUserInfo(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        var account, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    account = ctx.query.account;
                    _b = (_a = console).log;
                    return [4 /*yield*/, User_1.getUserInfoByField("account", account)];
                case 1:
                    _b.apply(_a, [_d.sent()]);
                    _c = ctx;
                    return [4 /*yield*/, User_1.getUserInfoByField("account", account)];
                case 2:
                    _c.body = (_d.sent());
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUserInfo = getUserInfo;
// 修改头像
function updateAvatar() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
// 修改个性签名
function updateSignature(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, account, signature;
        return __generator(this, function (_b) {
            _a = ctx.query, account = _a.account, signature = _a.signature;
            User.updateSignature(account, {
                date: new Date(),
                text: signature
            }).then(function (result) {
                ctx.body = "ok";
            }).catch(function (err) {
                ctx.body = "err";
            });
            return [2 /*return*/];
        });
    });
}
exports.updateSignature = updateSignature;
// 修改用户信息
function updateUserInfo(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, account, userName, age, sex;
        return __generator(this, function (_b) {
            _a = ctx.query, account = _a.account, userName = _a.userName, age = _a.age, sex = _a.sex;
            User.updateField(account, {
                "userName": userName,
                "age": age,
                "sex": sex
            });
            ctx.body = "ok";
            return [2 /*return*/];
        });
    });
}
exports.updateUserInfo = updateUserInfo;
