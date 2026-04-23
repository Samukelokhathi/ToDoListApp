import { AddTask, UpdateTask } from "./utilities.js";

const userInput = document.getElementById("input-field");
const TaskList = document.getElementById("list-container");
const addTaskBtn = document.getElementById("add-task-btn");

const addTask = new AddTask(userInput, TaskList, addTaskBtn);
const updateTask = new UpdateTask(userInput, addTaskBtn);

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (updateTask.editItem) {
    updateTask.saveEdit();
  } else {
    addTask.addTask(e);
  }
});

TaskList.addEventListener("click", (e) => {
  updateTask.updateTask(e);
});