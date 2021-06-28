// environment variables
const {
    env
} = process;

const {
    MongoClient
} = require("mongodb");

(async () => {
    try {
        const connectionString = env.MONGO_CONNECTION_STRING;
        const client = new MongoClient(
            connectionString, {
                useUnifiedTopology: true
            });

        await client.connect();
        await client.db("todo_lists").command({
            ping: 1
        });
        await client.db("todo_items").command({
            ping: 1
        });
        await client.disconnect();
        process.exit();
    } catch (e) {
        console.error('e: ', e);
    }
})()