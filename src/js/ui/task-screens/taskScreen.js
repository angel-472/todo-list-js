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

    //details
    let detailsContainer = document.createElement("div");
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
}
