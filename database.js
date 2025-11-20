"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.DomainDatabase = exports.HashDatabase = exports.UserDatabase = void 0;
var crypto = require("crypto");
var Database = require("better-sqlite3");
var UserDatabase = /** @class */ (function () {
    function UserDatabase() {
        this.db = new Database("users.rdb");
        this.setup();
    }
    UserDatabase.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.db.exec("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, coins INT, ban INT, port TEXT)");
                return [2 /*return*/];
            });
        });
    };
    UserDatabase.prototype.getUsers = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var usrs, _i, _a, user;
            return __generator(this, function (_b) {
                usrs = [];
                for (_i = 0, _a = this.db.prepare("SELECT * FROM users").all(); _i < _a.length; _i++) {
                    user = _a[_i];
                    user.port = JSON.parse(user.port);
                    user.ban = user.ban === 1 ? true : false;
                    usrs.push(user);
                }
                return [2 /*return*/, callback(usrs)];
            });
        });
    };
    UserDatabase.prototype.getUserById = function (id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsers(function (users) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, users_1, user;
                            return __generator(this, function (_a) {
                                for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                                    user = users_1[_i];
                                    if (user.id === id) {
                                        return [2 /*return*/, callback(user)];
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.getUserByPort = function (name, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsers(function (users) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, users_2, user, _a, _b, port;
                            return __generator(this, function (_c) {
                                for (_i = 0, users_2 = users; _i < users_2.length; _i++) {
                                    user = users_2[_i];
                                    for (_a = 0, _b = user.port; _a < _b.length; _a++) {
                                        port = _b[_a];
                                        if (port.name === name) {
                                            return [2 /*return*/, callback(user)];
                                        }
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.add = function (id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserById(id, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (user) {
                                    return [2 /*return*/, callback({ status: false, message: "user exists" })];
                                }
                                stmt = this.db.prepare("INSERT INTO users (id, coins, ban, port) VALUES (@id, @coins, @ban, @port)");
                                stmt.run({ id: id, coins: 0, ban: 0, port: "[]" });
                                return [2 /*return*/, callback({ status: true, user: { id: id, coins: 0, ban: false, port: [] } })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.charge = function (id, amount, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserById(id, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (!user) {
                                    return [2 /*return*/, callback({ status: false, message: "user does not exist" })];
                                }
                                user.coins += amount;
                                stmt = this.db.prepare("UPDATE users SET coins = @coins WHERE id = @id");
                                stmt.run({ id: id, coins: user.coins });
                                return [2 /*return*/, callback({ status: true })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.decharge = function (id, amount, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserById(id, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (!user) {
                                    return [2 /*return*/, callback({ status: false, message: "user does not exist" })];
                                }
                                user.coins -= amount;
                                stmt = this.db.prepare("UPDATE users SET coins = @coins WHERE id = @id");
                                stmt.run({ id: id, coins: user.coins });
                                return [2 /*return*/, callback({ status: true })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // async expirePort(id: number, name: string, callback: (data: any) => void){
    //     await this.getUserById(id, async (user) => {
    //         if (!user){
    //             return callback({ status: false, message: "user does not exist" });
    //         }
    //         for (const port of user.port){
    //             if (port.name === name){
    //                 port.expired = true;
    //                 const stmt = this.db.prepare("UPDATE users SET port = @port WHERE id = @id");
    //                 stmt.run({ port: JSON.stringify(user.port), id });
    //                 return callback({ status: true });
    //             }
    //         }
    //         return callback({ status: false, message: "user does not have this port" });
    //     })
    // }
    // async addExpire(id: number, name: string, ms: number, callback: (data: any) => void){
    //     await this.getUserById(id, async (user) => {
    //         if (!user){
    //             return callback({ status: false, message: "user does not exist" });
    //         }
    //         for (const port of user.port){
    //             if (port.name === name){
    //                 port.expires_at += ms;
    //                 if (port.expires_at > Date.now()){
    //                     port.expired = false;
    //                 } else {
    //                     port.expired = true;
    //                 }
    //                 const stmt = this.db.prepare("UPDATE users SET port = @port WHERE id = @id");
    //                 stmt.run({ port: JSON.stringify(user.port), id });
    //                 return callback({ status: true });
    //             }
    //         }
    //         return callback({ status: false, message: "user does not have this port" });
    //     })
    // }
    UserDatabase.prototype.ban = function (id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserById(id, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (!user) {
                                    return [2 /*return*/, callback({ status: false, message: "user does not exist" })];
                                }
                                stmt = this.db.prepare("UPDATE users SET ban = @ban WHERE id = @id");
                                stmt.run({ id: id, ban: 1 });
                                return [2 /*return*/, callback({ status: true })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDatabase.prototype.unban = function (id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserById(id, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (!user) {
                                    return [2 /*return*/, callback({ status: false, message: "user does not exist" })];
                                }
                                stmt = this.db.prepare("UPDATE users SET ban = @ban WHERE id = @id");
                                stmt.run({ id: id, ban: 0 });
                                return [2 /*return*/, callback({ status: true })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(UserDatabase.prototype, "createstring", {
        get: function () {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+";
            var bytes = crypto.randomBytes(7);
            var result = "";
            for (var i = 0; i < 7; i++) {
                result += chars[bytes[i] % chars.length];
            }
            return result;
        },
        enumerable: false,
        configurable: true
    });
    UserDatabase.prototype.addPort = function (id, port_info, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserById(id, function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var pinfo, stmt;
                            return __generator(this, function (_a) {
                                if (!user) {
                                    return [2 /*return*/, callback({ status: false, message: "user does not exist" })];
                                }
                                pinfo = __assign(__assign({}, port_info), { name: this.createstring });
                                user.port.push(pinfo);
                                stmt = this.db.prepare("UPDATE users SET port = @port WHERE id = @id");
                                stmt.run({ id: id, port: JSON.stringify(pinfo) });
                                return [2 /*return*/, callback({ status: true, port: pinfo })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserDatabase;
}());
exports.UserDatabase = UserDatabase;
var HashDatabase = /** @class */ (function () {
    function HashDatabase() {
        this.db = new Database("hashes.rdb");
        this.setup();
    }
    HashDatabase.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.db.exec("CREATE TABLE IF NOT EXISTS hashes (hash TEXT PRIMARY KEY)");
                return [2 /*return*/];
            });
        });
    };
    HashDatabase.prototype.exists = function (hash, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var stmt, _i, stmt_1, hsh;
            return __generator(this, function (_a) {
                stmt = this.db.prepare("SELECT * FROM hashes").all();
                for (_i = 0, stmt_1 = stmt; _i < stmt_1.length; _i++) {
                    hsh = stmt_1[_i];
                    if (hsh.hash === hash) {
                        return [2 /*return*/, callback(true)];
                    }
                }
                return [2 /*return*/, callback(false)];
            });
        });
    };
    HashDatabase.prototype.add = function (hash, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exists(hash, function (does) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (does) {
                                    return [2 /*return*/, callback({ status: false, message: "hash exists" })];
                                }
                                stmt = this.db.prepare("INSERT INTO hashes (hash) VALUES (@hash)");
                                stmt.run({ hash: hash });
                                return [2 /*return*/, callback({ status: true })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return HashDatabase;
}());
exports.HashDatabase = HashDatabase;
var DomainDatabase = /** @class */ (function () {
    function DomainDatabase() {
        this.db = new Database("domains.rdb");
        this.setup();
    }
    DomainDatabase.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.db.exec("CREATE TABLE IF NOT EXISTS domains (id TEXT PRIMARY KEY, durl TEXT, private_key TEXT, contains TEXT, includes)");
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(DomainDatabase.prototype, "getuuid", {
        get: function () {
            return crypto.randomUUID().split("-")[0];
        },
        enumerable: false,
        configurable: true
    });
    DomainDatabase.prototype.getDomains = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var doms, rows, _i, rows_1, dom;
            return __generator(this, function (_a) {
                try {
                    doms = [];
                    rows = this.db.prepare("SELECT * FROM domains").all();
                    for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                        dom = rows_1[_i];
                        // مطمئن شو contains و includes همیشه آرایه هستند
                        dom.contains = dom.contains ? JSON.parse(dom.contains) : [];
                        dom.includes = dom.includes ? JSON.parse(dom.includes) : [];
                        doms.push(dom);
                    }
                    // ارسال نتیجه به callback
                    callback(doms);
                }
                catch (err) {
                    console.error("Error in getDomains:", err);
                    callback([]); // حتی در صورت خطا، callback با آرایه خالی فراخوانی شود
                }
                return [2 /*return*/];
            });
        });
    };
    DomainDatabase.prototype.getDomainByDURL = function (durl, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomains(function (domains) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, domains_1, dom;
                            return __generator(this, function (_a) {
                                for (_i = 0, domains_1 = domains; _i < domains_1.length; _i++) {
                                    dom = domains_1[_i];
                                    if (dom.durl === durl || dom.durl.startsWith(durl) || durl.startsWith(dom.durl)) {
                                        return [2 /*return*/, callback(dom)];
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DomainDatabase.prototype.getDomainByID = function (id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomains(function (domains) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, domains_2, dom;
                            return __generator(this, function (_a) {
                                for (_i = 0, domains_2 = domains; _i < domains_2.length; _i++) {
                                    dom = domains_2[_i];
                                    if (dom.id === id) {
                                        return [2 /*return*/, callback(dom)];
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DomainDatabase.prototype.getDomainByPrivateKey = function (private_key, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomains(function (domains) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, domains_3, dom;
                            return __generator(this, function (_a) {
                                for (_i = 0, domains_3 = domains; _i < domains_3.length; _i++) {
                                    dom = domains_3[_i];
                                    if (dom.private_key === private_key) {
                                        return [2 /*return*/, callback(dom)];
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DomainDatabase.prototype.getDomainContainersLength = function (id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomains(function (domains) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, domains_4, dom;
                            return __generator(this, function (_a) {
                                for (_i = 0, domains_4 = domains; _i < domains_4.length; _i++) {
                                    dom = domains_4[_i];
                                    if (dom.id === id) {
                                        return [2 /*return*/, callback(dom.contains.length)];
                                    }
                                }
                                return [2 /*return*/, callback(null)];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DomainDatabase.prototype.addContainer = function (container, domain_id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomainByID(domain_id, function (domain) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (!domain) {
                                    return [2 /*return*/, callback({ status: false, message: "domain id does not exist" })];
                                }
                                if (domain.contains.includes(container)) {
                                    return [2 /*return*/, callback({ status: false, message: "container exists" })];
                                }
                                domain.contains.push(container);
                                stmt = this.db.prepare("UPDATE domains SET contains = @contains WHERE id = @id");
                                stmt.run({ contains: JSON.stringify(domain.contains), id: domain_id });
                                return [2 /*return*/, callback({ status: true })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DomainDatabase.prototype.removeContainer = function (container, domain_id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomainByID(domain_id, function (domain) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (!domain) {
                                    return [2 /*return*/, callback({ status: false, message: "domain id does not exist" })];
                                }
                                if (!domain.contains.includes(container)) {
                                    return [2 /*return*/, callback({ status: false, message: "container does not exist" })];
                                }
                                domain.contains.splice(domain.contains.indexOf(container), 1);
                                stmt = this.db.prepare("UPDATE domains SET contains = @contains WHERE id = @id");
                                stmt.run({ contains: JSON.stringify(domain.contains), id: domain_id });
                                return [2 /*return*/, callback({ status: true })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DomainDatabase.prototype.addDomain = function (domain_url, private_key, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomainByDURL(domain_url, function (fdom) { return __awaiter(_this, void 0, void 0, function () {
                            var domain_info, stmt;
                            return __generator(this, function (_a) {
                                if (fdom) {
                                    return [2 /*return*/, callback({ status: false, message: "domain url does exist, please use another one" })];
                                }
                                domain_info = {
                                    id: this.getuuid,
                                    contains: [],
                                    durl: domain_url,
                                    private_key: private_key,
                                    includes: []
                                };
                                stmt = this.db.prepare("INSERT INTO domains (durl, private_key, id, contains, includes) VALUES (@durl, @private_key, @id, @contains, @includes)");
                                stmt.run({ id: domain_info.id, contains: "[]", durl: domain_url, private_key: private_key, includes: "[]" });
                                return [2 /*return*/, callback({ status: true, domain: domain_info })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DomainDatabase.prototype.updateDomainPrivateKey = function (id, new_key, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomainByID(id, function (fdom) { return __awaiter(_this, void 0, void 0, function () {
                            var fromPass, stmt;
                            return __generator(this, function (_a) {
                                if (!fdom) {
                                    return [2 /*return*/, callback({ status: false, message: "domain id does exist" })];
                                }
                                fromPass = fdom.private_key;
                                stmt = this.db.prepare("UPDATE domains SET private_key = @private WHERE id = @id");
                                stmt.run({ private: new_key, id: id });
                                return [2 /*return*/, callback({ status: true, new_key: new_key, old_key: fromPass })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DomainDatabase.prototype.removeDomain = function (id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomainByID(id, function (fdom) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (!fdom) {
                                    return [2 /*return*/, callback({ status: false, message: "domain id does exist" })];
                                }
                                stmt = this.db.prepare("DELETE FROM domains WHERE id = @id");
                                stmt.run({ id: id });
                                return [2 /*return*/, callback({ status: true })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DomainDatabase.prototype.addInclude = function (id, include_name, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomainByID(id, function (fdom) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (!fdom) {
                                    return [2 /*return*/, callback({ status: false, message: "domain id does exist" })];
                                }
                                if (fdom.includes.includes(include_name)) {
                                    return [2 /*return*/, callback({ status: false, message: "include name does exist" })];
                                }
                                fdom.includes.push(include_name);
                                stmt = this.db.prepare("UPDATE domains SET includes = @inc WHERE id = @id");
                                stmt.run({ id: id, includes: JSON.stringify(fdom.includes) });
                                return [2 /*return*/, callback({ status: true })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DomainDatabase.prototype.removeInclude = function (id, include_name, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDomainByID(id, function (fdom) { return __awaiter(_this, void 0, void 0, function () {
                            var stmt;
                            return __generator(this, function (_a) {
                                if (!fdom) {
                                    return [2 /*return*/, callback({ status: false, message: "domain id does exist" })];
                                }
                                if (!fdom.includes.includes(include_name)) {
                                    return [2 /*return*/, callback({ status: false, message: "include name does not exist" })];
                                }
                                fdom.includes.splice(fdom.includes.indexOf(include_name), 1);
                                stmt = this.db.prepare("UPDATE domains SET includes = @inc WHERE id = @id");
                                stmt.run({ id: id, includes: JSON.stringify(fdom.includes) });
                                return [2 /*return*/, callback({ status: true })];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DomainDatabase;
}());
exports.DomainDatabase = DomainDatabase;
