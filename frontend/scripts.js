const btnAdd = document.querySelector(".btn__add");
const tasksList = document.querySelector(".tasks__list");
const inputTask = document.querySelector(".input__task");

const stringToHTML = (str) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(str, 'text/html');
		console.log(doc.body.)
		return doc.body;
	}

const handleError = (error) => {
	console.error(error)
};

const deleteData = (data) => {
  console.log(data);
  fetch(`/todo/${data}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getData).catch(handleError)
};

const postData = (body) => {
	fetch("/todo", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	  })
		.then((res) => res.json())
		.then(showData)
		.catch(handleError)
};

const getData = () => {
  fetch("/todos")
	.then((res) => res.json())
	.then(showData)
	.catch(handleError)
};


const showData = (data) => {
  tasksList.innerHTML = "";
  inputTask.value = ""
  data.forEach(({task, id }) => {
	const element = stringToHTML(`
	<li>
		<span>${task}</span>
		<button>X</button>
	</li>
`);
    tasksList.appendChild(element.body).id = id;
    // tasksList.appendChild(element.btnDel).id = data.id;
    btnDel.addEventListener("click", () => {
      deleteData(btnDel.id);
    });
  });
};



document.forms.newTask.addEventListener("submit", (e) => {
	e.preventDefault();
	const body = Object.fromEntries(new FormData(e.target));
	const request = postData(body);
	request.then(showData);
});

 getData().then(showData)