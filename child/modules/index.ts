const main_api = "http://";
const private_key = "";
const server_number = 1;

import * as axios from "axios";

export class NetworkConnection {
    async getPort(port: string, callback: (data: any) => void){
        await axios.post(main_api + "/get-port-info", { port, private_key }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (resp) => {
            return callback(resp.data);
        })
    }

    async sendInfo(port: string, skin: string, callback: (data: any) => void, args: Record<string, string | number | boolean | object>[]){
        await axios.post(main_api + "/send-info", { port, private_key, server_number, skin, ...args }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (resp) => {
            return callback(resp.data);
        })
    }
}
