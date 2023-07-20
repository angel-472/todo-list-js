import { Task } from '../models/task.js';
import { List } from '../models/list.js';
import { parseISO, isSameDay } from 'date-fns';

export class LocalDataStorage {
  constructor(app){
    this.app = app;
    this.localStorageKey = "todoListAppLocalStorage";
    this.taskLists = {};
  }
  load(){
    let localStorageData = localStorage.getItem(this.localStorageKey);
    if(localStorageData !== null){
      let data = JSON.parse(localStorageData);
      this.taskLists = data;
      console.log("Loaded data from local storage");
    }
    else {
      console.log("Local storage data for '" + this.localStorageKey + "' is empty!");
      let defaultTaskList = new List("Tasks");
      this.taskLists[defaultTaskList.id] = defaultTaskList;
    }
    this.defaultTaskList = Object.values(this.taskLists)[0];
  }
  save(){
    let data = JSON.stringify(this.taskLists);
    localStorage.setItem(this.localStorageKey, data);
  }
  createNewTask(name){
    let task = new Task(name);
    return task;
  }
  createNewTaskList(name){
    let taskList = new List(name);
    this.taskLists[taskList.id] = taskList;
    taskList.new = true;
    return taskList;
  }
  getTaskList(taskListName) {
    const taskLists = Object.values(this.taskLists);
    for (let i = 0; i < taskLists.length; i++) {
      if (taskLists[i].name === taskListName) {
        return taskLists[i];
      }
    }
    return null; // or any other value indicating that the task list was not found
  }
  getTaskListById(id){
    return this.taskLists[id];
  }
  getTaskLists(){
    return Object.values(this.taskLists);
  }
  getDefaultTaskList(){
    return this.defaultTaskList;
  }
  deleteTaskList(taskList){
    delete this.taskLists[taskList.id];
  }
  addTaskToList(task, list){
    list.tasks.push(task);
    task.listId = list.id
  }
  removeTaskFromList(list, task){
    let index = list.tasks.indexOf(task);
    list.tasks.splice(index, 1);
  }
  deleteTask(task){
    let list = this.getTaskListById(task.listId);
    this.removeTaskFromList(list, task);
  }
  getAllTasks(){
    let output = [];
    this.getTaskLists().forEach((list) => {
      list.tasks.forEach((task) => {
        output.push(task);
      });
    });
    return output;
  }
  getTodayTasks(){
    return this.getAllTasks().filter(task => {
      if(task.date !== undefined){
        let taskDate = parseISO(task.date);
        let today = new Date();
        if(isSameDay(taskDate, today)){
          return true;
        }
      }
    });
  }
}
