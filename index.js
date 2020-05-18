const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const todos = require('./todos');

app.use(express.static('frontend'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

// Return list of todos:
// [ { task: string, priority: "low" | "medium" | "high", id: number }]
app.get('/todos', function (req, res) {
  res.send(todos.getTodos());
});

// POST todo.
// Body: { task: string, priority: "low" | "medium" | "high" }
app.post('/todo', function (req, res) {
  const { task, priority } = req.body;
  const data = todos.addTodo({ task, priority });
  res.send(data);
});

// DELETE todo
// Id as query parameter
app.delete('/todo/:id', function (req, res) {
  const { id } = req.params;
  const data = todos.removeTodo(+id);
  res.send(data);
});

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});