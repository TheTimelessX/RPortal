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
var express_1 = require("express");
var fs = require("fs");
var path = require("path");
var network_1 = require("./network");
var app = (0, express_1.default)();
var connection = new network_1.NetworkConnection();
var files_path = path.join(__dirname, "xfiles");
app.use(express_1.default.json());
if (!fs.existsSync(files_path)) {
    fs.mkdirSync(files_path, { recursive: true });
}
app.get("/:port", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var port;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                port = req.params.port;
                if (!!port) return [3 /*break*/, 1];
                return [2 /*return*/, res.send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>PKRC Message Card</title>\n  <style>\n    /* ===== Global Styles ===== */\n    body {\n      margin: 0;\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1e1e1e; /* Dark background for contrast */\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */\n    }\n\n    /* ===== Card Styles ===== */\n    .card {\n      width: 400px;\n      padding: 15px;\n      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);\n      border-left: 5px solid red;\n      border-radius: 15px;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0;\n      box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n    }\n\n    .card svg {\n      height: 40px;\n      width: 40px;\n      fill: red;\n      flex-shrink: 0;\n    }\n\n    .card p {\n      color: white;\n      font-size: 15px;\n      line-height: 1.5;\n      margin: 0;\n    }\n\n    /* Optional: responsive on smaller screens */\n    @media (max-width: 450px) {\n      .card {\n        width: 90%;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n      }\n\n      .card svg {\n        margin-bottom: 10px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Message Card -->\n  <div class=\"card\">\n    <svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path>\n    </svg>\n    <p>\n      404 PAGE NOT FOUND\n    </p>\n  </div>\n</body>\n</html>\n")];
            case 1: return [4 /*yield*/, connection.getPort(port, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                    var _path, _data;
                    return __generator(this, function (_a) {
                        if (!user.status || user.status === false || !user) {
                            return [2 /*return*/, res.send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>PKRC Message Card</title>\n  <style>\n    /* ===== Global Styles ===== */\n    body {\n      margin: 0;\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1e1e1e; /* Dark background for contrast */\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */\n    }\n\n    /* ===== Card Styles ===== */\n    .card {\n      width: 400px;\n      padding: 15px;\n      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);\n      border-left: 5px solid red;\n      border-radius: 15px;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0;\n      box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n    }\n\n    .card svg {\n      height: 40px;\n      width: 40px;\n      fill: red;\n      flex-shrink: 0;\n    }\n\n    .card p {\n      color: white;\n      font-size: 15px;\n      line-height: 1.5;\n      margin: 0;\n    }\n\n    /* Optional: responsive on smaller screens */\n    @media (max-width: 450px) {\n      .card {\n        width: 90%;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n      }\n\n      .card svg {\n        margin-bottom: 10px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Message Card -->\n  <div class=\"card\">\n    <svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path>\n    </svg>\n    <p>\n      404 PAGE NOT FOUND\n    </p>\n  </div>\n</body>\n</html>\n")];
                        }
                        else {
                            _path = void 0;
                            if (!fs.existsSync(path.join(files_path, user.port.type + ".php"))) {
                                if (!fs.existsSync(path.join(files_path, user.port.type + ".js"))) {
                                    return [2 /*return*/, res.send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>PKRC Message Card</title>\n  <style>\n    /* ===== Global Styles ===== */\n    body {\n      margin: 0;\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1e1e1e; /* Dark background for contrast */\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */\n    }\n\n    /* ===== Card Styles ===== */\n    .card {\n      width: 400px;\n      padding: 15px;\n      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);\n      border-left: 5px solid red;\n      border-radius: 15px;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0;\n      box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n    }\n\n    .card svg {\n      height: 40px;\n      width: 40px;\n      fill: red;\n      flex-shrink: 0;\n    }\n\n    .card p {\n      color: white;\n      font-size: 15px;\n      line-height: 1.5;\n      margin: 0;\n    }\n\n    /* Optional: responsive on smaller screens */\n    @media (max-width: 450px) {\n      .card {\n        width: 90%;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n      }\n\n      .card svg {\n        margin-bottom: 10px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Message Card -->\n  <div class=\"card\">\n    <svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path>\n    </svg>\n    <p>\n      404 PAGE NOT FOUND\n    </p>\n  </div>\n</body>\n</html>\n")];
                                }
                                else {
                                    _path = path.join(files_path, user.port.type + ".js");
                                }
                            }
                            else {
                                _path = path.join(files_path, user.port.type + ".php");
                            }
                            _data = fs.readFileSync(_path).toString();
                            return [2 /*return*/, res.send(_data)];
                        }
                        return [2 /*return*/];
                    });
                }); })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, "0.0.0.0", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("[+] runned on net-port 3000");
        return [2 /*return*/];
    });
}); });
