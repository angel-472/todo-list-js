import { TaskListScreen } from "./task-screens/taskListScreen.js";
import { AllTasksScreen } from "./task-screens/allTasksScreen.js";
import { TodayTasksScreen } from "./task-screens/todayTasksScreen.js";
import { ScheduledTasksScreen } from "./task-screens/scheduledTasksScreen.js";

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
    this.showAllTasks();
  }
  showTaskList(list){
    let screen = new TaskListScreen(this.app, list);
    this.currentScreen = screen;
    this.updateCurrentScreen();
  }
  showAllTasks(){
    let screen = new AllTasksScreen(this.app);
    this.currentScreen = screen;
    this.updateCurrentScreen();
  }
  showTodayTasks(){
    let screen = new TodayTasksScreen(this.app);
    this.currentScreen = screen;
    this.updateCurrentScreen();
  }
  showScheduledTasks(){
    let screen = new ScheduledTasksScreen(this.app);
    this.currentScreen = screen;
    this.updateCurrentScreen();
  }
  getCurrentScreen(){
    return this.currentScreen;
  }
  updateCurrentScreen(){
    if(this.currentScreen !== undefined){
      this.currentScreen.show();
      if(this.currentScreen.taskList !== undefined){
        this.editTaskListButton.style.display = "flex";
      }
      else {
        this.editTaskListButton.style.display = "none";
      }
    }
  }
}
