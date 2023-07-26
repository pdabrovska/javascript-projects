let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'make dinner',
  dueDate:'2022-12-22'
 }, {
  name:'wash dishes',
  dueDate: '2022-12-22'
 }];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const {name, dueDate}  = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="js-delete-todo-button">
      Delete</button>
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
}

document.querySelector('.js-add-todo-button').addEventListener('click', () =>{
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-dueDate-input');
  const dueDate = dateInputElement.value;

  if (name === '') {
    return alert(`Name can't be empty`);
  }
  
  todoList.push({
    name,
    dueDate
  });

  localStorage.setItem('todoList', JSON.stringify(todoList));
  
  inputElement.value = '';
  renderTodoList();
}