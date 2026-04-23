export class AddTask {
  constructor(inputField, listContainer, addTaskBtn) {
    this.inputField = inputField;
    this.listContainer = listContainer;
    this.addTaskBtn = addTaskBtn;
  }

  getInputValue() {
    return this.inputField.value.trim();
  }

  createTaskElement(value) {
    const listItem = document.createElement("li");

    const textContainer = document.createElement("div");
    const checkbox = document.createElement("input");
    const listContent = document.createElement("span");

    const btnContainer = document.createElement("div");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    

    textContainer.className = "text-container";
    listItem.appendChild(textContainer);

    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    
    
    listContent.textContent = value;

    
    textContainer.appendChild(checkbox);
    textContainer.appendChild(listContent);

    
    btnContainer.className = "btn-container";
    listItem.appendChild(btnContainer);
    
    
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    btnContainer.appendChild(editBtn);

    
    
    delBtn.textContent = "Delete";
    delBtn.className = "del-btn";
    btnContainer.appendChild(delBtn);

    this.listContainer.appendChild(listItem);

  }

  addTask(event) {
    event.preventDefault();

    const value = this.getInputValue();
    if (!value) return;

    this.createTaskElement(value);
    this.inputField.value = "";
  }

  
}



export class UpdateTask {
  constructor(inputField, addTaskBtn) {
    this.inputField = inputField;
    this.addTaskBtn = addTaskBtn;
    this.editItem = null;
  }

  updateTask(event) {
    if (event.target.className === "del-btn") {
      event.target.parentElement.parentElement.remove();
    }

    if (event.target.className === "edit-btn") {
      const listItem = event.target.parentElement.parentElement;
      this.inputField.value = listItem.children[0].textContent;
      this.editItem = listItem;
      this.addTaskBtn.textContent = "Update Task";
    }
  }

  saveEdit() {
    if (!this.editItem) return;

    this.editItem.children[0].textContent =
      this.inputField.value.trim();

    this.editItem = null;
    this.inputField.value = "";
    this.addTaskBtn.textContent = "Add Task";
  }

  completeTask(event) {
    if (event.target.className === "task-checkbox") {
      const listItem = event.target.parentElement.parentElement;
      if(this.checkbox.checked) {
        console.log("Task completed", listItem);
    }
   }
  }
}