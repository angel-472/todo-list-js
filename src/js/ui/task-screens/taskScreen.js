export class TaskScreen {
  constructor(app){
    this.app = app;
  }
  getHtml(){
    return 'this is a tasks screen!';
  }
  init(){
    this.tasksContainer = document.getElementById("tasks-container");
  }
}
