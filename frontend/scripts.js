// const btnAdd = document.querySelector('btn__add"');

// btnAdd.addEventListener('click', () => {

// })

document.forms.newTask.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/todo', {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    }).then(v => {
        console.log(v);
    }).catch(error => {
        console.error(error);
    })
    // console.log(data.forEach((v, i) => console.log(v, i)));
});


//preventDefault 
