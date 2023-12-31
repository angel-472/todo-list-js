import { parseISO, format, isSameDay } from 'date-fns'

export class TaskScreen {
  constructor(app){
    this.app = app;
  }
  getTaskElement(task){
    let container = document.createElement("div");
    container.classList.add("task");

    //checkbox
    let checkbox = document.createElement("button");
    checkbox.classList.add("task-checkbox");
    container.appendChild(checkbox);
    checkbox.addEventListener('click', () => {
      if(task.completed == undefined){
        checkbox.classList.add("completed");
        task.completed = true;
        task.timeout = setTimeout(() => {
          if(task.completed = true){
            this.app.storage.deleteTask(task);
            this.app.storage.save();
            this.app.sidebar.update();
            this.app.mainUI.updateCurrentScreen();
          }
        }, 3000);
      }
      else {
        checkbox.classList.remove("completed");
        delete task.completed;
        if(task.timeout !== undefined){
          clearTimeout(task.timeout);
          delete task.timeout;
        }
      }
    }); 
    if(task.completed){
      checkbox.classList.add("completed");
    }

    //details
    let detailsContainer = document.createElement("div");
    detailsContainer.classList.add("task-details");
    let nameElement = document.createElement("p");
    nameElement.textContent = task.name;
    nameElement.classList.add("task-name");
    detailsContainer.appendChild(nameElement);
    if(task.description !== undefined){
      let descriptionElement = document.createElement("p");
      descriptionElement.textContent = task.description;
      descriptionElement.classList.add("task-description");
      detailsContainer.appendChild(descriptionElement);
    }
    if (task.date !== undefined) {
      //date format
      let dateElement = document.createElement("p");
      let date = parseISO(task.date);
      let formattedDate;
    
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
    
      if (isSameDay(date, tomorrow)) {
        formattedDate = format(date, "'Tomorrow,' hh:mm a");
      } else if (isSameDay(date, yesterday)) {
        formattedDate = format(date, "'Yesterday,' hh:mm a");
      } else if (isSameDay(date, today)){
        formattedDate = format(date, "'Today, ' hh:mm a")
      } else {
        formattedDate = format(date, "M/d/yy, hh:mm a");
      }
      if(today > date){
        dateElement.classList.add("task-date-past");
      }
    
      dateElement.textContent = formattedDate;
      dateElement.classList.add("task-date");
      detailsContainer.appendChild(dateElement);
    }
    container.appendChild(detailsContainer);
    detailsContainer.addEventListener('click', (e) => {
      this.app.taskEditor.open(task);
    });

    //hover icon elements
    let hoverIconsContainer = document.createElement("div");
    hoverIconsContainer.classList.add("task-hover-icons");
    let deleteButton = document.createElement("i");
    deleteButton.classList.add('fa-solid', 'fa-trash', 'task-delete-btn');
    hoverIconsContainer.appendChild(deleteButton);
    hoverIconsContainer.style.display = 'none';
    container.appendChild(hoverIconsContainer);

    //hover icon listeners
    container.addEventListener('mouseenter', () => {
      hoverIconsContainer.style.display = 'flex';
    });
    container.addEventListener('mouseleave', () => {
      hoverIconsContainer.style.display = 'none';
    });

    deleteButton.addEventListener('click', () => {
      this.app.storage.deleteTask(task);
      this.app.storage.save();
      this.app.mainUI.updateCurrentScreen();
      this.app.sidebar.update();
    });

    return container;
  }
  getEmptyListElement(){
    let emptyListElement = document.createElement("div");
    emptyListElement.innerHTML = `<p>This list has no tasks, start adding some!</p>`;
    emptyListElement.classList.add("empty-task-list-dialog");
    return emptyListElement;
  }
}
