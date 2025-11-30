let tasks = [];

function login() {
  const username = document.getElementById('username').value.trim();
  if(username === "") {
    alert("Please enter your name");
    return;
  }
  document.getElementById('user-display').innerText = username;
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('task-section').style.display = 'block';
}

function addTask() {
  const member = document.getElementById('task-member').value;
  const type = document.getElementById('task-type').value;
  const hours = parseFloat(document.getElementById('task-hours').value);

  if(member === "" || type === "" || isNaN(hours) || hours <= 0) {
    alert("Please fill all fields correctly");
    return;
  }

  const task = { member, type, hours };
  tasks.push(task);
  displayTasks();
  updateChart();
}

function displayTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${task.member} - ${task.type} : ${task.hours} hrs 
      <button onclick="deleteTask(${index})">Done</button>`;
    list.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
  updateChart();
}

function updateChart() {
  const ctx = document.getElementById('taskChart').getContext('2d');
  const members = {};
  tasks.forEach(task => {
    if(members[task.member]) {
      members[task.member] += task.hours;
    } else {
      members[task.member] = task.hours;
    }
  });

  const labels = Object.keys(members);
  const data = Object.values(members);

  if(window.taskChartInstance) {
    window.taskChartInstance.destroy();
  }

  window.taskChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Hours per Member',
        data: data,
        backgroundColor: ['#4a90e2', '#50e3c2', '#f5a623', '#e94e77']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
