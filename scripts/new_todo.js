'use strict';

async function addUsersToDrop() {
  try {
    let response = await fetch('http://localhost:8083/api/users');
    let users = await response.json();
    if (response.ok) {
      users.forEach((user) => {
        document.getElementById('names').appendChild(new Option(user.name, user.id));
        console.log('User:', user.name);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function addCategoriesToDrop() {
  try {
    let response = await fetch('http://localhost:8083/api/categories');
    let categories = await response.json();
    if (response.ok) {
      categories.forEach((category) => {
        document
          .getElementById('categories')
          .appendChild(new Option(category.name, category.id));
        console.log('Category:', category.name);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function makeNewTodo() {
  document.getElementById('newTaskForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const userid = document.getElementById('names').value;
      const category = document.getElementById('categories').value;
      const description = document.getElementById('task').value.trim();
      const deadline = document.getElementById('deadline').value.trim().replace(/-/g, '/');
      const priority = document.getElementById('priority').value;
      let response = await fetch('http://localhost:8083/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid, category, description, deadline, priority }),
      });
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
}

onload = () => {
  addUsersToDrop();
  addCategoriesToDrop();
  makeNewTodo();
};
