// "use-strict";

const taskTextBox = document.getElementById("taskTextBox");
const prioritySelection = document.getElementById("prioritySelection");
const dateBox = document.getElementById("dateBox");
const todoUL = document.getElementById("todoUL");
const completedUL = document.getElementById("completedUL");
const taskAddButton = document.getElementById("taskAddButton");

taskAddButton.addEventListener("click", function () {
  const title = taskTextBox.value;
  const priority =
    prioritySelection.options[prioritySelection.selectedIndex].text;
  const date = new Date().toJSON().slice(0, 10);

  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      priority: priority,
      dateCreated: date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        getAllTasks((todos) => {
          displayTasks(todos);
        });
      }
    });
});

function getAllTasks(completion) {
  fetch("http://localhost:3000/todos")
    .then((response) => response.json())
    .then((results) => {
      completion(results);
    });
}

function displayTasks(todos) {
  console.log([todos]);
  const taskItems = todos.map((todo) => {
    return `<li id="taskCheckList"><input type="checkbox" id="taskMarker" name="taskMarker" value = "true" onchange="selectCheckBox()">
    <label for="taskMarker">Task: ${todo.title} - Priority: ${todo.priority} - Created on: ${todo.date}</label></li>
   `;
  });
  todoUL.innerHTML = taskItems.join("");
  taskTextBox.value = "";
}

getAllTasks((todos) => {
  displayTasks(todos);
});

function selectCheckBox(e) {
  const taskCheckList = document.getElementById("taskCheckList");
  const taskMarker = document.getElementById("taskMarker");

  if (taskMarker.checked) {
    console.log(taskMarker.checked);
    completedUL.appendChild(taskCheckList);
  }
  if (taskMarker.checked === false) {
    console.log(taskMarker.checked);
    console.log("its unchecked");
    todoUL.appendChild(taskCheckList);
  }
}
