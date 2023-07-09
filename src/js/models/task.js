export class Task {
  constructor(list, name){
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = "";
    this.date = undefined;
  }
}
