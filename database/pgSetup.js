// environment variables
const {
    env
} = process;

const {
    Client
} = require('pg');

(async () => {
    try {
        const pgClient = new Client({
            user: env.PGUSER,
            host: env.PGHOST,
            database: env.PGDATABASE,
            password: env.PGPASSWORD,
            port: env.PGPORT
        })
        await pgClient.connect();

        const tableCreate = `
            CREATE TABLE IF NOT EXISTS todo_lists(
                todo_list_id character varying(50) NOT NULL UNIQUE,
                name character varying(256),
                PRIMARY KEY(todo_list_id)
            );

            CREATE TABLE IF NOT EXISTS todo_items(
                todo_item_id character varying(50) NOT NULL UNIQUE,
                description character varying(256),
                checked boolean DEFAULT true,
                todo_list_id character varying(50) NOT NULL,
                PRIMARY KEY(todo_item_id),
                CONSTRAINT todo_list FOREIGN KEY(todo_list_id) REFERENCES todo_lists(todo_list_id)
            );
        `;

        await pgClient.query(tableCreate);
        await pgClient.end();
        console.log('table created');
        process.exit();
    } catch (e) {
        console.error('e: ', e);
    }
})()