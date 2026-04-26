const userInput = document.getElementById("input-field");
const TaskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("add-task-btn");
const prioritySelect = document.getElementById("priority-select")


addTaskBtn.addEventListener("click", addTask);

// App recives taks from local storage 
// and creates task element for each task in local storage

window.addEventListener("load", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => {
  addTaskElement(task)   
  })
});


// Add task to the list and local storage
// called when the add task button is clicked
// remove whitespace from the input and check if it's not empty
// Create a task object with a unique id, text, and completed status

function addTask(){
  const taskContent = userInput.value.trim();
  const selectedPriority = prioritySelect.value;

   if (taskContent !== ""){
    const task = {id: Date.now(), Text: taskContent, completed: false, priority: selectedPriority};
    addTaskElement(task);
    saveTaskToLocalStorage(task);
    userInput.value = "";
  }else {
     console.error("Can not add Empty task")
  }
}


// Create a task element and append it to the task list
// Each task element has a checkbox, text, edit button, and delete button

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
    task.completed = checkBox.checked
    updateCompletedInLocalStorage(task.id, checkBox.checked)
  });
  
  listItem.setAttribute("data-id", task.id);
  taskText.textContent = task.Text;

  taskPriority.textContent = task.priority || "Medium";
  taskPriority.className = "priority";
  
  
  editTaskBtn.textContent = "Edit";
  editTaskBtn.className = "edit-btn";
  editTaskBtn.addEventListener("click", () => editTask(task.id));

  deleteTaskBtn.textContent = "Delete";
  deleteTaskBtn.className = "delete-btn";
  deleteTaskBtn.addEventListener("click", () => deleteTask(task.id));

  listItem.appendChild(checkBox)
  listItem.appendChild(taskText);
  listItem.appendChild(taskPriority);
  TaskList.appendChild(listItem);
  listItem.appendChild(editTaskBtn);
  listItem.appendChild(deleteTaskBtn);

}


// function markAsComplete(task){
//   if(checkBox.checked){
//     task.completed = true
//   }else {
//     task.completed = false
//   }

// Remove task from the dom where the del btn is clicked
function deleteTask(id){
  const taskElement = document.querySelector(`li[data-id="${id}"]`); 
  taskElement.remove()
  console.log(taskElement, "removed")
  removeTaskFromLocalStorage(id);

}

// Edit task text when the edit button is clicked
// Prompt the user to enter new text and update the task element and local storage
// Get the task element by its id, get the current text, and prompt the user for new text 

function editTask(id){
  const taskElement = document.querySelector(`li[data-id="${id}"]`);
  const taskText = taskElement.querySelector("span").textContent;
  const newText = prompt("Edit task:", taskText);
  if (newText !== null && newText.trim() !== "") {
    taskElement.querySelector("span").textContent = newText.trim();
    updateTaskInLocalStorage(id, newText.trim());
  } 
}

// save task to local storage by getting the existing tasks, adding the new task, and saving the updated array back to local storage
// Get the existing tasks from local storage, find the task by id, update its text, and save the updated array back to local storage

function saveTaskToLocalStorage(task){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task); 
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function removeTaskFromLocalStorage(id){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInLocalStorage(id, newText){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.Text = newText;
    }
    return task;
  } )
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCompletedInLocalStorage(id, completed){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if(task.id == id) task.completed = completed
    return task;
  }) 
  localStorage.setItem("tasks", JSON.stringify(tasks))
}


function updateTaskPriorityInLocalStorage(id, priority){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

}