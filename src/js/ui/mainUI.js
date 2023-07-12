export class MainUI {
  constructor(app){
    this.app = app;
  }
  init(){
    this.newTaskButton = document.getElementById("new-task");
    this.newTaskButton.addEventListener('click', () => {
      let task = this.app.storage.createNewTask("New Task");
      this.app.taskEditor.open(task);
    });
  }
}
