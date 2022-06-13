// "use-strict";

const taskTextBox = document.getElementById("taskTextBox");
const priorityBox = document.getElementById("priorityTextBox");
const dateBox = document.getElementById("dateBox");
const todoUL = document.getElementById("todoUL");
const completedUL = document.getElementById("completedUL");
const taskAddButton = document.getElementById("taskAddButton");

taskAddButton.addEventListener("click", function () {
  const task = taskTextBox.value;
  const priority = priorityBox.value;
  const date = dateBox.value;

  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Title: title,
      priority: priority,
      date: dateCreated,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.succes) {
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
  // let toDos = todos[index];
  // let toDos = todos.length;
  // for (index = 0; index < toDos; index++) {
  //   console.log(todos[index].title);
  //   console.log(todos[index].date);
  //   todoUL.innerHTML = `<li>Task: ${todos[index].title} - Priority: ${todos[index].priority} - Created on: ${todos[index].date}`;

  const taskItems = todos.map((todo) => {
    return `<li>Task: ${todo.title} - Priority: ${todo.priority} - Created on: ${todo.date}`;
  });
  todoUL.innerHTML = taskItems.join("");
}

getAllTasks((todos) => {
  displayTasks(todos);
});

// if (text.length == 0) {
//   console.log("there is nothing there");
//   return;
// } else {
//   console.log(this); // add Button

//   // create the div element
//   let taskItemDiv = document.createElement("div");
//   // create checkbox
//   let chk = document.createElement("input");
//   // set attribute to checkbox
//   chk.setAttribute("type", "checkbox");

//   // create label
//   let label = document.createElement("label");
//   label.innerHTML = text;

//   // create button and remove button
//   let removeButton = document.createElement("button");
//   removeButton.innerHTML = "Remove";
//   removeButton.addEventListener("click", function () {
//     removeButton.remove();
//     label.remove();
//     chk.remove();
//     console.log(this); // remove button
//     console.log("REMOVE BUTTON CLICKED");
//   });

//   // add checkbox to div
//   taskItemDiv.appendChild(chk);
//   taskItemDiv.appendChild(label);
//   taskItemDiv.appendChild(removeButton);

//   // conditions for checkbox
//   chk.addEventListener("change", function () {
//     if (this.checked) {
//       console.log("its checked");
//       completedUL.appendChild(taskItemDiv);
//     } else if (!this.checked) {
//       console.log("its unchecked");
//       todoUL.appendChild(taskItemDiv);
//     }
//   });
//   // add div to ul
//   todoUL.appendChild(taskItemDiv);

//   taskTextBox.value = "";
// }
