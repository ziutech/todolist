import Todos from "./todos";
if (module.hot) {
  module.hot.accept(function () {
    location.reload();
  });
}

Todos.add("Buy milk", 0);
console.log(Todos.get());

Todos.update();
