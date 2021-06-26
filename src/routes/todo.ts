// imports
import {
    Router
} from 'express';
import { createTodoItemCtrl, getTodoItemCtrl, deleteTodoItemCtrl, updateTodoItemDescriptionCtrl, updateTodoItemCheckedCtrl, getAllTodoItemsCtrl } from '../controllers/todoitem.controller';
import { createTodoListCtrl, deleteTodoListCtrl, getAllTodoListsCtrl, getTodoListCtrl, updateTodoListNameCtrl } from '../controllers/todolist.controller';

export const todoRouter = async (): Promise<Router> => {
    const router = Router();

    /**
     * routers for todo list
     */

    router.post('/list/create', createTodoListCtrl);

    router.get('/lists', getAllTodoListsCtrl);

    router.get('/list/:todo_list_id', getTodoListCtrl);

    router.put('/list/update-name/:todo_list_id', updateTodoListNameCtrl);

    router.delete('/list/delete/:todo_list_id', deleteTodoListCtrl);

    /**
     * routers for todo item
     */

    router.post('/item/create/:todo_list_id', createTodoItemCtrl);

    router.get('/items/:todo_list_id', getAllTodoItemsCtrl);

    router.get('/item/:todo_list_id/:todo_item_id', getTodoItemCtrl);

    router.delete('/item/delete/:todo_list_id/:todo_item_id', deleteTodoItemCtrl);

    router.put('/item/update-description/:todo_list_id/:todo_item_id', updateTodoItemDescriptionCtrl);

    router.put('/item/update-checked/:todo_list_id/:todo_item_id', updateTodoItemCheckedCtrl);

    return router;
};
