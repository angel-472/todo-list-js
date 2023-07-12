export class Task {
  constructor(name){
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = "";
    this.date = undefined;
  }
}
