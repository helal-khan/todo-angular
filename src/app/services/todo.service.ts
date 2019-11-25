import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  TODO_BASE_URL:string = "http://jsonplaceholder.typicode.com/todos";

  constructor(private http:HttpClient) { }

  //Get All
  getTodos():Observable<Todo[]>{
    const LIMIT:string = "?_limit=8";
    return this.http.get<Todo[]>(`${this.TODO_BASE_URL}${LIMIT}`);
  }

  //create
  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.TODO_BASE_URL, todo, httpOptions);
  }

  //Update
  updateTodo(todo:Todo):Observable<any>{
    const url = `${this.TODO_BASE_URL}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  //Delete
  deleteTodo(todo:Todo):Observable<Todo>{
    const url = `${this.TODO_BASE_URL}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }
}