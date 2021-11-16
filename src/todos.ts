import Display from "./display";
import Storage from "./localstorage";

export class Task {
  name: string;
  importance: number;
  due: Date;
  constructor(name: string, importance: number = 0, due: string | Date) {
    this.name = name;
    if (importance < 0) this.importance = -1;
    else if (importance > 0) this.importance = 1;
    else this.importance = 0;
    this.due = new Date(due);
  }
  get date() {
    return this.due.toDateString();
  }
}

const Todos = (() => {
  const add = (name: string, importance: number, due: Date) => {
    const task = new Task(name, importance, due);
    Storage.add(task);
  };

  const remove = (task: Task) => {
    Storage.remove(task);
  };

  enum SortBy {
    Date,
    Name,
    Importance,
  }

  const sort = (tasks: Task[], by: SortBy = SortBy.Name): Task[] => {
    switch (by) {
      case SortBy.Name:
        return tasks.sort((a, b) => a.name.localeCompare(b.name));
      case SortBy.Date:
        return tasks.sort((a, b) => b.due.getTime() - a.due.getTime());
      case SortBy.Importance:
        return tasks.sort((a, b) => {
          if (a.importance > b.importance) return -1;
          else if (a.importance < b.importance) return 1;
          else return 0;
        });
    }
  };

  const filter = (
    tasks: Task[],
    {
      text,
      from,
      to,
      importance = [],
    }: {
      text?: string;
      from?: Date;
      to?: Date;
      importance?: number[];
    }
  ) => {
    console.clear();
    return tasks
      .filter((task) =>
        text !== undefined ? task.name.search(text) > -1 : true
      )
      .filter((task) => {
        if (from !== undefined && to !== undefined)
          return (
            from.getTime() <= task.due.getTime() &&
            task.due.getTime() <= to.getTime()
          );
        else if (to !== undefined) return task.due.getTime() <= to.getTime();
        else if (from !== undefined)
          return from.getTime() <= task.due.getTime();
        else return true;
      })
      .filter((task) => {
        if (importance.length == 0) {
          return true;
        }
        console.log(task.importance);
        for (let i = 0; i < importance.length; i++) {
          if (importance[i] == task.importance) {
            return true;
          }
        }
        return false;
      });
  };

  const get = () => {
    const tasks: Task[] = sort(
      filter(Storage.read(), {
        text: "a",
        from: new Date("2021-2-12"),
      }),
      SortBy.Importance
    );
    // const tasks: Task[] = sort(Storage.read(), SortBy.Date);
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
