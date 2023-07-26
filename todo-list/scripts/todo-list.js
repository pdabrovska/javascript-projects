let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'make dinner',
  dueDate:'2022-12-22',
  status: 'todo'
 }, {
  name:'wash dishes',
  dueDate: '2022-12-22',
  status: 'todo'
 }];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const {name, dueDate, status}  = todoObject;
    const html = `
      <div class="js-info-todo">${name}</div>
      <div class="js-info-todo">${dueDate}</div>
      <button class="js-delete-todo-button">
      Delete</button>
      <button class="js-todo-status-button status-button">${status}</button> 
    `;

    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index,1);
      localStorage.setItem('todoList', JSON.stringify(todoList));
        renderTodoList();
    });
  });

  document.querySelectorAll('.js-todo-status-button').forEach((statusButton, index) =>{
    statusButton.addEventListener('click', () =>{
      if (statusButton.innerHTML === ''){
        todoList[index].status = ' &#x2713';
      } else {
        todoList[index].status = '';
      }
      localStorage.setItem('todoList', JSON.stringify(todoList));
      renderTodoList();
    });
  });
 
}

document.querySelector('.js-add-todo-button').addEventListener('click', () =>{
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-dueDate-input');
  const dueDate = dateInputElement.value;
  const status = '';

  if (name === '') {
    return alert(`Name can't be empty`);
  }
  
  todoList.push({
    name,
    dueDate,
    status
  });

  localStorage.setItem('todoList', JSON.stringify(todoList));
  
  inputElement.value = '';
  renderTodoList();
}

