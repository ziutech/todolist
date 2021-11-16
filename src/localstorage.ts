import { Task } from "./todos";

const Storage = (() => {
  const add = (item: Task) => {
    localStorage.setItem(item.name, JSON.stringify(item));
  };

  const remove = (item: Task) => {
    localStorage.removeItem(item.name);
  };

  const read = (): Task[] => {
    const list: Task[] = [];
    if (localStorage.length == 0) return [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const json = localStorage.getItem(key!);
      const notParsed = JSON.parse(json!);
      const task: Task = new Task(
        notParsed.name,
        notParsed.importance,
        new Date(notParsed.due)
      );
      list.push(task);
    }
    return list;
  };

  const clear = () => {
    localStorage.clear();
  };

  return {
    remove,
    add,
    read,
    clear,
  };
})();

export default Storage;
