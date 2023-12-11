import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/tasks';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl='http://localhost:3000/tasks'

  constructor(private http:HttpClient) { }


  addTodo(title: string, description: string): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, {title, description});
  }
  
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  deleteTodo(id: number):Observable<Todo>{
    return this.http.delete<Todo>(`${this.baseUrl}/${id}`);
  }

  updateTodo(id:number, changes:any):Observable<Todo>{
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, changes);
  }
}
