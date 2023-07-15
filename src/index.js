/* eslint-disable no-use-before-define */
import './style.css';
import { updateStatus, clearCompleted } from '../modules/todosStatus.js';

document.addEventListener('DOMContentLoaded', () => {
  const textInputField = document.querySelector('#text-input-field');
  const addButton = document.querySelector('#add-button');
  const todosContainer = document.querySelector('.todos-container');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

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

      todos.forEach((item, index) => {
        item.index = index + 1;
        const itemId = `todo-item-${item.index}`;
        const todoItemContainer = document.getElementById(itemId);
        if (todoItemContainer) {
          const todoText = todoItemContainer.querySelector('#todo-text');
          const hrId = `${itemId}-hr`;
          const horizontalLine = document.getElementById(hrId);
          todoItemContainer.id = `todo-item-${item.index}`;
          todoText.id = 'todo-text';
          horizontalLine.id = `${itemId}-hr`;
        }
      });

      saveTodosToLocalStorage();
    });

    checkbox.addEventListener('change', () => {
      todoItem.completed = checkbox.checked;
      updateStatus(todoItem.index, checkbox.checked);
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
    todos = clearCompleted(todos);

    todosContainer.innerHTML = '';
    todos.forEach((todoItem, index) => {
      todoItem.index = index + 1;
      renderTodoItem(todoItem);
    });

    saveTodosToLocalStorage();
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
