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
      document.getElementById('tasks').innerHTML = '';
      let userId = document.getElementById('userSelect').value;
      let respose = await fetch(`http://localhost:8083/api/todos/byuser/${userId}`);
      let data = await respose.json();
      console.log(data);
      data.forEach(
        (task) => (document.getElementById('tasks').innerHTML += createTask(task))
      );
    } catch (error) {
      console.log(error);
    }
  });
}

function createTask(task) {
  const deadline = new Date(task.deadline);
  const formattedDeadline = deadline.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return `<div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <p class="card-text">Category: ${task.category}</p>
                  <p class="card-text">Priority: ${task.priority}</p>
                </div>
                <p class="card-text h5">${task.description}</p>
              </div>
              <div class="card-footer d-flex justify-content-between text-body-secondary">
                <p class="m-0">Deadline: ${formattedDeadline}</p>
                <p class="m-0">Completed: ${task.completed ? '✔️' : '❌'}</p>
              </div>
            </div>
          </div>`;
}

onload = () => {
  addUsersToDrop();
  displayUserTodos();
};
