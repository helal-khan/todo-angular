import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  @Output()
  addTodo: EventEmitter<any> = new EventEmitter();

  title: String;
  buttonDisabled: boolean = true;
  btnLoader: boolean = false;
  textBtn: string[] = ["Add Todo", 'Adding...'];
  btnText: string = this.textBtn[~~this.btnLoader];
  
  @Input() 
  resetEvent: Observable<void>;

  constructor() { }

  ngOnInit() {
    this.resetEvent.subscribe(() => this.resetBtnLoader())
  }

  onSubmit() {
    this.btnLoader = !this.btnLoader;
    this.btnText = this.textBtn[~~this.btnLoader];
    const todo = {
      title: this.title,
      completed: false
    }
    this.addTodo.emit(todo);
  }

  writeTodo() {
    this.title.length < 1 ? this.buttonDisabled = true : this.buttonDisabled = false;
  }

  resetBtnLoader() {
    this.btnLoader = !this.btnLoader;
    this.btnText = this.textBtn[~~this.btnLoader];
    this.buttonDisabled = true;
    this.title = "";
  }
}
