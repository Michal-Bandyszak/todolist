const btnAdd = document.querySelector(".btn__add");
const element = document.querySelector(".tasks__list");

const showData = (data) => {
	element.innerHTML = "";
	data.forEach((data) => {
		const li = document.createElement("li");
		const btnDel = document.createElement("button");
		li.innerHTML = data.task;
		btnDel.innerText = "X";
		element.appendChild(li);
		element.appendChild(btnDel);
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
