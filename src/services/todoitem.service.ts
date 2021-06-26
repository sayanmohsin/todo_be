
import { QueryOptions, TodoList, TodoItem } from '../types/custom.type';
import todoItemDB from '../models/pg/todoitem.pg';
import { ErrorHandler } from '../utils/server.util';
import { TodoListService } from './todolist.service';

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
            throw new ErrorHandler(400, "Something went wrong");
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
    ): Promise<TodoItem> {
        try {
            const todoItem = await todoItemDB.delete(todo_list_id, todo_item_id);
            if (!todoItem)
                throw new ErrorHandler(400, "Todo items delete failed");

            return todoItem;
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

(async () => {
    // const todoItem = new TodoItemService({
    //     description: 'top',
    //     todo_list_id: '99165a96-6d41-4318-8da9-8eb3af9ef71e'
    // });
    // console.log('todoItem: ', todoItem);

    // const t = await todoItem.createTodoItem();
    // console.log('t: ', t);

    // const t = await TodoItemService.getAllTodoItemsByTodoListId('99165a96-6d41-4318-8da9-8eb3af9ef71e');
    // console.log('t: ', t);

    // const t = await TodoItemService.getOneTodoItemsByTodoListId('99165a96-6d41-4318-8da9-8eb3af9ef71e', '4baf1a5a-99bd-4888-abbd-814992f3eb00');
    // console.log('t: ', t);

    // const t = await TodoItemService.getAllTodoItemsByTodoListId('99165a96-6d41-4318-8da9-8eb3af9ef71e');
    // console.log('t: ', t);

    // const t = await TodoListService.getAllTodoLists();
    // console.log('t: ', t);

    // const t = await TodoListService.getTodoListById('4d45c70b-687a-42e0-a55b-2fc763bf6188');
    // console.log('t: ', t);

    // const t = await TodoListService.updateTodoListNameById('4d45c70b-687a-42e0-a55b-2fc763bf6188', 'koko');
    // console.log('t: ', t);

    // const t = await TodoListService.deleteTodoList('33ac3778-e222-491c-bd45-eb525a47cf8f');
    // console.log('t: ', t);

})();