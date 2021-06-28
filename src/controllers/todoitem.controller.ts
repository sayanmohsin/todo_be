// imports
import { Request, Response, NextFunction } from 'express';
import { TodoItemService } from '../services/todoitem.service';
import { IResponse, QueryOptions, TodoItem } from '../types/custom.type';

/**
 * controller to create todo item
 */
export const createTodoItemCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<TodoItem> = {} as IResponse<TodoItem>;

        const todo_list_id = req.params.todo_list_id;
        const description = req.body.description

        const todoItem = new TodoItemService({
            todo_list_id: todo_list_id,
            description: description
        })

        result.data = await todoItem.createTodoItem();
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}

/**
 * controller to get all todo item
 */
export const getAllTodoItemsCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<TodoItem[]> = {} as IResponse<TodoItem[]>;

        const todo_list_id: string = req.params.todo_list_id as string;
        const queryOptions: QueryOptions = req.query as QueryOptions;

        result.data = await TodoItemService.getAllTodoItems(todo_list_id, queryOptions);
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}

/**
 * controller to get todo item by pk
 */
export const getTodoItemCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<TodoItem> = {} as IResponse<TodoItem>;

        const todo_list_id = req.params.todo_list_id as string;
        const todo_item_id = req.params.todo_item_id as string;

        result.data = await TodoItemService.getOneTodoItem(todo_list_id, todo_item_id);
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}

/**
 * controller to delete todo item by pk
 */
export const deleteTodoItemCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<boolean> = {} as IResponse<boolean>;

        const todo_list_id = req.params.todo_list_id as string;
        const todo_item_id = req.params.todo_item_id as string;

        result.data = await TodoItemService.deleteTodoItem(todo_list_id, todo_item_id);
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}

/**
 * controller to update todo item description by pk
 */
export const updateTodoItemDescriptionCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<TodoItem> = {} as IResponse<TodoItem>;

        const todo_list_id = req.params.todo_list_id as string;
        const todo_item_id = req.params.todo_item_id as string;
        const description = req.body.description as string;

        result.data = await TodoItemService.updateTodoItemDescription(todo_list_id, todo_item_id, description);
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}

/**
 * controller to update todo item checked by pk
 */
export const updateTodoItemCheckedCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: IResponse<TodoItem> = {} as IResponse<TodoItem>;

        const todo_list_id = req.params.todo_list_id as string;
        const todo_item_id = req.params.todo_item_id as string;
        const checked = req.body.checked as boolean;

        result.data = await TodoItemService.updateTodoItemChecked(todo_list_id, todo_item_id, checked);
        result.success = true;
        result.message = 'success';

        res.send(result);
    } catch (e: any) {
        console.error('e: ', e);
        next(e);
    }
}

