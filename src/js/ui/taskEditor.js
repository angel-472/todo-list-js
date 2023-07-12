export class TaskEditor {
  constructor(app){
    this.app = app;
  }
  init(){
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
  }
  open(task){
    this.currentTask = task;
    this.reset();
    this.show();

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
  }
  cancel(){
    this.hide();
  }
  save(){
    let task = this.currentTask;
    task.name = this.nameInput.value;
    task.description = this.descriptionInput.value;
    if(this.dateInput.value !== ""){
      task.date = this.dateInput.value;
    }
    let taskList = this.app.storage.getTaskListById(this.taskListPicker.value);
    this.app.storage.addTaskToList(task, taskList);
    console.log(taskList);
  }
}