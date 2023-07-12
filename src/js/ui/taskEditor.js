export class TaskEditor {
  constructor(app){
    this.app = app;
  }
  init(){
    this.editorElement = document.getElementById("task-editor");
  }
  open(task){
    this.currentTask = task;
    this.show();
  }
  show(){
    this.editorElement.style.display = 'flex';
  }
  hide(){
    this.editorElement.style.display = 'none';
  }
  reset(){

  }
}