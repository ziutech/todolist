import { addToLocalStorage } from "./localstorage";

export class Task {
  name: string;
  importance: number;
  due: Date;
  constructor(name: string, importance: number, due: Date) {
    this.name = name;
    this.importance = importance;
    this.due = due;
  }
}

const Todos = (() => {
  let list: Task[] = [];
  const addTask = (name: string, importance: number, due: Date) => {
    const task = new Task(name, importance, due);
    list.push(task);
    addToLocalStorage(task);
  };
  const getTasks = () => {
    return list;
  };
  return { addTask, getTasks };
})();

export default Todos;
