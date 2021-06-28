// environment variables
const { env }: any = process;

import { Client } from 'pg';
import { MongoClient } from 'mongodb';
import { infoMsg } from './log.config';
import pgTodoListDB from '../models/pg/todolist.pg';
import pgTodoItemDB from '../models/pg/todoitem.pg';
import mongoTodoListDB from '../models/mongo/todolist.mongo';
import mongoTodoItemDB from '../models/mongo/todoitem.mongo';
import pino from 'pino';

export let pgClient = {} as any;
export let mongoClient = {} as any;
export let todoItemDB = {} as any;
export let todoListDB = {} as any;

export const pgConnect = async (logger: pino.Logger) => {
    try {
        pgClient = new Client({
            user: env.PGUSER,
            host: env.PGHOST,
            database: env.PGDATABASE,
            password: env.PGPASSWORD,
            port: env.PGPORT
        })
        await pgClient.connect();
        logger.info(infoMsg(`connected to pg database`));
        return;
    } catch (e: any) {
        console.error('e: ', e);
    }
}

export const mongoConnect = async (logger: pino.Logger) => {
    try {
        const connectionString = env.MONGO_CONNECTION_STRING;
        mongoClient = new MongoClient(
            connectionString,
            {
                useUnifiedTopology: true
            }
        );
        await mongoClient.connect();
        mongoClient.db = mongoClient.db('todo_db');
        logger.info(infoMsg(`connected to mongo database`));
        return;
    } catch (e: any) {
        console.error('e: ', e);
    }
}

export const initDataSource = async (logger: pino.Logger) => {
    try {
        if (env.CURRENT_DATASOURCE === 'pg') {
            todoListDB = pgTodoListDB;
            todoItemDB = pgTodoItemDB;
            logger.info(infoMsg(`current datasource set to pg`));
        } else if (env.CURRENT_DATASOURCE === 'mongo') {
            todoListDB = mongoTodoListDB;
            todoItemDB = mongoTodoItemDB;
            logger.info(infoMsg(`current datasource set to mongo`));
        }
        return;
    } catch (e: any) {
        console.error('e: ', e);
    }
}


