import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

const store = join(__dirname, "pids.json");

if (!existsSync(store)){
    writeFile(store, "{}");
}

interface Content {
    pids: string[];
}

export const read = async (callback: (data: { status: boolean, message?: string, content?: Content }) => void) => {
    try {
        const content = await readFile(store, { encoding: "utf8" });
        return callback({ status: true, content: JSON.parse(content.toString()) });
    } catch (e) {
        return callback({ status: false, message: e });
    }
}

export const push = async (pid: string, callback: (data: { status: boolean, message?: string }) => void) => {
    await read(async (stat) => {
        if (stat.status === true){
            (!stat.content!.pids.includes(pid)) ? stat.content!.pids.push(pid) : null;
            await writeFile(store, JSON.stringify(stat.content!, null, 2)).then(async () => {
                return callback({ status: true });
            }).catch(async (e) => {
                return callback({ status: false, message: e });
            })
        } else {
            return callback({ status: false, message: stat.message });
        }
    })
}


export const delight = async (pid: string, callback: (data: { status: boolean, message?: string }) => void) => {
    await read(async (stat) => {
        if (stat.status === true){
            if (stat.content!.pids.includes(pid)){
                stat.content!.pids.splice(stat.content!.pids.indexOf(pid), 1);
            }
            await writeFile(store, JSON.stringify(stat.content!, null, 2)).then(async () => {
                return callback({ status: true });
            }).catch(async (e) => {
                return callback({ status: false, message: e });
            })
        } else {
            return callback({ status: false, message: stat.message });
        }
    })
}
