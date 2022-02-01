let submitBtn = document.getElementById("submit");
let form = document.getElementById("addForm");
let taskList = document.getElementById("taskList");
let resetBtn = document.getElementById("resetBtn");
let textInput = document.getElementById("task");

// event listeners to add task, remove task, clear list
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
taskList.addEventListener("click", checkTask);
resetBtn.addEventListener("click", resetList);
window.addEventListener("load", loadTasks);

let allTasks = [];

// add task to the list
function addTask(e) {
  e.preventDefault();
  // if input area is empty, creates a span requiring input - 2 sec duration
  if (textInput.value === "") {
    let newSpan = document.createElement("span");
    let spanTxt = document.createTextNode("Please insert task");
    newSpan.appendChild(spanTxt);
    form.insertAdjacentElement("afterbegin", newSpan);
    setTimeout(() => newSpan.remove(), 2000);
  } else {
    createList();
    newTask();
  }
  // clear input area
  textInput.value = "";
}

function createList() {
  let textInput = document.getElementById("task");
  //create  new li element
  let li = document.createElement("li");
  // add class
  li.className = "tasks";
  // add text node with input value
  li.appendChild(document.createTextNode(textInput.value));
  // create del button element
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.appendChild(document.createTextNode("X"));
  li.appendChild(deleteBtn);

  // append li to ul
  taskList.appendChild(li);

  // add checkbox to check tasks that are done
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checked";
  li.appendChild(checkbox);

  // show reset button
  resetBtn.style.display = "block";
}
// create task object, push and storage
function newTask() {
  // transform input value into an object
  let todo = document.getElementById("task").value;
  // push tasks to array
  allTasks.push(todo);

  // send array to local storage
  localStorage.setItem("description", JSON.stringify(allTasks));
  console.log(allTasks);
}

// load storaged tasks
function loadTasks() {
  if (JSON.parse(localStorage.getItem("description")) !== null) {
    allTasks = JSON.parse(localStorage.getItem("description"));
  }
  console.log(allTasks);

  // creates a new li element for each i of allTasks
  for (var i = 0; i < allTasks.length; i++) {
    document.getElementById("taskList").innerHTML +=
      "<li class='tasks'>" +
      "<input type='checkbox' class='checked'>" +
      allTasks[i] +
      "<button class='delete'>X</button>" +
      "</li>";
  }
  resetBtn.style.display = "block";
}

// remove a task from the list -- NEEDS LOCAL STORAGE IMPROVEMENT
// check array.splice - localStorage.removeItem
function removeTask(e) {
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentElement;
    taskList.removeChild(li);
  }
}

// check or uncheck task -- NEEDS LOCAL STORAGE IMPROVEMENT
function checkTask(e) {
  let li = e.target.parentElement;
  if (e.target.checked == true) {
    li.classList.add("isChecked");
  } else {
    li.classList.remove("isChecked");
  }
}

// remove all li from ul
function resetList() {
  //   alert action cannot be undone
  if (confirm("This action cannot be undone! Clear all tasks?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  // clear local storage
  localStorage.clear();

  // clear array
  allTasks = [];
}