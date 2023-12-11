import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { TodoStore } from 'src/app/state/store';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add-todos',
  templateUrl: './add-todos.component.html',
  styleUrls: ['./add-todos.component.css']
})
export class AddTodosComponent implements OnInit {

  form!: FormGroup;

  constructor(private apiService: ApiService,
    private todoStore: TodoStore,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }
  addTodo() {

    this.todoStore.setLoading(true);

    const { title, description } = this.form.value;

    this.apiService.addTodo(title, description).subscribe(
      res => {
        this.todoStore.update(state => {
          return {
            todos: [
              ...state.todos,
              res
            ]
          };
        });
        this.todoStore.setLoading(false);

        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigateByUrl('');
        }, 2000);

      },
      error => {
        console.error('Error adding todo:', error);
        this.todoStore.setLoading(false);
        // Handle the error as needed
      }
    );
    
  }

}
