import "../style.css";
import { MainUI } from './ui/mainUI.js';
import { SideBar } from './ui/sidebar.js';
import { TaskListEditor } from './ui/taskListEditor.js';
import { LocalDataStorage } from './storage/localStorage.js';
import { TaskEditor } from './ui/taskEditor.js';

class TodoListApp {
  constructor(){
    this.mainUI = new MainUI(this);
    this.sidebar = new SideBar(this);
    this.storage = new LocalDataStorage(this);
    this.taskListEditor = new TaskListEditor(this);
    this.taskEditor = new TaskEditor(this);
  }
  init(){
    console.log("Starting todo list app")
    this.tasks = {};
    this.storage.load();
    this.mainUI.init();
    this.sidebar.init();
    this.taskListEditor.init();
    this.taskEditor.init();
  }
}

window.todoList = new TodoListApp();
todoList.init();
