// environment variables
const { env }: any = process;

import { Client } from 'pg';
import { infoMsg } from './log.config';

export let pgClient = {} as any;
let mongoClient = {} as any;

export const pgConnect = async () => {
    try {
        pgClient = new Client({
            user: env.PGUSER,
            host: env.PGHOST,
            database: env.PGDATABASE,
            password: env.PGPASSWORD,
            port: env.PGPORT
        })
        await pgClient.connect();
        console.log(infoMsg(`connected to pg database`));
        return;
    } catch (e: any) {
        console.error('e: ', e);
    }
}