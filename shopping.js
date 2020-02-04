const input = document.querySelector('#input');
const ulList = document.querySelector('.list-group');

let todoList = [];

// done.addEventListener('click', (e) => {
//   console.log(e.target);

// })
input.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.keyCode === 13) && input.value !== '') {
    todoList.unshift({
      content: input.value,
      done: false,
      selected: false
    })
    input.value = '';
    upgradeview();
  }
})


function upgradeview() {
  ulList.innerHTML = '';
  for (let index = 0; index < todoList.length; index++) {
    const todoitem = todoList[index];




    const liElement = document.createElement('li');
    liElement.className = 'list-group-item d-flex justify-content-between';
    ulList.append(liElement);


    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.className = 'task-check';
    liElement.append(checkboxElement);
    checkboxElement.checked = todoitem.selected;

    checkboxElement.addEventListener('change', () => {
      todoitem.selected = checkboxElement.checked;

    })

    const taskElement = document.createElement('span');
    taskElement.className = 'task-span';
    if (todoitem.done) {
      taskElement.className += ' todoDone'
    }
    liElement.append(taskElement);
    taskElement.innerText = todoitem.content;

    const divBtn = document.createElement('div');
    divBtn.className = 'btn-group';
    liElement.append(divBtn);

    if (!todoitem.done) {
      const btnDoneElement = document.createElement('button');
      btnDoneElement.type = 'button';
      btnDoneElement.className = 'btn btn-primary';
      btnDoneElement.innerText = 'Done'
      divBtn.append(btnDoneElement);

      btnDoneElement.addEventListener('click', () => {
        todoitem.done = !todoitem.done;
        upgradeview();

      })
    } else {


      const btnRemoveElement = document.createElement('button');
      btnRemoveElement.type = 'button';
      btnRemoveElement.className = 'btn btn-danger';
      btnRemoveElement.innerText = 'Remove';
      divBtn.append(btnRemoveElement);

      btnRemoveElement.addEventListener('click', () => {
        todoList = todoList.filter(todoitem => !todoitem.selected)
        upgradeview();
      });
    }



  }
}

document.querySelector('#doneAction').addEventListener('click', () => {

  for (const key of todoList) {
    console.log(key);
    if (key.selected) {
      key.done = true;
      key.selected = false;

    }
    upgradeview();
  }


});


document.querySelector('#restoreAction').addEventListener('click', () => {
  for (const key of todoList) {
    if (key.selected) {
      key.done = false;
      key.selected = false;
    }
    upgradeview();
  }

});
document.querySelector('#removeAction').addEventListener('click', () => {
  todoList = todoList.filter(todoitem => !todoitem.selected)
  upgradeview();
});

document.querySelector('#allAction').addEventListener('click', () => {
  for (const key of todoList) {
    key.selected = true;
  }
  upgradeview();
})