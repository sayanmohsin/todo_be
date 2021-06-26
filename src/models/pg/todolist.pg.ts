import { pgClient } from "../../configs/db.config";
import { v4 as uuidv4 } from 'uuid';
import { QueryOptions, TodoList } from "../../types/custom.type";

const todoListDB = {
    create: async (
        data: TodoList
    ): Promise<TodoList | boolean> => {
        try {
            if (!data.todo_list_id || typeof data.todo_list_id == 'undefined')
                data.todo_list_id = uuidv4();

            const query = {
                text: 'INSERT INTO todo_lists (todo_list_id, name) VALUES($1, $2) RETURNING *',
                values: [data.todo_list_id, data.name],
            }

            const result = await pgClient.query(query);

            if (result.rows.length === 0 || !result.rows[0])
                return false;

            const newTodoList = result.rows[0] as TodoList;
            return newTodoList;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    findAll: async (
        queryOptions: QueryOptions = {}
    ): Promise<TodoList[] | boolean> => {
        try {

            let query: {
                text: string,
                values?: any[]
            };

            if (typeof queryOptions !== undefined && typeof queryOptions?.limit != 'undefined' || typeof queryOptions?.offset != 'undefined') {
                query = {
                    text: 'SELECT * FROM todo_lists LIMIT $1 OFFSET $2',
                    values: [queryOptions.limit, queryOptions.offset],
                }
            } else {
                query = {
                    text: 'SELECT * FROM todo_lists',
                }
            }

            const result = await pgClient.query(query);

            if (!result.rows)
                return false;

            const todoLists = result.rows as TodoList[];
            return todoLists;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    findByPk: async (
        todo_list_id: string
    ): Promise<TodoList | boolean> => {
        try {

            const query = {
                text: 'SELECT * FROM todo_lists WHERE todo_list_id = $1',
                values: [todo_list_id],
            };

            const result = await pgClient.query(query);

            if (!result.rows)
                return false;

            if (result.rows.length === 0 || !result.rows[0])
                return false;

            const newTodoList = result.rows[0] as TodoList;
            return newTodoList;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    updateName: async (
        todo_list_id: string,
        name: string
    ): Promise<TodoList | boolean> => {
        try {

            const query = {
                text: 'UPDATE todo_lists SET name = $1 WHERE todo_list_id = $2 RETURNING *',
                values: [name, todo_list_id],
            };

            const result = await pgClient.query(query);

            if (!result.rows)
                return false;

            if (result.rows.length === 0 || !result.rows[0])
                return false;

            const newTodoList = result.rows[0] as TodoList;
            return newTodoList;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    },
    delete: async (
        todo_list_id: string
    ): Promise<TodoList | boolean> => {
        try {
            const queryOne = {
                text: 'DELETE FROM todo_items WHERE todo_list_id = $1',
                values: [todo_list_id],
            };
            const resultOne = await pgClient.query(queryOne);

            const queryTwo = {
                text: 'DELETE FROM todo_lists WHERE todo_list_id = $1 RETURNING *',
                values: [todo_list_id],
            };
            const resultTwo = await pgClient.query(queryTwo);

            if (!resultOne.rows || !resultTwo.rows)
                return false

            if (resultTwo.rows.length === 0 || !resultTwo.rows[0])
                return false;

            const todoList = resultTwo.rows[0] as TodoList;
            return todoList;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }
}

export default todoListDB;