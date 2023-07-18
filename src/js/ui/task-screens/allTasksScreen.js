import { TaskScreen } from './taskScreen.js';

export class AllTasksScreen extends TaskScreen {
  constructor(app){
    super(app);
  }
  show(){
    let titleElement = document.getElementById("tasks-title");
    let container = document.getElementById("tasks-container");
    titleElement.textContent = "All Tasks";
    container.innerHTML = "";
    let tasks = this.app.storage.getAllTasks();
    console.log(tasks);

    tasks.forEach((task) => {
      let element = this.getTaskElement(task);
      container.appendChild(element);
    });
  }
}