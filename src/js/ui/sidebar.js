export class SideBar {
  constructor(app){
    this.app = app;
  }
  init(){ 
    this.buttonAllTasks = document.getElementById("btn-screen-alltasks");
    this.update();

    document.getElementById("new-list").addEventListener("click", (e) => {
      this.createNewTaskList();
    });
    this.buttonAllTasks.addEventListener("click", () => {
      this.app.mainUI.showAllTasks();
    });
  }
  update(){
    let lists = Object.values(this.app.storage.taskLists);
    let container = document.getElementById("task-lists");
    container.innerHTML = "";
    for(let i = 0; i < lists.length; i++){
      let list = lists[i];
      let element = this.getTaskListElement(list);
      container.appendChild(element);
      element.addEventListener('click', () => {
        console.log(list.id);
        this.app.mainUI.showTaskList(list);
      });
    }
    this.updateElementTaskAmount(this.buttonAllTasks, this.app.storage.getAllTasks().length);
  }
  getTaskListElement(list){
    let element = document.createElement("button");
    element.classList.add("btn-task-list");
    element.innerHTML = `
      <i class="fa-solid ${list.icon} icon-square" style="background-color: ${list.color};"></i>
      <p class="task-list-name">${list.name}</p>
      <p class="task-amount">${list.tasks.length}</p>
    `;
    element.classList.add("tasklist-" + list.id);
    return element;
  }
  createNewTaskList(){
    let list = this.app.storage.createNewTaskList("New List");
    let element = document.querySelector(".tasklist-" + list.id);
    this.openTaskListEditor(element,list);
    this.update();
  }
  openTaskListEditor(element, list){
    console.log("editing task list: " + list.id);
    this.app.taskListEditor.open(list);
  }
  updateElementTaskAmount(element, amount){
    let amountElement = document.querySelector(`#${element.id} > .task-amount`);
    amountElement.textContent = amount;
  }
}
