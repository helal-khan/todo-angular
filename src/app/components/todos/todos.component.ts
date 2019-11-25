import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  mainLoader: boolean = true;
  loadContent: boolean = false;
  private resetBtnLoader: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(response => {
      this.mainLoader = false;
      this.loadContent = true;
      this.todos = response;
    });

    this.route
      .queryParams
      .subscribe(params => {
        if (params['completed']) {
          let type = params['completed'] == "true" ? true : false;
          this.todoService.getTodos().subscribe(response => {
            this.mainLoader = false;
            this.loadContent = true;
            this.todos = response.filter(t => t.completed == type);
          });
        }
      });
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
      this.resetBtnLoader.next();
    });
  }
}
