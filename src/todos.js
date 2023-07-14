/* eslint-disable no-use-before-define */
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const textInputField = document.querySelector('#text-input-feild');
  const addButton = document.querySelector('#add-button');
  const todosContainer = document.querySelector('.todos-container');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  // Initial rendering of existing todos
  todos.forEach(renderTodoItem);

  addButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (textInputField.value.trim().length === 0) {
      return;
    }

    const todoItem = {
      text: textInputField.value,
      completed: false,
      index: todos.length + 1,
    };

    todos.push(todoItem);
    saveTodosToLocalStorage();

    textInputField.value = '';

    renderTodoItem(todoItem);
  });

  function renderTodoItem(todoItem) {
    const todoItemContainer = document.createElement('div');
    todoItemContainer.classList.add('todo-item-container');
    const todoItemId = `todo-item-${todoItem.index}`;
    todoItemContainer.id = todoItemId;
    todosContainer.appendChild(todoItemContainer);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'todo-checkbox';
    checkbox.checked = todoItem.completed;
    todoItemContainer.prepend(checkbox);

    const todoText = document.createElement('p');
    todoText.id = 'todo-text';
    todoText.innerText = todoItem.text;
    todoItemContainer.appendChild(todoText);

    todoText.addEventListener('click', () => {
      todoText.contentEditable = true;
      todoText.focus();
    });

    todoText.addEventListener('blur', () => {
      todoText.contentEditable = false;
      todoItem.text = todoText.innerText;
      saveTodosToLocalStorage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-button';
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash');
    deleteButton.appendChild(deleteIcon);
    todoItemContainer.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
      const parent = deleteButton.parentElement;
      parent.parentElement.removeChild(parent);
      removeHorizontalLine(todoItemId);
      todos = todos.filter((item) => item.index !== todoItem.index);
      saveTodosToLocalStorage();
    });

    const hr = document.createElement('hr');
    hr.id = `${todoItemId}-hr`;
    todosContainer.appendChild(hr);
  }

  function removeHorizontalLine(todoItemId) {
    const hrId = `${todoItemId}-hr`;
    const horizontalLine = document.getElementById(hrId);
    if (horizontalLine) {
      horizontalLine.parentElement.removeChild(horizontalLine);
    }
  }

  const clearButton = document.querySelector('.clearer');

  clearButton.addEventListener('click', () => {
    const completedItems = document.querySelectorAll('.todo-item-container input[type="checkbox"]:checked');
    completedItems.forEach((item) => {
      const parent = item.parentElement;
      parent.parentElement.removeChild(parent);
      const todoItemId = parent.id;
      removeHorizontalLine(todoItemId);
      todos = todos.filter((todo) => todo.index !== parseInt(parent.id.split('-')[2], 10));
      saveTodosToLocalStorage();
    });
  });

  function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function refreshIt() {
    const refreshIcon = document.querySelector('.refresh-it');
    refreshIcon.addEventListener('click', () => {
      todos = [];
      todosContainer.innerHTML = '';
      localStorage.removeItem('todos');
    });
  }

  refreshIt();
});
