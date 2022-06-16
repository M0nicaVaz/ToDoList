let submitBtn = document.getElementById('submit');
let form = document.getElementById('addForm');
let taskList = document.getElementById('taskList');
let resetBtn = document.getElementById('resetBtn');
let textInput = document.getElementById('task');

let allTasks = [];
// event listeners to add task, remove task, clear list
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
taskList.addEventListener('click', checkTask);
resetBtn.addEventListener('click', resetList);

window.addEventListener('load', loadTasks);
// add task to the list
function addTask(e) {
  e.preventDefault();
  // if input area is empty, creates a span requiring input / 2 sec duration
  if (textInput.value === '') {
    textInput.style.marginTop = '10px';
    let newSpan = document.createElement('span');
    let spanTxt = document.createTextNode('Por favor, digite uma tarefa!');
    newSpan.appendChild(spanTxt);
    form.insertAdjacentElement('afterbegin', newSpan);
    setTimeout(() => newSpan.remove(), 2000);
    setTimeout(() => (textInput.style.marginTop = '25px'), 2000);
    // limits li elements to 9
  } else if (allTasks.length < 9) {
    createList();
    saveTask();
  } else {
    let secondSpan = document.createElement('span');
    let secondSpanTxt = document.createTextNode(
      'Você alcançou o nosso limite de tarefas!'
    );
    secondSpan.appendChild(secondSpanTxt);
    form.insertAdjacentElement('afterbegin', secondSpan);
    setTimeout(() => secondSpan.remove(), 3000);
  }
  // clear input area
  textInput.value = '';
}
// create li element, checkbox and delete button
function createList() {
  let textInput = document.getElementById('task');
  //create  new li element
  let li = document.createElement('li');
  // add class
  li.className = 'tasks';
  // add text node with input value
  li.appendChild(document.createTextNode(textInput.value));
  // append li to ul
  taskList.appendChild(li);

  // create del button element
  let deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete';
  deleteBtn.appendChild(document.createTextNode(''));
  // deleteBtn.innerHTML = "<i class='far fa-trash-alt'></i>";
  li.appendChild(deleteBtn);

  let trashCan = document.createElement('i');
  trashCan.appendChild(document.createTextNode(''));
  trashCan.className = 'far fa-trash-alt';
  deleteBtn.appendChild(trashCan);

  // add checkbox to check tasks that are done
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checked';
  li.appendChild(checkbox);

  // show reset button
  resetBtn.style.display = 'block';
}
// create task object, push and send it to local storage
function saveTask() {
  // push tasks to array
  allTasks.push({ task: textInput.value, done: false });

  // send array to local storage
  localStorage.setItem('description', JSON.stringify(allTasks));
}

// load storaged tasks
function loadTasks() {
  if (JSON.parse(localStorage.getItem('description')) !== null) {
    allTasks = JSON.parse(localStorage.getItem('description'));
    // console.log(allTasks);
  }
  // creates a new li element for each index of 'allTasks'

  for (i = 0; i < allTasks.length; i++) {
    let checked = '';
    let isChecked = '';

    if (allTasks[i].done) {
      checked = 'checked';
      isChecked = 'isChecked';
    }

    document.getElementById('taskList').innerHTML +=
      "<li class='tasks " +
      isChecked +
      "'>" +
      "<input type='checkbox' data-key='" +
      i +
      "' id='checkButton' class='checked' " +
      checked +
      ' >' +
      allTasks[i].task +
      "<button class='delete'>" +
      "<i class='far fa-trash-alt'></i>" +
      '</button>' +
      '</li>';
  }

  if (allTasks.length > 0) {
    resetBtn.style.display = 'block';
  }
}
// remove tasks
function removeTask(e) {
  if (e.target.classList.contains('far')) {
    let li = e.target.parentElement.parentElement;
    taskList.removeChild(li);

    let index = li.innerText;
    allTasks.splice(allTasks.indexOf(index), 1);
  }
  localStorage.setItem('description', JSON.stringify(allTasks));
  if (allTasks.length < 1) {
    resetBtn.style.display = 'none';
  }
}
// check or uncheck task -- NEEDS LOCAL STORAGE IMPROVEMENT
// LOCAL STORAGE IMPROVEMENT DONE
function checkTask(e) {
  let li = e.target.parentElement;
  let id = e.target.dataset.key;
  console.log(id);
  console.log(allTasks);
  if (id >= 0) {
    if (e.target.checked == true) {
      li.classList.add('isChecked');
      allTasks[id].done = true;
    } else {
      li.classList.remove('isChecked');
      allTasks[id].done = false;
    }
    localStorage.setItem('description', JSON.stringify(allTasks));
  }
}
// remove all li from ul and clear local storage
function resetList() {
  //   alert action cannot be undone
  if (
    confirm('Essa ação não pode ser desfeita. Deseja excluir toda a lista?')
  ) {
    resetBtn.style.display = 'none';
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  // clear local storage
  localStorage.clear();
  // clear array
  allTasks = [];
}
