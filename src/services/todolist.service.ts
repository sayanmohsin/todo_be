import { QueryOptions, TodoList } from '../types/custom.type';
import todoListDB from '../models/pg/todolist.pg';
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
            throw new ErrorHandler(400, "Something went wrong");
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
            throw new ErrorHandler(400, "Something went wrong");
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
            throw new ErrorHandler(400, "Something went wrong");
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
            throw new ErrorHandler(400, "Something went wrong");
        }
    }

    static async deleteTodoList(
        todo_list_id: string
    ): Promise<TodoList> {
        try {
            let todoList = await todoListDB.findByPk(todo_list_id);
            if (!todoList)
                throw new ErrorHandler(400, "Todo list get failed");
            todoList = await todoListDB.delete(todo_list_id);
            if (!todoList)
                throw new ErrorHandler(400, "Todo delete get failed");

            return todoList;
        } catch (e) {
            console.log('e: ', e);
            throw new ErrorHandler(400, "Something went wrong");
        }
    }
}

(async () => {
    // const todoList = new TodoListService({
    //     name: 'College'
    // });
    // const t = await todoList.createTodoList();
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