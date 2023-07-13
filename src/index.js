/* eslint-disable no-use-before-define */
import './style.css';

const textInputField = document.querySelector('#text-input-feild');
const addButton = document.querySelector('#add-button');
const todosContainer = document.querySelector('.todos-container');

const todos = [];

addButton.addEventListener('click', () => {
  if (textInputField.value.trim().length === '') {
    return;
  }

  // create todo item
  const todoItem = {
    text: textInputField.value,
    completed: false,
  };

  // add todo item to array
  todos.push(todoItem);

  // clear text input field
  textInputField.value = '';

  // render todo item
  renderTodoItem(todoItem);
});

function renderTodoItem(todoItem) {
  // create div add class todo-item-container
  const todoItemContainer = document.createElement('div');
  todoItemContainer.classList.add('todo-item-container');

  todosContainer.appendChild(todoItemContainer);

  // create checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'todo-checkbox';
  checkbox.checked = todoItem.completed;
  todoItemContainer.prepend(checkbox);

  // craete p element and Id = todo-text
  const todoText = document.createElement('p');
  todoText.Id = 'todo-text';
  todoText.innerText = todoItem.text;
  todoItemContainer.appendChild(todoText);

  // add double click to todo text
  todoText.addEventListener('dblclick', () => {
    todoItem.completed = !todoItem.completed;
    checkbox.checked = todoItem.completed;
  });

  // create button add id = edit = button
  const editButton = document.createElement('button');
  editButton.id = 'edit-button';
  // create fa-edit icon
  const editIcon = document.createElement('i');
  editIcon.classList.add('fas', 'fa-edit');
  editButton.appendChild(editIcon);
  todoItemContainer.appendChild(editButton);

  // add click event ti edit button here
  editButton.addEventListener('click', () => {
    textInputField.value = todoText.innerText;
    const parent = editButton.parentElement;
    parent.parentElement.removeChild(parent);
  });

  // create button add id = delete-button
  const deleteButton = document.createElement('button');
  deleteButton.id = 'delete-button';

  // create fa-trash icon
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas', 'fa-trash');
  deleteButton.appendChild(deleteIcon);
  todoItemContainer.appendChild(deleteButton);

  // add click event for deleteButton
  deleteButton.addEventListener('click', () => {
    const parent = deleteButton.parentElement;
    parent.parentElement.removeChild(parent);
  });
}

const clearButton = document.querySelector('.clearer');

clearButton.addEventListener('click', () => {
  const completedItems = document.querySelectorAll('.todo-item-container input[type="checkbox"]:checked');
  completedItems.forEach((item) => {
    const parent = item.parentElement;
    parent.parentElement.removeChild(parent);
  });
});