const btnAdd = document.querySelector(".btn__add");
const tasksList = document.querySelector(".tasksList__list");
const inputTask = document.querySelector(".formTask__input");
const handleError = (error) => {
  console.error(error);
};
const deleteData = (id = -1) =>
  fetch(`/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch(handleError);
const postData = (body) =>
  fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch(handleError);
const getData = () =>
  fetch("/todos")
    .then((res) => res.json())
    .catch(handleError);
const getHTMLElement = (str) => {
  const parser = new DOMParser();
  const childNodes = parser.parseFromString(str, "text/html").body.childNodes;
  return childNodes.length > 0 ? childNodes[0] : document.createElement("div");
};
const taskComponent = (({ task, priority, id, onDelete }) => {
    const element = getHTMLElement(`
        <li>
            <span>${task}</span>
            <button class='delete_btn'><i class="fas fa-trash-alt"></i></button>
        </li>
    `);
    const deleteButton = element.querySelector("button");
    const elementClass = element.classList;
    // PRIORITIES CLASS
    switch (priority) {
        case "low":
            elementClass.add("low__priority");
            break;
        case "medium":
            elementClass.add("medium__priority");
            break;
        case "high":
            elementClass.add("high__priority");
            break;
        default:
            break;
    }
    deleteButton.addEventListener("click", () => onDelete(id));
    return element;
});
const showTasks = (task) => {
    tasksList.innerHTML = "";
    inputTask.value = "";
    task.forEach(task => {
        const onTaskDelete = (id) => {
            deleteData(id).then(showTasks);
        };
        const element = taskComponent({ 
            ...task,
            onDelete: onTaskDelete,
        });
        tasksList.appendChild(element);
    });
};
document.forms.newTask.addEventListener("submit", (e) => {
  e.preventDefault();
  const body = Object.fromEntries(new FormData(e.target));
  const request = postData(body);
  request.then(showTasks);
});
getData().then(showTasks);