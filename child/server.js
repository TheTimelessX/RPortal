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
var express = require("express");
var fs = require("fs");
var path = require("path");
var axios = require("axios");
var network_1 = require("./network");
// import { delight, push, read } from "./store";
var app = express();
var connection = new network_1.NetworkConnection();
var files_path = path.join(__dirname, "xfiles");
app.use(express.json());
// if (!fs.existsSync(files_path)){
//     fs.mkdirSync(files_path, { recursive: true });
// }
// app.get("/:port", async (req, res) => {
//   const { port } = req.params;
//   const queryParams = req.query;
//   if (!port) {
//     return res.status(404).send("<h1>404 - Port not found</h1>");
//   }
//   // Simulated connection.getPort function
//   await connection.getPort(port, async (user) => {
//     if (!user || !user.status) {
//     return res.status(404).send("<h1>404 - User not found</h1>");
//   }
//   const type = user.user.port.type;
//   const folderPath = path.join(files_path, port);
//   // Determine which file exists
//   let filePath: string | null = null;
//   if (fs.existsSync(path.join(folderPath, type + ".php"))) {
//     filePath = path.join(folderPath, type + ".php");
//   } else if (fs.existsSync(path.join(folderPath, type + ".html"))) {
//     filePath = path.join(folderPath, type + ".html");
//   } else if (fs.existsSync(path.join(folderPath, type + ".js"))) {
//     filePath = path.join(folderPath, type + ".js");
//   }
//   if (!filePath) {
//     return res.status(404).send("<h1>404 - File not found</h1>");
//   }
//   // Handle HTML or JS files
//   if (!filePath.endsWith(".php")) {
//     let data = fs.readFileSync(filePath, "utf8");
//     // Replace dynamic placeholders
//     data = data.replace(/THE_RPORTAL_PORT/g, port).replace(/THE_RPORTAL_TYPE/g, type);
//     // Replace query parameters if {{key}} syntax exists
//     Object.entries(queryParams).forEach(([key, value]) => {
//       data = data.replaceAll(`{{${key}}}`, value as string);
//     });
//     return res.send(data);
//   }
//   // Handle PHP files by forwarding request to local PHP server
//   try {
//     const queryString = new URLSearchParams(queryParams as any).toString();
//     const phpUrl = `http://127.0.0.1:5000/${port}/${type}.php?${queryString}`;
//     const response = await axios.get(phpUrl, {
//       headers: { "Content-Type": "text/html; charset=utf-8" },
//     });
//     // Replace placeholders in the PHP output
//     let phpData = (response.data as any).replace(/THE_RPORTAL_PORT/g, port).replace(/THE_RPORTAL_TYPE/g, type);
//     res.send(phpData);
//   } catch (err) {
//     console.error("PHP request error:", err);
//     res.status(500).send("<h1>500 - Error fetching PHP file</h1>");
//   }
//   }); // replace with your actual function
// });
app.get("/:port", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var port, query, _data_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                port = req.params.port;
                query = req.query;
                console.log(port);
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                if (port === "x") {
                    _data_1 = fs.readFileSync("D:\\RPortal\\child\\xfiles\\sexy3.html", "utf8");
                    Object.entries(req.query).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        console.log(key, value);
                        _data_1 = _data_1.replaceAll("{{".concat(key, "}}"), value);
                    });
                    return [2 /*return*/, res.send(_data_1)];
                }
                if (!!port) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(404).send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>PKRC Message Card</title>\n  <style>\n    /* ===== Global Styles ===== */\n    body {\n      margin: 0;\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1e1e1e; /* Dark background for contrast */\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */\n    }\n\n    /* ===== Card Styles ===== */\n    .card {\n      width: 400px;\n      padding: 15px;\n      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);\n      border-left: 5px solid red;\n      border-radius: 15px;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0;\n      box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n    }\n\n    .card svg {\n      height: 40px;\n      width: 40px;\n      fill: red;\n      flex-shrink: 0;\n    }\n\n    .card p {\n      color: white;\n      font-size: 15px;\n      line-height: 1.5;\n      margin: 0;\n    }\n\n    /* Optional: responsive on smaller screens */\n    @media (max-width: 450px) {\n      .card {\n        width: 90%;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n      }\n\n      .card svg {\n        margin-bottom: 10px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Message Card -->\n  <div class=\"card\">\n    <svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path>\n    </svg>\n    <p>\n      404 PAGE NOT FOUND\n    </p>\n  </div>\n</body>\n</html>\n")];
            case 1: return [4 /*yield*/, connection.getPort(port, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                    var _path, relative_path_1, q;
                    return __generator(this, function (_a) {
                        if (!user.status || user.status === false || !user) {
                            return [2 /*return*/, res.status(404).send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>PKRC Message Card</title>\n  <style>\n    /* ===== Global Styles ===== */\n    body {\n      margin: 0;\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1e1e1e; /* Dark background for contrast */\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */\n    }\n\n    /* ===== Card Styles ===== */\n    .card {\n      width: 400px;\n      padding: 15px;\n      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);\n      border-left: 5px solid red;\n      border-radius: 15px;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0;\n      box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n    }\n\n    .card svg {\n      height: 40px;\n      width: 40px;\n      fill: red;\n      flex-shrink: 0;\n    }\n\n    .card p {\n      color: white;\n      font-size: 15px;\n      line-height: 1.5;\n      margin: 0;\n    }\n\n    /* Optional: responsive on smaller screens */\n    @media (max-width: 450px) {\n      .card {\n        width: 90%;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n      }\n\n      .card svg {\n        margin-bottom: 10px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Message Card -->\n  <div class=\"card\">\n    <svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path>\n    </svg>\n    <p>\n      404 PAGE NOT FOUND\n    </p>\n  </div>\n</body>\n</html>\n")];
                        }
                        else {
                            console.log(user);
                            _path = path.join(files_path, user.user.port.type);
                            if (!fs.existsSync(_path)) {
                                return [2 /*return*/, res.send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>PKRC Message Card</title>\n  <style>\n    /* ===== Global Styles ===== */\n    body {\n      margin: 0;\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #1e1e1e; /* Dark background for contrast */\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */\n    }\n\n    /* ===== Card Styles ===== */\n    .card {\n      width: 400px;\n      padding: 15px;\n      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);\n      border-left: 5px solid red;\n      border-radius: 15px;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0;\n      box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n      display: flex;\n      align-items: flex-start;\n      gap: 10px;\n    }\n\n    .card svg {\n      height: 40px;\n      width: 40px;\n      fill: red;\n      flex-shrink: 0;\n    }\n\n    .card p {\n      color: white;\n      font-size: 15px;\n      line-height: 1.5;\n      margin: 0;\n    }\n\n    /* Optional: responsive on smaller screens */\n    @media (max-width: 450px) {\n      .card {\n        width: 90%;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n      }\n\n      .card svg {\n        margin-bottom: 10px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Message Card -->\n  <div class=\"card\">\n    <svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path>\n    </svg>\n    <p>\n      404 PAGE NOT FOUND\n    </p>\n  </div>\n</body>\n</html>\n")];
                            }
                            relative_path_1 = path.join(__dirname, port);
                            if (!fs.existsSync(relative_path_1)) {
                                fs.mkdirSync(relative_path_1);
                                //exec(`cp -r ${_path}/* ${relative_path}/`);
                                copyDir(_path, relative_path_1).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var indexFile, dt;
                                    return __generator(this, function (_a) {
                                        indexFile = path.join(relative_path_1, "index.php");
                                        dt = fs.readFileSync(indexFile).toString().replace("THE_RPORTAL_PORT", port).replace("THE_RPORTAL_TYPE", user.user.port.type);
                                        fs.writeFileSync(indexFile, dt);
                                        return [2 /*return*/];
                                    });
                                }); });
                            }
                            q = new URLSearchParams(query).toString();
                            axios.get("http://127.0.0.1:4001/".concat(port, "/index.php").concat(Object.keys(query).length === 0 ? '' : "?".concat(q))).then(function (resp) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, res.send(resp.data)];
                                });
                            }); });
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
app.post("/add-dargah", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, port, skin, domain;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, port = _a.port, skin = _a.skin, domain = _a.domain;
                if (!port || !skin || !domain) {
                    return [2 /*return*/, res.json({ status: false, message: "invalid input" })];
                }
                return [4 /*yield*/, connection.getPort(port, function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log(user);
                            if (!user.status || user.status === false || !user) {
                                return [2 /*return*/, res.json({ status: false, message: "invalid port" })];
                            }
                            return [2 /*return*/, res.json({ status: true, on: "".concat(domain, "/").concat(port) })];
                        });
                    }); })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
app.post("/remove-skin", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var skin, thepath;
    return __generator(this, function (_a) {
        skin = req.body.skin;
        if (!skin) {
            return [2 /*return*/, res.json({ status: false, message: "invalid input" })];
        }
        thepath = path.join(files_path, skin);
        console.log(thepath);
        if (fs.existsSync(thepath)) {
            fs.rmSync(thepath, { recursive: true, force: true });
        }
        return [2 /*return*/, res.json({ status: true })];
    });
}); });
app.listen(3002, "0.0.0.0", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("[+] runned on net-port 3002");
        return [2 /*return*/];
    });
}); });
function copyDir(src, dest) {
    return __awaiter(this, void 0, void 0, function () {
        var entries, _i, entries_1, entry, srcPath, destPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.promises.mkdir(dest, { recursive: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fs.promises.readdir(src, { withFileTypes: true })];
                case 2:
                    entries = _a.sent();
                    _i = 0, entries_1 = entries;
                    _a.label = 3;
                case 3:
                    if (!(_i < entries_1.length)) return [3 /*break*/, 8];
                    entry = entries_1[_i];
                    srcPath = path.join(src, entry.name);
                    destPath = path.join(dest, entry.name);
                    if (!entry.isDirectory()) return [3 /*break*/, 5];
                    return [4 /*yield*/, copyDir(srcPath, destPath)];
                case 4:
                    _a.sent(); // recursive copy
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, fs.promises.copyFile(srcPath, destPath)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8: return [2 /*return*/];
            }
        });
    });
}
