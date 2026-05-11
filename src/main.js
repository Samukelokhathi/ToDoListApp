// DOM Elements
const getElementById = (id) => document.getElementById(id);

const userInput = getElementById("input-field");
const taskList = getElementById("taskList");
const addTaskBtn = getElementById("add-task-btn");
const prioritySelect = getElementById("priority-select")

const querySelector = (selector) => document.querySelector(selector);

const allTask =  querySelector("#all-task span")
const activeTask = querySelector("#active-task span")
const completedTask = querySelector("#completed-task span")
const highPriorityTask = querySelector("#high-priority span")

let editingTaskId = null; 

// Initialization

function initializeApp(){
  window.addEventListener("load", () => {
    renderTasks(getTasksFromLocalStorage())
    updateCounts(); 
});
  setupListeners(); // makes sure all event listeners are set up when the app initializes
}


function setupListeners(){
  addTaskBtn.addEventListener("click", addTask);

  getElementById("search-btn").addEventListener("click", handleSearch);
  
  getElementById("all-task").addEventListener("click", () => {
    renderTasks(getTasksFromLocalStorage());
  });

  getElementById("active-task").addEventListener("click", () => {
    renderTasks(getTasksFromLocalStorage().filter(task => !task.completed));
  })

  getElementById("completed-task").addEventListener("click", () => {
    renderTasks(getTasksFromLocalStorage().filter(task => task.completed));
  })
  
  getElementById("high-priority").addEventListener("click", () => {
    renderTasks(getTasksFromLocalStorage().filter(task => task.priority === "high"));
  });

  } 

// Handlers

function handleSearch(){
  const searchTerm = document.getElementById("search-field").value.trim().toLowerCase();
  const filteredTasks = getTasksFromLocalStorage().filter(task => task.text.toLowerCase().includes(searchTerm)); 

  if (!filteredTasks.length) {
    alert("No tasks found matching your search.");
  
    return
  }
  renderTasks(filteredTasks); 
  

}

// Core functions

function checkIfTaskExists(taskContent, ignoreId = null){
  return getTasksFromLocalStorage().some(task => task.text.toLowerCase() === taskContent.toLowerCase() && task.id !== ignoreId);
}


function addTask(){
  const taskContent = userInput.value.trim();
  const selectedPriority = prioritySelect.value;

  if(taskContent == "") return alert("Please enter task!");

  if(editingTaskId !== null) return editTask(taskContent, selectedPriority); 

  if(checkIfTaskExists(taskContent)){ 
    alert("Task already exists!");
    userInput.value = "";
    return;
  } 

  const task = {id: Date.now(), text: taskContent, completed: false, priority: selectedPriority };
  addTaskElement(task);
  saveTaskToLocalStorage(task);
  userInput.value = "";
  updateCounts();
}


function editTask(newTaskContent, newPriority){
   if(checkIfTaskExists(newTaskContent, editingTaskId)){ 
    alert("Task already exists!");
    userInput.value = "";
    return;
  }
  
  const taskElement = document.querySelector(`li[data-id="${editingTaskId}"]`); 
  taskElement.querySelector('span').textContent = newTaskContent;

  const priorityBadge = taskElement.querySelector('.priority');
  priorityBadge.textContent = newPriority;
  priorityBadge.className = `priority priority-${newPriority}`; // Check on this 


  updateTaskInLocalStorage(editingTaskId, newTaskContent, newPriority);
  editingTaskId = null;
  
  addTaskBtn.textContent = "Add Task";
  userInput.value = "";
  updateCounts();
}

// Rendering 
const createElement = (element) => {document.createElement(element)};

function addTaskElement(task){
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const taskText = document.createElement("span");
  const taskPriority = document.createElement("span");
  const editTaskBtn = document.createElement("button");
  const deleteTaskBtn = document.createElement("button");

  checkBox.type = "checkbox";
  checkBox.checked = task.completed;

  checkBox.addEventListener("change", () => {
    task.completed = checkBox.checked // == True
    updateCompletedInLocalStorage(task.id, checkBox.checked)
    updateCounts();
  });

  listItem.setAttribute("data-id", task.id);
  taskText.textContent = task.text;

  taskPriority.textContent = task.priority || "medium";
  taskPriority.className = `priority priority-${task.priority || "medium"}`;

  editTaskBtn.textContent = "Edit";
  editTaskBtn.className = "edit-btn";
  editTaskBtn.addEventListener("click", () => { 
    const currentTask = getTasksFromLocalStorage().find(t => t.id === task.id);

    userInput.value = currentTask.text 
    prioritySelect.value = currentTask.priority || "medium";
    addTaskBtn.textContent = "Update Task";

    editingTaskId = task.id; 
    userInput.focus(); 

  });

  deleteTaskBtn.textContent = "Delete";
  deleteTaskBtn.className = "delete-btn";
  deleteTaskBtn.addEventListener("click", () => {
    document.querySelector(`li[data-id="${task.id}"]`).remove();
    removeTaskFromLocalStorage(task.id);
    updateCounts();
  });

  listItem.append(checkBox, taskText, taskPriority, editTaskBtn, deleteTaskBtn);
  taskList.appendChild(listItem);
}


function renderTasks(taskToRender){
  taskList.innerHTML = "";
  taskToRender.forEach((task) => {addTaskElement(task)})
} 

// local storage helpers

function updateCounts(){
  const tasks = getTasksFromLocalStorage();

  allTask.textContent = tasks.length;
  activeTask.textContent = tasks.filter(task => !task.completed).length;
  completedTask.textContent = tasks.filter(task => task.completed).length;
  highPriorityTask.textContent = tasks.filter(task => task.priority === "high").length;
  }
  
// Local Storage Helpers

function getTasksFromLocalStorage(){
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTaskToLocalStorage(task){
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(id){
  let tasks = getTasksFromLocalStorage().filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInLocalStorage(id, newText, newPriority){
  const tasks = getTasksFromLocalStorage().map(task => {
    if (task.id === id) {
      task.text = newText;
      if(newPriority) task.priority = newPriority;
    }
    return task;
  })
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCompletedInLocalStorage(id, completed){
  const tasks = getTasksFromLocalStorage().map(task => {
    if(task.id === id) task.completed = completed;
    return task;
  })
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Start the app
initializeApp();  