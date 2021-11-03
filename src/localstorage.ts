import { Task } from "./todos";

function addToLocalStorage(item: Task) {
  localStorage.setItem(item.name, JSON.stringify(item));
}

export { addToLocalStorage };
