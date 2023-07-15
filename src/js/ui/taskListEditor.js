export class TaskListEditor {
  constructor(app){
    this.app = app;
  }
  init(){
    this.editorTitle = document.getElementById("task-list-editor-title");
    this.editorElement = document.getElementById("task-list-editor");
    this.editorBody = document.getElementById("task-list-editor-body");
    this.cancelButton = document.getElementById("task-list-editor-cancel");
    this.saveButton = document.getElementById("task-list-editor-save");
    this.nameInput = document.getElementById("task-list-editor-name");

    this.cancelButton.addEventListener('click', () => {this.cancel()});
    this.saveButton.addEventListener('click', () => {
      if(!this.saveButton.classList.contains("disabled")){
        this.save()
      }
    });
    this.nameInput.addEventListener('input', () => {
      this.update();
    });
  }
  update(){
    if(this.nameInput.value.length < 1){
      this.saveButton.classList.add("disabled");
    }
    else {
      this.saveButton.classList.remove("disabled");
    }
  }
  updateColorPicker(){
    let container = document.getElementById("task-list-editor-colors");
    let colors = ['#E91E63','#9C27B0','#673AB7','#3f51b5','#2196f3', '#11736a', '#4CAF50', '#FFEB3B', '#FF9800', '#F44336'];
    container.innerHTML = "";
    colors.forEach((color) => {
      let button = document.createElement("button");
      button.classList.add("color-circle");
      button.style.backgroundColor = color;
      if(this.currentTaskList.color == color){
        button.classList.add("selected");
      }
      container.appendChild(button);

      button.addEventListener("click", () => {
        this.setIconColor(color);
        this.updateIconDisplay();
        this.updateColorPicker();
      });
    });
  }
  updateIconPicker(){
    let container = document.getElementById("task-list-editor-icons");
    let icons = ['fa-list-check', 'fa-heart', 'fa-house', 'fa-dumbbell', 'fa-cake-candles', 'fa-school', 'fa-money-bill', 'fa-book', 'fa-bookmark', 'fa-pills', 'fa-plane', 'fa-gamepad', 'fa-paw', 'fa-dog', 'fa-cat', 'fa-basketball', 'fa-football', 'fa-volleyball', 'fa-baseball-bat-ball', 'fa-square', 'fa-circle', 'fa-star'];
    container.innerHTML = "";
    icons.forEach((iconName) => {
      let button = document.createElement("button");
      let icon = document.createElement("icon");
      icon.classList.add("fa-solid");
      icon.classList.add(iconName);
      button.appendChild(icon);
      if(this.currentTaskList.icon == iconName){
        button.classList.add("selected");
      }
      container.appendChild(button);
      button.addEventListener("click", () => {
        this.setIcon(iconName);
        this.updateIconDisplay();
        this.updateIconPicker();
      });
    });
  }
  updateIconDisplay(){
    let iconDisplay = document.getElementById("task-list-editor-icon");
    iconDisplay.style.backgroundColor = this.currentTaskList.color;
    iconDisplay.className = '';
    iconDisplay.classList.add("icon-square");
    iconDisplay.classList.add("fa-solid");
    iconDisplay.classList.add(this.currentTaskList.icon);
  }
  setIconColor(color){
    this.currentTaskList.color = color;
  }
  setIcon(iconName){
    this.currentTaskList.icon = iconName;
  }
  open(taskList){
    this.reset();

    this.currentTaskList = taskList;
    if(!taskList.new){
      this.nameInput.value = taskList.name;
      this.editorTitle.textContent = "Editing List";
      this.showDeleteButton();
    }
    this.show();
    this.update();
    this.updateColorPicker();
    this.updateIconPicker();
    this.updateIconDisplay();
  }
  show(){
    this.editorElement.style.display = "flex";
  }
  hide(){
    this.editorElement.style.display = "none";
  }
  cancel(){
    this.hide();
    if(this.currentTaskList !== undefined && this.currentTaskList.new == true){
      this.app.storage.deleteTaskList(this.currentTaskList);
      this.app.sidebar.update();
    }
  }
  save(){
    let taskList = this.currentTaskList;
    taskList.name = this.nameInput.value;
    if(taskList.new){
      this.app.mainUI.showTaskList(taskList);
    }
    delete taskList.new;
    this.app.sidebar.update();
    this.app.mainUI.updateCurrentScreen();
    this.hide();
    this.app.storage.save();
  }
  reset(){
    this.nameInput.value = "";
    this.editorTitle.textContent = "New List";
    this.hideDeleteButton();
  }
  showDeleteButton(){
    if(this.deleteButton == undefined){
      let btn = document.createElement("button");
      btn.classList.add("btn-delete");
      btn.textContent = "Delete List";
      this.editorBody.appendChild(btn);
      this.deleteButton = btn;

      btn.addEventListener('click', () => {
        console.log("deleting list: " + this.currentTaskList.name);
        this.app.storage.deleteTaskList(this.currentTaskList);
        this.app.storage.save();
        this.app.sidebar.update();
        if(this.app.mainUI.getCurrentScreen().taskList !== undefined && this.app.mainUI.getCurrentScreen().taskList == this.currentTaskList){
          let taskList = Object.values(this.app.storage.taskLists)[0];
          this.app.mainUI.showTaskList(taskList);
        }
        this.hide();
      });
    }
    else {
      this.deleteButton.style.display = "block";
    }
  }
  hideDeleteButton(){
    if(this.deleteButton !== undefined ){
      this.deleteButton.style.display = "none";
    }
  }
}
