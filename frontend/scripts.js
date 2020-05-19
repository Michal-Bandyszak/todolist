// import { text } from "body-parser";

const btnAdd = document.querySelector(".btn__add");
const tasksList = document.querySelector(".tasks__list");
const inputTask = document.querySelector(".input__task");

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

const showData = (task) => {
  tasksList.innerHTML = "";
  inputTask.value = "";

  task.forEach(({ task, priority, id }) => {
    const element = getHTMLElement(`
            <li>
                <span>${task}</span>
                <button class='delete_btn'>X</button>
            </li>
		`);

    /// PRIORITIES CLASS
    const elementClass = element.classList;
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
        elementClass.add("normal__priority");
    }

    const deleteButton = element.querySelector("button");
    deleteButton.addEventListener("click", () => {
      deleteData(`${id}`);
    });
    tasksList.appendChild(element);
  });
};

document.forms.newTask.addEventListener("submit", (e) => {
  e.preventDefault();
  const body = Object.fromEntries(new FormData(e.target));
  const request = postData(body);
  request.then(showData);
});

getData().then(showData);
