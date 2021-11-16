import Display from "./display";
import Storage from "./localstorage";

export class Task {
  name: string;
  importance: number;
  due: Date;
  constructor(name: string, importance: number = 0, due: string | Date) {
    this.name = name;
    this.importance = importance;
    this.due = new Date(due);
  }
  get date() {
    return this.due.toDateString();
  }
}

enum SortBy {
  Date,
  Name,
  Importance,
}

const Todos = (() => {
  const add = (name: string, importance: number, due: Date) => {
    const task = new Task(name, importance, due);
    Storage.add(task);
  };

  const remove = (task: Task) => {
    Storage.remove(task);
  };

  const sort = (tasks: Task[], by: SortBy = SortBy.Name): Task[] => {
    switch (by) {
      case SortBy.Name:
        tasks = tasks.sort((a, b) => {
          if (a.name > b.name) return -1;
          else if (a.name < b.name) return 1;
          else return 0;
        });
      case SortBy.Date:
        tasks = tasks.sort((a, b) => b.due.getTime() - a.due.getTime());
      case SortBy.Importance:
        tasks = tasks.sort((a, b) => {
          if (a.importance > b.importance) return -1;
          else if (a.importance < b.importance) return 1;
          else return 0;
        });
    }
    return tasks;
  };

  const get = () => {
    const tasks: Task[] = sort(Storage.read(), SortBy.Date);
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
