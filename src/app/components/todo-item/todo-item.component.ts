import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() 
  todo:Todo;

  @Output()
  deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }

  //dynamically set class
  setClasses(){
    return {
      'is-complete': this.todo.completed
    }
  }

  setCheck(){
    return this.todo.completed;
  }

  onToggle(todo){
    todo.completed = !todo.completed;
    this.todoService.updateTodo(this.todo).subscribe(todo => {
      console.log(todo);
    });

  }

  onDelete(todo){
    this.deleteTodo.emit(todo);
  }

}
