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
    if(task.date !== undefined){
      let dateElement = document.createElement("p");
      dateElement.textContent = task.date;
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
