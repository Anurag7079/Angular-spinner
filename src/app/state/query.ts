import { Query } from "@datorama/akita";
import { TodoState, TodoStore } from "./store";
import { Todo } from "../model/tasks";
import { Injectable } from '@angular/core'; // Add this import
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class TodoQuery extends Query<TodoState> {
    constructor(private todoStore: TodoStore) {
        super(todoStore);
    }

    getTodos(): Observable<Todo[]> {
        return this.select(state => state.todos);
    }

    getLoaded() {
        return this.select(state => state.isLoaded);
    }

    getLoading() {
        return this.selectLoading();
    }
}
