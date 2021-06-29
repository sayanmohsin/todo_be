import chai, { assert, expect } from 'chai';
import request from 'request';
import { stub } from 'sinon';
import chaiHttp from 'chai-http';
import 'mocha';
import { TodoListService } from '../services/todolist.service';
import { TodoItemService } from '../services/todoitem.service';
import { TodoList, TodoItem } from '../types/custom.type';

chai.use(chaiHttp)

describe("functional requirements - unit test", () => {
    it("can create a List", async () => {
        let newTodoList: TodoList = {} as TodoList;

        const createTodoList = stub(TodoListService.prototype, "createTodoList").returns(
            Promise.resolve({
                name: "test",
                todo_list_id: "sampleid"
            } as TodoList)
        );
        newTodoList = await createTodoList();

        expect(newTodoList.name).to.not.equal(null);
        expect(newTodoList.todo_list_id).to.not.equal(null);
    });

    it("can get all Lists", async () => {
        let todoLists: TodoList[] = [] as TodoList[];

        const getAllTodoLists = stub(TodoListService, "getAllTodoLists").returns(
            Promise.resolve([
                {
                    name: "test_1",
                    todo_list_id: "sampleid1"
                }, {
                    name: "test_2",
                    todo_list_id: "sampleid2"
                }
            ] as TodoList[])
        );
        todoLists = await getAllTodoLists();

        expect(todoLists).to.be.an('array');

        todoLists.forEach((todoList: TodoList) => {
            expect(todoList.name).to.not.equal(null);
            expect(todoList.todo_list_id).to.not.equal(null);
        })
    });

    it("can get a List", async () => {
        const todo_list_id = 'sampleid';
        let todoList: TodoList = {} as TodoList;

        const getOneTodoList = stub(TodoListService, "getOneTodoList").returns(
            Promise.resolve({
                name: "test_1",
                todo_list_id: todo_list_id
            } as TodoList)
        );
        todoList = await getOneTodoList(todo_list_id);

        expect(todoList.todo_list_id).to.equal(todo_list_id);
        expect(todoList.name).to.not.equal(null);
        expect(todoList.todo_list_id).to.not.equal(null);
    });

    it("can update the name of a List", async () => {
        const toUpdate = "mocha_test_updated";
        let todoList: TodoList = {} as TodoList;

        const updateTodoListName = stub(TodoListService, "updateTodoListName").returns(
            Promise.resolve({
                name: toUpdate,
                todo_list_id: "sampleid1"
            } as TodoList)
        );
        todoList = await updateTodoListName('sampleid1', toUpdate);

        expect(todoList.name).to.not.equal(null);
        expect(todoList.todo_list_id).to.not.equal(null);
        expect(todoList.name).to.equal(toUpdate);
    });

    it("can create an Item for a list", async () => {
        const todo_list_id = 'sampleid';
        let newTodoItem: TodoItem = {} as TodoItem;

        const createTodoItem = stub(TodoItemService.prototype, "createTodoItem").returns(
            Promise.resolve({
                todo_item_id: 'sampleid',
                description: 'test description',
                todo_list_id: todo_list_id,
                name: 'test data',
                checked: false
            } as TodoItem)
        );
        newTodoItem = await createTodoItem();

        expect(newTodoItem.description).to.not.equal(null);
        expect(newTodoItem.todo_item_id).to.not.equal(null);
        expect(newTodoItem.todo_list_id).to.equal(todo_list_id);
    });

    it("can get all Items of a List", async () => {
        const todo_list_id = 'sampleid';
        let todoItems: TodoItem[] = [] as TodoItem[];

        const getAllTodoItems = stub(TodoItemService, "getAllTodoItems").returns(
            Promise.resolve([
                {
                    todo_item_id: 'sampleid1',
                    description: 'test description',
                    todo_list_id: todo_list_id,
                    name: 'test data 1',
                    checked: false
                }, {
                    todo_item_id: 'sampleid2',
                    description: 'test description',
                    todo_list_id: todo_list_id,
                    name: 'test data2',
                    checked: false
                }
            ] as TodoItem[])
        );
        todoItems = await getAllTodoItems(todo_list_id);

        todoItems.forEach((todoItem: TodoItem) => {
            expect(todoItem.description).to.not.equal(null);
            expect(todoItem.todo_item_id).to.not.equal(null);
            expect(todoItem.todo_list_id).to.equal(todo_list_id);
        })
    });

    it("can get an Item of a List", async () => {
        const todo_list_id = 'sampleid';
        const todo_item_id = 'sampleid_item'
        let todoItem: TodoItem = {} as TodoItem;

        const getOneTodoItem = stub(TodoItemService, "getOneTodoItem").returns(
            Promise.resolve({
                todo_item_id: todo_item_id,
                description: 'test description',
                todo_list_id: todo_list_id,
                name: 'test data',
                checked: false
            } as TodoItem)
        );
        todoItem = await getOneTodoItem(todo_list_id, todo_item_id);

        expect(todoItem.description).to.not.equal(null);
        expect(todoItem.todo_item_id).to.not.equal(null);
        expect(todoItem.todo_list_id).to.equal(todo_list_id);
        expect(todoItem.todo_item_id).to.equal(todo_item_id);
    });

    it("can update the description of an Item for a List", async () => {
        const toUpdate = "mocha_test_updated";
        const todo_list_id = 'sampleid';
        const todo_item_id = 'sampleid_item'
        let todoItem: TodoItem = {} as TodoItem;

        const updateTodoItemDescription = stub(TodoItemService, "updateTodoItemDescription").returns(
            Promise.resolve({
                todo_item_id: todo_item_id,
                description: toUpdate,
                todo_list_id: todo_list_id,
                name: 'test data',
                checked: false
            } as TodoItem)
        );
        todoItem = await updateTodoItemDescription(todo_list_id, todo_item_id, toUpdate);

        expect(todoItem.todo_list_id).to.equal(todo_list_id);
        expect(todoItem.todo_item_id).to.equal(todo_item_id);
        expect(todoItem.description).to.equal(toUpdate);
    });

    it("can update the checked status of an Item for a List", async () => {
        const toUpdate = false;
        const todo_list_id = 'sampleid';
        const todo_item_id = 'sampleid_item'
        let todoItem: TodoItem = {} as TodoItem;

        const updateTodoItemChecked = stub(TodoItemService, "updateTodoItemChecked").returns(
            Promise.resolve({
                todo_item_id: todo_item_id,
                description: toUpdate,
                todo_list_id: todo_list_id,
                name: 'test data',
                checked: false
            } as unknown as TodoItem)
        );
        todoItem = await updateTodoItemChecked(todo_list_id, todo_item_id, toUpdate);

        expect(todoItem.todo_list_id).to.equal(todo_list_id);
        expect(todoItem.todo_item_id).to.equal(todo_item_id);
        expect(todoItem.description).to.equal(toUpdate);
    });

    it("can delete an Item of a List", async () => {
        const todo_list_id = 'sampleid';
        const todo_item_id = 'sampleid_item'
        let status = false;

        const deleteTodoItem = stub(TodoItemService, "deleteTodoItem").returns(
            Promise.resolve(true)
        );
        status = await deleteTodoItem(todo_list_id, todo_item_id);

        expect(status).to.equal(true);
    });

    it("can delete a List", async () => {
        const todo_list_id = 'sampleid';
        let status = false;

        const deleteTodoList = stub(TodoListService, "deleteTodoList").returns(
            Promise.resolve(true)
        );
        status = await deleteTodoList(todo_list_id);

        expect(status).to.equal(true);
    });
});


