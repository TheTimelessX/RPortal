const main_token: string = "";

import { UserDatabase, HashDatabase, DomainDatabase } from "./database";
import telegram from "node-telegram-bot-api";
const Telegram = require("node-telegram-bot-api");

const bot: telegram = new Telegram(main_token, { polling: true });
const userdb = new UserDatabase();
const hashdb = new HashDatabase();
const domaindb = new DomainDatabase();

