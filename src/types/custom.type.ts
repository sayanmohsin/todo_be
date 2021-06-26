export type TodoList = {
    todo_list_id?: string,
    name: string
}

export type TodoItem = {
    todo_item_id?: string,
    description: string,
    checked?: boolean,
    todo_list_id: string,
    name?: string
}

export type QueryOptions = {
    limit?: number,
    offset?: 0 | number
}