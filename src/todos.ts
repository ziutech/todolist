import Display from "./display";
import Storage from "./localstorage";

export class Task {
  name: string;
  private importance: number;
  private due?: Date;
  constructor(name: string, importance: number, due?: Date) {
    this.name = name;
    this.importance = importance;
    this.due = due;
  }
  get date(): string {
    const date = this.due?.toDateString() as string;
    return date;
  }
}

const Todos = (() => {
  const add = (name: string, importance: number, due?: Date) => {
    const task = new Task(name, importance, due);
    Storage.add(task);
  };
  const remove = (task: Task) => {
    Storage.remove(task);
  };
  const get = () => {
    const tasks: Task[] = Storage.read();
    return tasks;
  };
  const update = () => {
    Display.show(get());
  };
  const clear = () => {
    Storage.clear();
  };
  return {
    add,
    remove,
    get,
    update,
    clear,
  };
})();

export default Todos;
// export default class Todos {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//   add(name: string, importance: number, due: Date) {
//     const task = new Task(name, importance, due);
//     Storage.add(task);
//   }
//   remove(task: Task) {
//     Storage.remove(task);
//   }
//   update() {
//     const tasks: Task[] = Storage.read();
//     Display.show(tasks, this.name);
//   }
// }
