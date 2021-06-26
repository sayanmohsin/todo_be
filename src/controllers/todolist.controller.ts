// imports
import { Request, Response, NextFunction } from 'express';
import { TodoListService } from '../services/todolist.service';
import { IResponse, QueryOptions, TodoList } from '../types/custom.type';

/**
 * controller to create todo list
 */
export const createTodoListCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<TodoList> = {} as IResponse<TodoList>;

        const newTodoList: TodoList = req.body as TodoList;

        const todoList = new TodoListService({
            name: newTodoList.name
        })

        result.data = await todoList.createTodoList();
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}

/**
 * controller to get all todo list
 */
export const getAllTodoListsCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<TodoList[]> = {} as IResponse<TodoList[]>;

        const queryOptions: QueryOptions = req.query as QueryOptions;

        result.data = await TodoListService.getAllTodoLists(queryOptions);
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}

/**
 * controller to get todo list by pk
 */
export const getTodoListCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<TodoList> = {} as IResponse<TodoList>;

        const todo_list_id = req.params.todo_list_id as string;

        result.data = await TodoListService.getOneTodoList(todo_list_id);
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}

/**
 * controller to update todo list by pk
 */
export const updateTodoListNameCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<TodoList> = {} as IResponse<TodoList>;

        const todo_list_id = req.params.todo_list_id as string;
        const name = req.body.name as string;

        result.data = await TodoListService.updateTodoListName(todo_list_id, name);
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}

/**
 * controller to delete todo list by pk
 */
export const deleteTodoListCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<TodoList> = {} as IResponse<TodoList>;

        const todo_list_id = req.params.todo_list_id as string;

        result.data = await TodoListService.deleteTodoList(todo_list_id);
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}