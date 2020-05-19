const btnAdd = document.querySelector(".btn__add");
const element = document.querySelector(".tasks__list");
const input_task = document.querySelector(".input__task");

const handleError = (error) => {
	console.error(error)
};

const deleteData = (data) => {
  fetch(`/todo/${data}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getData);
};

// const showData = (data) => {
//   element.innerHTML = "";
//   data.forEach((data) => {
//     const li = document.createElement("li");
//     const btnDel = document.createElement("button");
//     li.innerHTML = data.task;
//     btnDel.innerText = "X";
//     element.appendChild(li).id = data.id;
//     element.appendChild(btnDel).id = data.id;
//     input_task.value = "";
//     btnDel.addEventListener("click", () => {
//       deleteData(btnDel.id);
//     });
//   });
// };

const getData = () => {
  fetch("/todos")
    .then((res) => res.json())
    .then(showData)
    .catch(handleError);
};



const postData = (body) => (
    fetch("/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .catch(handleError)
);

document.forms.newTask.addEventListener("submit", (e) => {
	e.preventDefault();
	const body = Object.fromEntries(new FormData(e.target));
	const request = postData(body);
	request.then(showData);
});
