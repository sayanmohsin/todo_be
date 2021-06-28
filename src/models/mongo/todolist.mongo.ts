import { mongoClient } from "../../configs/db.config";
import { v4 as uuidv4 } from 'uuid';
import { QueryOptions, TodoList } from "../../types/custom.type";
import { ErrorHandler } from "../../utils/server.util";

const mongoTodoListDB = {
    create: async (
        data: TodoList
    ): Promise<TodoList> => {
        try {
            if (!data.todo_list_id || typeof data.todo_list_id == 'undefined')
                data.todo_list_id = uuidv4();

            const query = {
                '_id': data.todo_list_id,
                ...data
            }

            const result = await mongoClient.db.collection('todo_lists').insertOne(query);

            if (result.ops.length === 0 || !result.ops[0])
                throw new ErrorHandler(400, "Todo list create failed");

            delete result.ops[0]._id;
            const newTodoList = result.ops[0] as TodoList;
            return newTodoList;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    findAll: async (
        queryOptions: QueryOptions = {}
    ): Promise<TodoList[]> => {
        try {
            let result: any = {}
            if (typeof queryOptions !== undefined && typeof queryOptions?.limit != 'undefined' || typeof queryOptions?.offset != 'undefined') {
                result = await mongoClient.db.collection('todo_lists').find({}, { projection: { _id: 0 } }).skip(queryOptions.offset).limit(queryOptions.limit).toArray();
            } else {
                result = await mongoClient.db.collection('todo_lists').find({}, { projection: { _id: 0 } }).toArray();
            }
            if (!result)
                throw new ErrorHandler(400, "Todo list find failed");

            // result = result.map((r: any) => {
            //     delete r._id
            //     return { ...r };
            // });

            const todoLists = result as TodoList[];
            return todoLists;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    findByPk: async (
        todo_list_id: string
    ): Promise<TodoList> => {
        try {
            const query = { todo_list_id: todo_list_id };
            const result = await mongoClient.db.collection('todo_lists').findOne(query, { projection: { _id: 0 } });

            if (!result)
                throw new ErrorHandler(400, "Todo list find failed");

            const newTodoList = result as TodoList;
            return newTodoList;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    updateName: async (
        todo_list_id: string,
        name: string
    ): Promise<TodoList> => {
        try {
            const query = { todo_list_id: todo_list_id };
            const result = await mongoClient.db.collection('todo_lists').findOneAndUpdate(query, {
                $set: {
                    name: name
                }
            }, {
                projection: {
                    _id: 0
                },
                returnOriginal: false,
                returnNewDocument: true
            });

            if (!result.value)
                throw new ErrorHandler(400, "Todo list find failed");

            const newTodoList = result.value as TodoList;
            return newTodoList;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    delete: async (
        todo_list_id: string
    ): Promise<boolean> => {
        try {

            const query = { todo_list_id: todo_list_id };

            const resultOne = await mongoClient.db.collection('todo_lists').deleteOne(query);

            const resultTwo = await mongoClient.db.collection('todo_items').deleteMany(query);

            if (!resultOne || !resultTwo)
                throw new ErrorHandler(400, "Todo list delete failed");

            return true;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }
}

export default mongoTodoListDB;