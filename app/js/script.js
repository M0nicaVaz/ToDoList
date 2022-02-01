let submitBtn = document.getElementById("submit");
let form = document.getElementById("addForm");
let taskList = document.getElementById("taskList");
let resetBtn = document.getElementById("resetBtn");
let textInput = document.getElementById("task");
let allTasks = [];
// event listeners to add task, remove task, clear list
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
taskList.addEventListener("click", checkTask);
resetBtn.addEventListener("click", resetList);
window.addEventListener("load", loadTasks);
// add task to the list
function addTask(e) {
  e.preventDefault();
  // if input area is empty, creates a span requiring input / 2 sec duration
  if (textInput.value === "") {
    let newSpan = document.createElement("span");
    let spanTxt = document.createTextNode("Please insert task");
    newSpan.appendChild(spanTxt);
    form.insertAdjacentElement("afterbegin", newSpan);
    setTimeout(() => newSpan.remove(), 2000);
  } else {
    createList();
    saveTask();
  }
  // clear input area
  textInput.value = "";
}
// create li element, checkbox and delete button
function createList() {
  let textInput = document.getElementById("task");
  //create  new li element
  let li = document.createElement("li");
  // add class
  li.className = "tasks";
  // add text node with input value
  li.appendChild(document.createTextNode(textInput.value));
  // append li to ul
  taskList.appendChild(li);

  // create del button element
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.appendChild(document.createTextNode(""));
  li.appendChild(deleteBtn);

  // add checkbox to check tasks that are done
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checked";
  li.appendChild(checkbox);

  // show reset button
  resetBtn.style.display = "block";
}
// create task object, push and storage
function saveTask() {
  // push tasks to array
  allTasks.push(textInput.value);

  // send array to local storage
  localStorage.setItem("description", JSON.stringify(allTasks));
}
// load storaged tasks
function loadTasks() {
  if (JSON.parse(localStorage.getItem("description")) !== null) {
    allTasks = JSON.parse(localStorage.getItem("description"));  
   }
  // creates a new li element for each index of 'allTasks'
  for (i = 0; i < allTasks.length; i++) {
    document.getElementById("taskList").innerHTML +=
      "<li class='tasks'>" +
      "<input type='checkbox' class='checked'>" +
      allTasks[i] +
      "<button class='delete'></button>" +
      "</li>";
  }
  if (allTasks.length > 0) {
    resetBtn.style.display = "block";
  } 
}
// remove tasks
function removeTask(e) {
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentElement;
    taskList.removeChild(li);

    let index = li.innerText;
    allTasks.splice(allTasks.indexOf(index), 1);
  }
  localStorage.setItem("description", JSON.stringify(allTasks));
  if (allTasks.length < 1) {
    resetBtn.style.display = "none";
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
  if (
    confirm("Essa ação não pode ser desfeita. Deseja excluir toda a lista?")
  ) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  // clear local storage
  localStorage.clear();
  // clear array
  allTasks = [];
  resetBtn.style.display = "none";
}