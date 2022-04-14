import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tasks: Array<Task> = [];
  task: Task = {
    id: 0,
    title: '',
    done: false,
  }

  constructor() { }

  ngOnInit(): void {
    let items: any = localStorage.getItem('tasks')
    let tasks = Array(...JSON.parse(items))
    if (!tasks) {
      this.tasks = [];
    } else {
      this.tasks = tasks;
    }
  }

  addTask(title: string,) {
    if (title) {
      const id = this.tasks.length + 1;
      this.tasks.push(this.task = {
        id: id,
        title: title,
        done: false
      });
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      console.log(this.tasks)
    }
  }

  removeTask(task: Task): void {
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

}
