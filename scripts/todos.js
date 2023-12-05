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

onload = () => {
  addUsersToDrop();
};
