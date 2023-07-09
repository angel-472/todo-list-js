import { Task } from '../models/task.js';
import { List } from '../models/list.js';

export class LocalDataStorage {
  constructor(app){
    this.app = app;
    this.localStorageKey = "todoListAppLocalStorage";
    this.taskLists = {};
  }
  load(){
    let localStorageData = localStorage.getItem(this.localStorageKey);
    if(localStorageData !== null){
      console.log("Loaded data from local storage");
    }
    else {
      console.log("Local storage data for '" + this.localStorageKey + "' is empty!");
      let defaultTaskList = new List("Tasks");
      this.taskLists[defaultTaskList.id] = defaultTaskList;
    }
    this.defaultTaskList = this.getTaskList("Tasks");
  }
  save(){
    let data = "";
    localStorage.setItem(this.localStorageKey, data);
  }
  createNewTask(list){
    let task = new Task(list,"new task");
    return task;
  }
  createNewTaskList(name){
    let taskList = new List(name);
    this.taskLists[taskList.id] = taskList;
    taskList.new = true;
    return taskList;
  }
  getTaskList(name) {
    const taskLists = Object.values(this.taskLists);
    for (let i = 0; i < taskLists.length; i++) {
      if (taskLists[i].name === name) {
        return taskLists[i];
      }
    }
    return null; // or any other value indicating that the task list was not found
  }
  deleteTaskList(taskList){
    delete this.taskLists[taskList.id];
  }
}
