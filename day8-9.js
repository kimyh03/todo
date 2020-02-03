const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const pendingList = document.querySelector(".pending__list");
const finishedList = document.querySelector(".finished__list");

const PENDING_TASKS_LS = "pending tasks";
const FINISHED_TASKS_LS = "finished tasks";

let pendingTasks = [];
let finishedTasks = [];

function savePendingTasks() {
  localStorage.setItem(PENDING_TASKS_LS, JSON.stringify(pendingTasks));
}
function saveFinishedTasks() {
  localStorage.setItem(FINISHED_TASKS_LS, JSON.stringify(finishedTasks));
}

function deletePendingTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanPendingTasks = pendingTasks.filter(function(task) {
    return task.id !== parseInt(li.id);
  });
  pendingTasks = cleanPendingTasks;
  savePendingTasks();
}

function deleteFinishedTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinishedTasks = finishedTasks.filter(function(task) {
    return task.id !== parseInt(li.id);
  });
  finishedTasks = cleanFinishedTasks;
  saveFinishedTasks();
}

function paintPendingTasks(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const newId = pendingTasks.length + 1;
  const newClassName = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deletePendingTask);
  checkBtn.innerText = "✔️";
  checkBtn.addEventListener("click", handlePendingSwitch);
  span.innerText = text;
  li.id = newId;
  li.className = newClassName;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  pendingList.appendChild(li);
  const pendingTaskObj = {
    text: text,
    id: newId
  };
  pendingTasks.push(pendingTaskObj);
  savePendingTasks();
}

function paintFinishedTasks(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const newId = finishedTasks.length + 1;
  const newClassName = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteFinishedTask);
  backBtn.innerText = "↩";
  backBtn.addEventListener("click", handleFinishedSwitch);
  span.innerText = text;
  li.id = newId;
  li.className = newClassName;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  finishedList.appendChild(li);
  const finishedTaskObj = {
    text: text,
    id: newId
  };
  finishedTasks.push(finishedTaskObj);
  saveFinishedTasks();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintPendingTasks(currentValue);
  input.value = " ";
}

function handlePendingSwitch(event) {
  deletePendingTask(event);
  paintFinishedTasks(event.target.parentNode.className);
}

function handleFinishedSwitch(event) {
  deleteFinishedTask(event);
  paintPendingTasks(event.target.parentNode.className);
}

function loadPendingTasks() {
  const loadedPendingTasks = localStorage.getItem(PENDING_TASKS_LS);
  if (loadedPendingTasks !== null) {
    const parsedTasks = JSON.parse(loadedPendingTasks);
    parsedTasks.forEach(function(task) {
      paintPendingTasks(task.text);
    });
  }
}
function loadFinishedTasks() {
  const loadedFinishedTasks = localStorage.getItem(FINISHED_TASKS_LS);
  if (loadedFinishedTasks !== null) {
    const parsedTasks = JSON.parse(loadedFinishedTasks);
    parsedTasks.forEach(function(task) {
      paintFinishedTasks(task.text);
    });
  }
}

function init() {
  loadPendingTasks();
  loadFinishedTasks();
  form.addEventListener("submit", handleSubmit);
}

init();
