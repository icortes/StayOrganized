'use strict';

async function addUsersToDrop() {
  try {
    let response = await fetch('http://localhost:8083/api/users');
    let users = await response.json();
    if (response.ok) {
      users.forEach((user) => {
        document.getElementById('userSelect').appendChild(new Option(user.name, user.id));
        console.log(user.name);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function displayUserTodos() {
  document.getElementById('userSelect').addEventListener('change', async () => {
    try {
      let userId = document.getElementById('userSelect').value;
      let respose = await fetch(`http://localhost:8083/api/todos/byuser/${userId}`);
      let data = await respose.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
}

onload = () => {
  addUsersToDrop();
  displayUserTodos();
};
