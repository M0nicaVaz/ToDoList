let submitBtn = document.getElementById("submit");
let form = document.getElementById("addForm");
let taskList = document.getElementById("taskList");
let resetBtn = document.getElementById("resetBtn");
let allTasks = [];

// event listeners to add task, remove task, clear list
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
taskList.addEventListener("click", checkTask);
resetBtn.addEventListener("click", resetList);

// add task to the list
function addTask(e) {
  e.preventDefault();

  // get input value
  let textInput = document.getElementById("task");
  // if input area is empty, creates a span requiring input - 2 sec duration
  if (textInput.value === "") {
    let newSpan = document.createElement("span");
    let spanTxt = document.createTextNode("Please insert task");
    newSpan.appendChild(spanTxt);
    form.insertAdjacentElement("afterbegin", newSpan);
    setTimeout(() => newSpan.remove(), 2000);
  } else {
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

    // transform input value into an object
    let todo = {
      task: document.getElementById("task").value,
    };
    // push tasks to array
    allTasks.push(todo);
    console.log(allTasks);
  }

  // clear input area
  textInput.value = "";
}

// remove a task from the list
function removeTask(e) {
  if (e.target.classList.contains("delete")) {
      let li = e.target.parentElement;
      taskList.removeChild(li);
  }
}

// check or uncheck task
function checkTask(e){
    let li = e.target.parentElement;
  if (e.target.checked == true){
    li.classList.add('isChecked')
  } else {
    li.classList.remove('isChecked')
  }
}

// remove all li from ul
function resetList() {
//   alert action cannot be undone
if (confirm("This action cannot be undone! Clear all tasks?")) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);}
}
  // clear array
  allTasks = [];
}
