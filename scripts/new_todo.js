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

onload = () => {
  addUsersToDrop();
  addCategoriesToDrop();
};
