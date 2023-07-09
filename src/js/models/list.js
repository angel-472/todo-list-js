import { Task } from './task.js';

export class List {
  constructor(name){
    this.id = crypto.randomUUID();
    this.name = name;
    this.tasks = [];
    this.color = '#11736a';
    this.icon = 'fa-list-check';
  }
  createNewTask(name){
    let task = new Task(this, name);
    this.tasks.push(task);
  }
}
