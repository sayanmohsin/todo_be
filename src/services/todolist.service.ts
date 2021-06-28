
// environment variables
const { env }: any = process;

import { QueryOptions, TodoList } from '../types/custom.type';
import { todoListDB } from '../configs/db.config';
import { ErrorHandler } from '../utils/server.util';

export class TodoListService {
    todoList: TodoList;
    constructor(todoList: TodoList) {
        this.todoList = todoList
    }

    async createTodoList(): Promise<TodoList> {
        try {
            const todoList = await todoListDB.create({
                name: this.todoList.name
            });

            return todoList;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }

    static async getAllTodoLists(
        queryOptions: QueryOptions = {}
    ): Promise<TodoList[]> {
        try {
            const todoLists = await todoListDB.findAll(queryOptions);
            if (!todoLists)
                throw new ErrorHandler(400, "Todo list get all failed");

            return todoLists;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }

    static async getOneTodoList(
        todo_list_id: string
    ): Promise<TodoList> {
        try {
            const todoList = await todoListDB.findByPk(todo_list_id);
            if (!todoList)
                throw new ErrorHandler(400, "Todo list get failed");

            return todoList;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }

    static async updateTodoListName(
        todo_list_id: string,
        name: string
    ): Promise<TodoList> {
        try {
            const todoList = await todoListDB.updateName(todo_list_id, name);
            if (!todoList)
                throw new ErrorHandler(400, "Todo list update failed");

            return todoList;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }

    static async deleteTodoList(
        todo_list_id: string
    ): Promise<boolean> {
        try {
            let todoList = await todoListDB.findByPk(todo_list_id);
            if (!todoList)
                throw new ErrorHandler(400, "Todo list get failed");

            const status = await todoListDB.delete(todo_list_id);
            if (!status)
                throw new ErrorHandler(400, "Todo delete get failed");

            return status;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }
}