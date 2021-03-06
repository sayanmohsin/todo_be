import { pgClient } from "../../configs/db.config";
import { v4 as uuidv4 } from 'uuid';
import { QueryOptions, TodoItem } from "../../types/custom.type";
import { ErrorHandler } from "../../utils/server.util";

const pgTodoItemDB = {
    create: async (
        data: TodoItem
    ): Promise<TodoItem> => {
        try {
            if (!data.todo_item_id || typeof data.todo_item_id == 'undefined')
                data.todo_item_id = uuidv4();

            if (!data.checked || typeof data.checked == 'undefined')
                data.checked = false;

            const query = {
                text: 'INSERT INTO todo_items (todo_item_id, description, checked, todo_list_id) VALUES($1, $2, $3, $4) RETURNING *',
                values: [data.todo_item_id, data.description, data.checked, data.todo_list_id]
            }

            const result = await pgClient.query(query);

            if (result.rows.length === 0 || !result.rows[0])
                throw new ErrorHandler(400, "Todo item create failed");

            const newTodoItem = result.rows[0] as TodoItem;
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

            let query: {
                text: string,
                values?: any[]
            };

            if (typeof queryOptions !== undefined && typeof queryOptions?.limit != 'undefined' || typeof queryOptions?.offset != 'undefined') {
                query = {
                    text: 'SELECT todo_item_id, description, checked, name, todo_items.todo_list_id FROM "todo_items" JOIN "todo_lists" ON "todo_lists"."todo_list_id" = "todo_items"."todo_list_id" WHERE todo_items.todo_list_id = $1 LIMIT $2 OFFSET $3',
                    values: [todo_list_id, queryOptions.limit, queryOptions.offset],
                }
            } else {
                query = {
                    text: 'SELECT todo_item_id, description, checked, name, todo_items.todo_list_id FROM "todo_items" JOIN "todo_lists" ON "todo_lists"."todo_list_id" = "todo_items"."todo_list_id" WHERE todo_items.todo_list_id = $1',
                    values: [todo_list_id],
                }
            }

            const result = await pgClient.query(query);

            if (!result.rows)
                throw new ErrorHandler(400, "Todo item create failed");

            const todoItems = result.rows as TodoItem[];
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

            const query = {
                text: 'SELECT todo_item_id, description, checked, name, todo_items.todo_list_id FROM "todo_items" JOIN "todo_lists" ON "todo_lists"."todo_list_id" = "todo_items"."todo_list_id" WHERE todo_items.todo_list_id = $1 AND todo_items.todo_item_id = $2',
                values: [todo_list_id, todo_item_id],
            };

            const result = await pgClient.query(query);

            if (!result.rows)
                throw new ErrorHandler(400, "Todo item find failed");

            if (result.rows.length === 0 || !result.rows[0])
                throw new ErrorHandler(400, "Todo item find failed");

            const newTodoItem = result.rows[0] as TodoItem;
            return newTodoItem;
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
                text: 'DELETE FROM todo_items WHERE todo_item_id = $1 AND todo_list_id = $2 RETURNING *',
                values: [todo_item_id, todo_list_id],
            };

            const result = await pgClient.query(query);

            if (!result.rows || !result.rows)
                throw new ErrorHandler(400, "Todo item delete failed");

            if (result.rows.length === 0 || !result.rows[0])
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
                text: 'UPDATE todo_items SET description = $1 WHERE todo_item_id = $2 AND todo_list_id = $3 RETURNING *',
                values: [description, todo_item_id, todo_list_id],
            };

            const result = await pgClient.query(query);

            if (!result.rows)
                throw new ErrorHandler(400, "Todo item update failed");

            if (result.rows.length === 0 || !result.rows[0])
                throw new ErrorHandler(400, "Todo item update failed");

            const newTodoItem = result.rows[0] as TodoItem;
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
                text: 'UPDATE todo_items SET checked = $1 WHERE todo_item_id = $2 AND todo_list_id = $3 RETURNING *',
                values: [checked, todo_item_id, todo_list_id],
            };

            const result = await pgClient.query(query);

            if (!result.rows)
                throw new ErrorHandler(400, "Todo item update failed");

            if (result.rows.length === 0 || !result.rows[0])
                throw new ErrorHandler(400, "Todo item update failed");

            const newTodoItem = result.rows[0] as TodoItem;
            return newTodoItem;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }
}

export default pgTodoItemDB;