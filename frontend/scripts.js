const btnAdd = document.querySelector(".btn__add");
const element = document.querySelector(".tasks__list");

document.forms.newTask.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      Object.fromEntries(new FormData(document.forms.newTask))
    ),
  })
    .then(
      fetch("/todos")
        .then((res) => res.json())
        .then((data) => {
          element.innerHTML = "";
          
          data.forEach((data) => {
            const li = document.createElement("li");
            li.innerHTML = data.task;
            element.appendChild(li);
          });
        })
    )
    .catch((error) => {
      console.error(error);
    });
});
