export class TaskScreen {
  constructor(app){
    this.app = app;
  }
  getTaskElement(task){
    let container = document.createElement("div");
    container.classList.add("task");
    let checkbox = document.createElement("button");
    checkbox.classList.add("task-checkbox");
    container.appendChild(checkbox);
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

    return container;
  }
}
