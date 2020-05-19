const btnAdd = document.querySelector(".btn__add");
const element = document.querySelector(".tasks__list");
const input_task = document.querySelector(".input__task")

// const deleteData = (data) => {
// 	fetch(`/todos/${data.id}`, {
// 		method: "DELETE",
// 		headers: {
// 			"Content-Type": "application/json",
// 		}
// 	}
// )}

const showData = (data) => {
	element.innerHTML = "";
	data.forEach((data) => {
		const li = document.createElement("li");
		const btnDel = document.createElement("button");
		li.innerHTML = data.task;
		btnDel.innerText = "X";
		element.appendChild(li).id = data.id;
		element.appendChild(btnDel).id = data.id;
		input_task.value = ""
		btnDel.addEventListener("click", fetch(`/todos/${li.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				}
			}
			)
		)
		
		console.log(btnDel.id)
	});
}


fetch('/todos')
	.then((res) => res.json())
	.then(showData)
	.catch(error => console.error(error));

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
	.then((res) => res.json())
	.then(showData)
	.catch((error) => {
		console.error(error);
	});
});
