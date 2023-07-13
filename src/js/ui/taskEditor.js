export class TaskEditor {
  constructor(app){
    this.app = app;
  }
  init(){
    this.titleElement = document.getElementById("task-editor-title")
    this.editorElement = document.getElementById("task-editor");
    this.cancelButton = document.getElementById("task-editor-cancel");
    this.saveButton = document.getElementById("task-editor-save");
    this.nameInput = document.getElementById("task-editor-name");
    this.descriptionInput = document.getElementById("task-editor-description");
    this.dateInput = document.getElementById("task-editor-date");
    this.taskListPicker = document.getElementById("task-editor-list");

    this.cancelButton.addEventListener('click', () => {this.cancel()});
    this.saveButton.addEventListener('click', () => {
      if(!this.saveButton.classList.contains("disabled")){
        this.save()
      }
    });
    this.nameInput.addEventListener('input', () => { this.update() });
  }
  update(){
    if(this.nameInput.value !== ''){
      this.saveButton.classList.remove("disabled");
    }
    else {
      this.saveButton.classList.add("disabled");
    }
  }
  updateTaskListPicker(){
    let taskListPicker = this.taskListPicker;
    let taskLists = this.app.storage.getTaskLists();
    taskListPicker.innerHTML = "";
    taskLists.forEach((taskList) => {
      let optionElement = document.createElement("option");
      optionElement.value = taskList.id;
      optionElement.textContent = taskList.name;
      taskListPicker.appendChild(optionElement);
    });
    if(this.currentTask.listId !== undefined){
      taskListPicker.value = this.currentTask.listId;
    }
  }
  open(task){
    this.currentTask = task;
    this.reset();
    this.show();
    if(this.currentTask.new !== true){
      this.restoreValues();
    }

    this.update();
    this.updateTaskListPicker();
  }
  show(){
    this.editorElement.style.display = 'flex';
  }
  hide(){
    this.editorElement.style.display = 'none';
  }
  reset(){
    this.nameInput.value = "";
    this.descriptionInput.value = "";
    this.dateInput.value = "";
    this.titleElement.textContent = "New Task";
  }
  cancel(){
    this.hide();
  }
  save(){
    let task = this.currentTask;
    let taskList = this.app.storage.getTaskListById(this.taskListPicker.value);
    task.name = this.nameInput.value;
    task.description = this.descriptionInput.value;
    if(task.listId !== undefined && task.listId !== taskList.id && !task.new){
      let currentList = this.app.storage.getTaskListById(task.listId);
      this.app.storage.removeTaskFromList(currentList, task);
      this.app.storage.addTaskToList(task, taskList);
    }
    task.listId = taskList.id;
    if(this.dateInput.value !== ""){
      task.date = this.dateInput.value;
    }
    if(task.new){
      this.app.storage.addTaskToList(task, taskList);
      delete this.currentTask.new;
    }
    this.hide();
    this.app.mainUI.updateCurrentScreen();
    this.app.sidebar.update();
    this.app.storage.save();
  }
  restoreValues(){
    this.nameInput.value = this.currentTask.name;
    this.descriptionInput.value = this.currentTask.description;
    this.dateInput.value = this.currentTask.date;
    this.titleElement.textContent = "Editing Task";
  }
}