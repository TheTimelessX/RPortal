export interface Port {
    name: string;
    bought_on: number;
    token: string;
    chat: number;
    type: string;
    domain_type: string;
}

export interface User {
    id: number;
    coins: number;
    ban: boolean;
    port: Port[];
}

export interface Domain {
    id: string;
    durl: string;
    private_key: string;
    contains: string[]; // list of port names bought this domain
    includes: string[]; // list of includes file
}
