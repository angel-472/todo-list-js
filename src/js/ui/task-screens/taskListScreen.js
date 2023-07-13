import { TaskScreen } from './taskScreen.js';

export class TaskListScreen extends TaskScreen {
  constructor(app, taskList){
    super(app);

    this.taskList = taskList;
  }
  show(){
    let titleElement = document.getElementById("tasks-title");
    titleElement.textContent = this.taskList.name;
    let container = document.getElementById("tasks-container");
    container.innerHTML = "";
    if(this.taskList.tasks.length > 0){
      this.taskList.tasks.forEach((task) => {
        let element = this.getTaskElement(task);
        container.appendChild(element);
      });
    }
    else {
      let emptyListElement = document.createElement("div");
      emptyListElement.innerHTML = `<p>This list has no tasks, start adding some!</p>`;
      emptyListElement.classList.add("empty-task-list-dialog");
      container.appendChild(emptyListElement);
    }
  }
}
