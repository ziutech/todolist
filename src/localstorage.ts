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
      const task = JSON.parse(json!);
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
