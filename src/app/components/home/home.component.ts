import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoQuery } from 'src/app/state/query';
import { TodoStore } from 'src/app/state/store';
import { ApiService } from 'src/app/service/api.service';
import { Todo, TodoStatus } from 'src/app/model/tasks';
import { filter, switchMap, take } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {


  loading = false;
  todos: Todo[] = [];

  constructor(
    private router: Router,
    private todoQuery: TodoQuery,
    private todoStore: TodoStore,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.todoQuery.getLoading().subscribe(res => this.loading = res);
    this.todoQuery.getTodos().subscribe((res) => {
      this.todos = res
      console.log("res--->", res);
    })
    console.log(this.todos);
    this.todoQuery.getLoaded().pipe(

      take(1),
      filter(res => !res),
      switchMap(() => {
        this.todoStore.setLoading(true);
        return this.apiService.getAllTodos();
      })
    ).subscribe(res => {
      this.todoStore.update(state => {
        return {
          todos: res
        };
      });
      this.todoStore.setLoading(false);
    }, err => {
      console.log(err);
      this.todoStore.setLoading(false);
    });
  }

  addTodo() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigateByUrl('app-add-todos')
    }, 2000);
  }

  markAsComplete(id: number) {
    this.apiService.updateTodo(id, { status: TodoStatus.DONE }).subscribe(res => {
      this.todoStore.update(state => {
        const todos = [...state.todos];
        const index = todos.findIndex((todo) => todo.id === id);
        console.log(index);
        todos[index] = {
          ...todos[index],
          status: TodoStatus.DONE
        };
        return {
          ...state,
          todos
        };
      });
    }, err => console.log(err));
  }



  deleteTodo(id: number) {
    this.apiService.deleteTodo(id).subscribe(() => {
      // Remove the deleted TODO item from the local state
      this.todoStore.update((state) => ({
        Todos: state.todos.filter((todo) => todo.id !== id),
        isLoaded: state.isLoaded,
      }));

      this.cdr.detectChanges();
    });
    window.location.reload()
  }


}
