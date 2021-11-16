import { Task } from "./todos";

const Display = (() => {
  const show = (list: Task[]) => {
    const obj = document.querySelector(".todolist");
    for (let task of list) {
      obj?.appendChild(createTaskElement(task));
    }
  };

  const createTaskElement = (task: Task): HTMLDivElement => {
    const el = document.createElement("div");
    el.classList.add("task");

    const h3 = document.createElement("h3");
    h3.textContent = task.name;
    el.appendChild(h3);

    const date = document.createElement("div");
    date.textContent = task.date;
    el.appendChild(date);

    const importance = document.createElement("div");
    importance.textContent = task.importance.toLocaleString();
    el.appendChild(importance);
    return el;
  };
  return { show };
})();

export default Display;
