import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() task: Task = {
    id: 0,
    title: '',
    done: false,
  }

  @Output() remove = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }

  markAsDone(): void {
    this.task.done = !this.task.done;
  }

  removeTask(): void {
    this.remove.emit(this.task)
  }

}
