const cache = {
  data: [], // [{ task: string, priority: "low" | "medium" | "high", id: number }]
  id: 0 // id counter
};

const addTodo = ({ task, priority }) => {
  cache.id += 1;
  cache.data = [...cache.data, {
    id: cache.id,
    task,
    priority
  }];
  return cache.data;
};

const removeTodo = (todoId = 0) => {
  cache.data = cache.data.filter(({ id }) => {
    console.log(id, todoId);
    return id !== todoId;
  });
  console.log(todoId);
  console.log(cache.data);
  return cache.data;
}

const getTodos = () => cache.data;

module.exports = {
  getTodos,
  addTodo,
  removeTodo,
}