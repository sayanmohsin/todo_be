import { mongoClient, pgClient } from "../../configs/db.config";
import { v4 as uuidv4 } from 'uuid';
import { QueryOptions, TodoItem } from "../../types/custom.type";
import { ErrorHandler } from "../../utils/server.util";

const mongoTodoItemDB = {
    create: async (
        data: TodoItem
    ): Promise<TodoItem> => {
        try {
            if (!data.todo_item_id || typeof data.todo_item_id == 'undefined')
                data.todo_item_id = uuidv4();

            if (!data.checked || typeof data.checked == 'undefined')
                data.checked = false;

            const query = {
                '_id': data.todo_item_id,
                ...data
            }

            const result = await mongoClient.db.collection('todo_items').insertOne(query);

            if (result.ops.length === 0 || !result.ops[0])
                throw new ErrorHandler(400, "Todo list create failed");

            delete result.ops[0]._id;
            const newTodoItem = result.ops[0] as TodoItem;
            return newTodoItem;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    findAll: async (
        todo_list_id: string,
        queryOptions: QueryOptions = {}
    ): Promise<TodoItem[]> => {
        try {

            let result: any = {}

            const query = [
                {
                    $lookup: {
                        from: 'todo_lists',
                        localField: 'todo_list_id',
                        foreignField: 'todo_list_id',
                        as: 'todo_list'
                    }
                }, {
                    $match: {
                        todo_list_id: todo_list_id
                    }
                }, {
                    $unwind: {
                        path: '$todo_list'
                    }

                }, {
                    $project: {
                        _id: 0,
                        'todo_list._id': 0
                    }
                },
            ];

            if (typeof queryOptions !== undefined && typeof queryOptions?.limit != 'undefined' || typeof queryOptions?.offset != 'undefined') {
                result = await mongoClient.db.collection('todo_items').aggregate(query).skip(queryOptions.offset).limit(queryOptions.limit).toArray();
            } else {
                result = await mongoClient.db.collection('todo_items').aggregate(query).toArray();
            }

            if (!result)
                throw new ErrorHandler(400, "Todo item find failed");

            result = result.map((r: any) => {
                const flatResult = {
                    ...r,
                    ...r?.todo_list
                }
                delete flatResult.todo_list;
                return flatResult;
            })

            const todoItems = result as TodoItem[];
            return todoItems;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    findOneInItem: async (
        todo_list_id: string,
        todo_item_id: string,
    ): Promise<TodoItem> => {
        try {
            const query = [
                {
                    $lookup: {
                        from: 'todo_lists',
                        localField: 'todo_list_id',
                        foreignField: 'todo_list_id',
                        as: 'todo_list'
                    }
                }, {
                    $match: {
                        todo_list_id: todo_list_id,
                        todo_item_id: todo_item_id
                    }
                }, {
                    $unwind: {
                        path: '$todo_list'
                    }
                }, {
                    $project: {
                        _id: 0,
                        'todo_list._id': 0
                    }
                }
            ];

            const result = await mongoClient.db.collection('todo_items').aggregate(query).toArray();

            if (!result || result.length === 0)
                throw new ErrorHandler(400, "Todo item find failed");

            const flatResult = {
                ...result[0],
                ...result[0]?.todo_list
            }
            delete flatResult.todo_list;

            const todoItems = flatResult as TodoItem;
            return todoItems;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    delete: async (
        todo_list_id: string,
        todo_item_id: string
    ): Promise<boolean> => {
        try {
            const query = {
                todo_list_id: todo_list_id,
                todo_item_id: todo_item_id
            };

            const result = await mongoClient.db.collection('todo_items').deleteOne(query);

            if (!result)
                throw new ErrorHandler(400, "Todo item delete failed");

            return true;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    updateDescription: async (
        todo_list_id: string,
        todo_item_id: string,
        description: string
    ): Promise<TodoItem> => {
        try {
            const query = {
                todo_list_id: todo_list_id,
                todo_item_id: todo_item_id
            };
            const result = await mongoClient.db.collection('todo_items').findOneAndUpdate(query, {
                $set: {
                    description: description
                }
            }, {
                projection: {
                    _id: 0
                },
                returnOriginal: false,
                returnNewDocument: true
            });

            if (!result.value)
                throw new ErrorHandler(400, "Todo item update failed");

            const newTodoItem = result.value as TodoItem;
            return newTodoItem;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    updateChecked: async (
        todo_list_id: string,
        todo_item_id: string,
        checked: boolean
    ): Promise<TodoItem> => {
        try {
            const query = {
                todo_list_id: todo_list_id,
                todo_item_id: todo_item_id
            };
            const result = await mongoClient.db.collection('todo_items').findOneAndUpdate(query, {
                $set: {
                    checked: checked
                }
            }, {
                projection: {
                    _id: 0
                },
                returnOriginal: false,
                returnNewDocument: true
            });

            if (!result.value)
                throw new ErrorHandler(400, "Todo item update failed");

            const newTodoItem = result.value as TodoItem;
            return newTodoItem;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }
}

export default mongoTodoItemDB;