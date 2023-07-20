import { TaskScreen } from "./taskScreen";
import { parseISO, isSameDay } from "date-fns";

export class ScheduledTasksScreen extends TaskScreen {
  constructor(app){
    super(app);
  }
  show(){
    let titleElement = document.getElementById("tasks-title");
    let container = document.getElementById("tasks-container");
    titleElement.textContent = "Scheduled";
    container.innerHTML = "";
    let tasks = this.app.storage.getAllTasks().filter(task => task.date !== undefined);
    let sortedTasks = tasks.sort((a, b) => {
      let dateA = parseISO(a.date);
      let dateB = parseISO(b.date);
      return dateA - dateB;
    });
    console.log(sortedTasks);

    let divPastDue = document.createElement("div");
    divPastDue.innerHTML = `<h3>Past Due</h3>`;
    divPastDue.classList.add("scheduled-task-container");
    container.appendChild(divPastDue);
    let divToday = document.createElement("div");
    divToday.classList.add("scheduled-task-container");
    divToday.innerHTML = `<h3>Today</h3>`;
    container.appendChild(divToday);
    let divFuture = document.createElement("div");
    divFuture.innerHTML = `<h3>Future Tasks</h3>`;
    divFuture.classList.add("scheduled-task-container");
    container.appendChild(divFuture);

    let today = new Date().setHours(0,0,0,0);
    if(tasks.length > 0){
      tasks.forEach((task) => {
        let element = this.getTaskElement(task);
        element.style.marginLeft = '1em';
        let taskDate = parseISO(task.date);
        if(isSameDay(taskDate, today)){
          divToday.appendChild(element);
          divToday.style.display = 'block';
        }
        else if(taskDate < today){
          divPastDue.appendChild(element);
          divPastDue.style.display = 'block';
        }
        else {
          divFuture.appendChild(element);
          divFuture.style.display = 'block';
        }
      });
    }
    else {
      let emptyListElement = this.getEmptyListElement();
      container.appendChild(emptyListElement);
    }
  }
}