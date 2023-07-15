import { TaskListScreen } from "./task-screens/taskListScreen.js";

export class MainUI {
  constructor(app){
    this.app = app;
  }
  init(){
    this.newTaskButton = document.getElementById("new-task");
    this.newTaskButton.addEventListener('click', () => {
      let task = this.app.storage.createNewTask("New Task");
      task.new = true;
      //pre-assigns the task to the current list
      if(this.currentScreen.taskList !== undefined){
        task.listId = this.currentScreen.taskList.id;
      }
      this.app.taskEditor.open(task);
    });
    this.editTaskListButton = document.getElementById("btn-edit-task-list");
    this.editTaskListButton.addEventListener('click', () => {
      if(this.currentScreen !== undefined && this.currentScreen.taskList !== undefined){
        let taskList = this.currentScreen.taskList;
        this.app.taskListEditor.open(taskList);
      }
    });
    this.showTaskList(this.app.storage.getDefaultTaskList());
  }
  showTaskList(list){
    let screen = new TaskListScreen(this.app, list);
    screen.show();
    this.currentScreen = screen;
  }
  getCurrentScreen(){
    return this.currentScreen;
  }
  updateCurrentScreen(){
    if(this.currentScreen !== undefined){
      this.currentScreen.show();
    }
  }
}
