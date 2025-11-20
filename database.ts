import _Database from "better-sqlite3";
import * as int from "./interfaces";
import * as crypto from "crypto";
const Database = require("better-sqlite3");

export class UserDatabase {
    private db: InstanceType<typeof _Database>;

    constructor(){
        this.db = new Database("users.rdb");
        this.setup();
    }

    async setup(){
        this.db.exec("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, coins INT, ban INT, port TEXT)");
    }

    async getUsers(callback: (users: int.User[]) => void){
        const usrs: int.User[] = [];

        for (const user of this.db.prepare("SELECT * FROM users").all() as any[]){
            user.port = JSON.parse(user.port);
            user.ban  = user.ban === 1 ? true : false;
            usrs.push(user);
        }

        return callback(usrs);
    }

    async getUserById(id: number, callback: (user: int.User | null) => void){
        await this.getUsers(async (users) => {
            for (const user of users){
                if (user.id === id){
                    return callback(user);
                }
            }

            return callback(null);
        })
    }

    async getUserByPort(name: string, callback: (user: int.User | null) => void){
        await this.getUsers(async (users) => {
            for (const user of users){
                for (const port of user.port){
                    if (port.name === name){
                        return callback(user);
                    }
                }
            }

            return callback(null);
        })
    }

    async add(id: number, callback: (data: any) => void){
        await this.getUserById(id, async (user) => {
            if (user){
                return callback({ status: false, message: "user exists" });
            }

            const stmt = this.db.prepare("INSERT INTO users (id, coins, ban, port) VALUES (@id, @coins, @ban, @port)");
            stmt.run({ id, coins: 0, ban: 0, port: "[]" });

            return callback({ status: true, user: { id, coins: 0, ban: false, port: [] } });
        })
    }

    async charge(id: number, amount: number, callback: (data: any) => void){
        await this.getUserById(id, async (user) => {
            if (!user){
                return callback({ status: false, message: "user does not exist" });
            }

            user.coins += amount;
            const stmt = this.db.prepare("UPDATE users SET coins = @coins WHERE id = @id");
            stmt.run({ id, coins: user.coins });

            return callback({ status: true });
        })
    }

    async decharge(id: number, amount: number, callback: (data: any) => void){
        await this.getUserById(id, async (user) => {
            if (!user){
                return callback({ status: false, message: "user does not exist" });
            }

            user.coins -= amount;
            const stmt = this.db.prepare("UPDATE users SET coins = @coins WHERE id = @id");
            stmt.run({ id, coins: user.coins });

            return callback({ status: true });
        })
    }

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

    async ban(id: number, callback: (data: any) => void){
        await this.getUserById(id, async (user) => {
            if (!user){
                return callback({ status: false, message: "user does not exist" });
            }

            const stmt = this.db.prepare("UPDATE users SET ban = @ban WHERE id = @id");
            stmt.run({ id, ban: 1 });

            return callback({ status: true });
        })
    }

    async unban(id: number, callback: (data: any) => void){
        await this.getUserById(id, async (user) => {
            if (!user){
                return callback({ status: false, message: "user does not exist" });
            }

            const stmt = this.db.prepare("UPDATE users SET ban = @ban WHERE id = @id");
            stmt.run({ id, ban: 0 });

            return callback({ status: true });
        })
    }

    get createstring(): string {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+";
        const bytes = crypto.randomBytes(7);
        let result = "";
        for (let i = 0; i < 7; i++) {
            result += chars[bytes[i] % chars.length];
        }
        return result;
    }

    async addPort(id: number, port_info: { bought_on: number, token: string, chat: number, type: string, domain_type: string }, callback: (data: any) => void){
        await this.getUserById(id, async (user) => {
            if (!user){
                return callback({ status: false, message: "user does not exist" });
            }

            const pinfo = { ...port_info, name: this.createstring };
            user.port.push(pinfo);
            const stmt = this.db.prepare("UPDATE users SET port = @port WHERE id = @id");
            stmt.run({ id, port: JSON.stringify(pinfo) });

            return callback({ status: true, port: pinfo });
        })
    }
}

export class HashDatabase {
    private db: InstanceType<typeof _Database>;

    constructor(){
        this.db = new Database("hashes.rdb");
        this.setup();
    }

    async setup(){
        this.db.exec("CREATE TABLE IF NOT EXISTS hashes (hash TEXT PRIMARY KEY)");
    }

    async exists(hash: string, callback: (status: boolean) => void){
        const stmt = this.db.prepare("SELECT * FROM hashes").all() as any;
        for (const hsh of stmt){
            if (hsh.hash === hash){
                return callback(true);
            }
        }

        return callback(false);
    }

    async add(hash: string, callback: (data: any) => void){
        await this.exists(hash, async (does) => {
            if (does){
                return callback({ status: false, message: "hash exists" });
            }

            const stmt = this.db.prepare("INSERT INTO hashes (hash) VALUES (@hash)");
            stmt.run({ hash });

            return callback({ status: true });
        })
    }
}

export class DomainDatabase {
    private db: InstanceType<typeof _Database>;

    constructor(){
        this.db = new Database("domains.rdb");
        this.setup();
    }

    async setup(){
        this.db.exec("CREATE TABLE IF NOT EXISTS domains (id TEXT PRIMARY KEY, durl TEXT, private_key TEXT, contains TEXT, includes)");
    }

    get getuuid(){
        return crypto.randomUUID().split("-")[0];
    }

    async getDomains(callback: (domains: int.Domain[]) => void){
        const doms: int.Domain[] = [];

        for (const dom of this.db.prepare("SELECT * FROM domains").all() as any[]){
            dom.contains = JSON.parse(dom.contains);
            doms.push(dom);
        }

        return callback(doms);
    }

    async getDomainByDURL(durl: string, callback: (foundDomain: int.Domain | null) => void){
        await this.getDomains(async (domains) => {
            for (const dom of domains){
                if (dom.durl === durl || dom.durl.startsWith(durl) || durl.startsWith(dom.durl)){
                    return callback(dom);
                }
            }

            return callback(null);
        })
    }

    async getDomainByID(id: string, callback: (foundDomain: int.Domain | null) => void){
        await this.getDomains(async (domains) => {
            for (const dom of domains){
                if (dom.id === id){
                    return callback(dom);
                }
            }

            return callback(null);
        })
    }

    async getDomainByPrivateKey(private_key: string, callback: (foundDomain: int.Domain | null) => void){
        await this.getDomains(async (domains) => {
            for (const dom of domains){
                if (dom.private_key === private_key){
                    return callback(dom);
                }
            }

            return callback(null);
        })
    }

    async getDomainContainersLength(id: string, callback: (foundDomain: number | null) => void){
        await this.getDomains(async (domains) => {
            for (const dom of domains){
                if (dom.id === id){
                    return callback(dom.contains.length);
                }
            }

            return callback(null);
        })
    }

    async addContainer(container: string, domain_id: string, callback: (data: any) => void){
        await this.getDomainByID(domain_id, async (domain) => {
            if (!domain){
                return callback({ status: false, message: "domain id does not exist" });
            }

            if (domain.contains.includes(container)){
                return callback({ status: false, message: "container exists" });
            }

            domain.contains.push(container);
            const stmt = this.db.prepare("UPDATE domains SET contains = @contains WHERE id = @id");
            stmt.run({ contains: JSON.stringify(domain.contains), id: domain_id });

            return callback({ status: true });
        })
    }

    async removeContainer(container: string, domain_id: string, callback: (data: any) => void){
        await this.getDomainByID(domain_id, async (domain) => {
            if (!domain){
                return callback({ status: false, message: "domain id does not exist" });
            }

            if (!domain.contains.includes(container)){
                return callback({ status: false, message: "container does not exist" });
            }

            domain.contains.splice(domain.contains.indexOf(container), 1);
            const stmt = this.db.prepare("UPDATE domains SET contains = @contains WHERE id = @id");
            stmt.run({ contains: JSON.stringify(domain.contains), id: domain_id });

            return callback({ status: true });
        })
    }

    async addDomain(domain_url: string, private_key: string, callback: (data: any) => void){
        await this.getDomainByDURL(domain_url, async (fdom) => {
            if (fdom){
                return callback({ status: false, message: "domain url does exist, please use another one" });
            }

            const domain_info: int.Domain = {
                id: this.getuuid,
                contains: [],
                durl: domain_url,
                private_key,
                includes: []
            };

            const stmt = this.db.prepare("INSERT INTO domains (durl, private_key, id, contains, includes) VALUES (@durl, @private_key, @id, @contains, @includes)");
            stmt.run({ id: domain_info.id, contains: "[]", durl: domain_url, private_key, includes:  "[]" });

            return callback({ status: true, domain: domain_info });
        })
    }

    async updateDomainPrivateKey(id: string, new_key: string, callback: (data: any) => void){
        await this.getDomainByID(id, async (fdom) => {
            if (!fdom){
                return callback({ status: false, message: "domain id does exist" });
            }

            const fromPass = fdom.private_key;
            const stmt = this.db.prepare("UPDATE domains SET private_key = @private WHERE id = @id");
            stmt.run({ private: new_key, id });

            return callback({ status: true, new_key, old_key: fromPass });
        })
    }

    async removeDomain(id: string, callback: (data: any) => void){
        await this.getDomainByID(id, async (fdom) => {
            if (!fdom){
                return callback({ status: false, message: "domain id does exist" });
            }

            const stmt = this.db.prepare("DELETE FROM domains WHERE id = @id");
            stmt.run({ id });

            return callback({ status: true });
        })
    }

    async addInclude(id: string, include_name: string, callback: (data: any) => void){
        await this.getDomainByID(id, async (fdom) => {
            if (!fdom){
                return callback({ status: false, message: "domain id does exist" });
            }

            if (fdom.includes.includes(include_name)){
                return callback({ status: false, message: "include name does exist" });
            }

            fdom.includes.push(include_name);
            const stmt = this.db.prepare("UPDATE domains SET includes = @inc WHERE id = @id");
            stmt.run({ id, includes: JSON.stringify(fdom.includes) });

            return callback({ status: true });
        })
    }
    
    async removeInclude(id: string, include_name: string, callback: (data: any) => void){
        await this.getDomainByID(id, async (fdom) => {
            if (!fdom){
                return callback({ status: false, message: "domain id does exist" });
            }

            if (!fdom.includes.includes(include_name)){
                return callback({ status: false, message: "include name does not exist" });
            }

            fdom.includes.splice(fdom.includes.indexOf(include_name), 1);
            const stmt = this.db.prepare("UPDATE domains SET includes = @inc WHERE id = @id");
            stmt.run({ id, includes: JSON.stringify(fdom.includes) });

            return callback({ status: true });
        })
    }
}
