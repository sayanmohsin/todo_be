// environment variables
const { env }: any = process;

import { QueryOptions, TodoList, TodoItem } from '../types/custom.type';
import { ErrorHandler } from '../utils/server.util';
import { TodoListService } from './todolist.service';
import { todoItemDB } from '../configs/db.config';
export class TodoItemService {
    todoItem: TodoItem;
    constructor(todoItem: TodoItem) {
        this.todoItem = todoItem
    }

    async createTodoItem(): Promise<TodoItem> {
        try {
            const todoList = await TodoListService.getOneTodoList(this.todoItem.todo_list_id);
            if (!todoList || typeof todoList == 'undefined')
                throw new ErrorHandler(400, 'Todo list not found')

            const todoItem = await todoItemDB.create(this.todoItem);
            if (!todoItem)
                throw new ErrorHandler(400, "Todo list create failed");

            return todoItem;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }

    static async getAllTodoItems(
        todo_list_id: string,
        queryOptions: QueryOptions = {}
    ): Promise<TodoItem[]> {
        try {
            const todoItems = await todoItemDB.findAll(todo_list_id, queryOptions);
            if (!todoItems)
                throw new ErrorHandler(400, "Todo items get all failed");

            return todoItems;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }

    static async getOneTodoItem(
        todo_list_id: string,
        todo_item_id: string
    ): Promise<TodoItem> {
        try {
            const todoItem = await todoItemDB.findOneInItem(todo_list_id, todo_item_id);
            if (!todoItem)
                throw new ErrorHandler(400, "Todo items get one failed");

            return todoItem;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }

    static async deleteTodoItem(
        todo_list_id: string,
        todo_item_id: string
    ): Promise<boolean> {
        try {
            const status = await todoItemDB.delete(todo_list_id, todo_item_id);
            if (!status)
                throw new ErrorHandler(400, "Todo items delete failed");

            return status;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }

    static async updateTodoItemDescription(
        todo_list_id: string,
        todo_item_id: string,
        description: string
    ): Promise<TodoItem> {
        try {
            const todoItem = await todoItemDB.updateDescription(todo_list_id, todo_item_id, description);
            if (!todoItem)
                throw new ErrorHandler(400, "Todo list update failed");

            return todoItem;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }

    static async updateTodoItemChecked(
        todo_list_id: string,
        todo_item_id: string,
        checked: boolean
    ): Promise<TodoItem> {
        try {
            const todoItem = await todoItemDB.updateChecked(todo_list_id, todo_item_id, checked);
            if (!todoItem)
                throw new ErrorHandler(400, "Todo list update failed");

            return todoItem;
        } catch (e) {
            console.log('e: ', e);
            throw e;
        }
    }
}