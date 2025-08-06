console.log("This is a simple JavaScript file.");
let completed=0;
let taskCount=0;
class Task {
  constructor(completed,task, category, priority) {
    this.completed = completed || false; 
    this.task = task;
    this.category = category;
    this.priority = priority;
  }

  execute() {
    console.log(`Executing task: ${this.task}`);
  }
}

const taskList = [];
let checked = false;
const tasktitle = document.querySelector(".taskInput");
const catagory = document.querySelector(".categoriesDropdown");
const priorty = document.querySelector(".sortDropdown");
const addButton = document.querySelector(".addTaskButton");
function handleAddTask() {
    
    if (tasktitle.value && catagory.value && priorty.value) {
        taskList.push(new Task(checked, tasktitle.value, catagory.value, priorty.value));
        taskCount++;
        sort();
        console.log("Task added:", taskList);
        checked = false;
    } else {
        console.log("Please fill in all fields.");
    }
}
tasktitle.addEventListener("keydown", function() {
    if (event.key === "Enter") {
        handleAddTask();
        
    }
});
addButton.addEventListener("click", function() {
   handleAddTask();
});
   

/*
function renderTasks() {
    const taskContainer = document.querySelector(".taskList");
    taskContainer.innerHTML = ""; // Clear existing tasks
    taskList.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.className = "taskItem";
        taskElement.innerHTML =`
        <div class="task">
        <input type="checkbox" data-index="${index}" />
        <div class="taskDetails">
            <span class="taskTitle">${task.Task}</span>
            <div class="tags">
                <span class="tagWork">${task.catagory}</span>
                <span class="tagHigh">${task.priority}</span>
            </div>
         </div>
        <div class="taskActions">
          <img src="img/pencil.png" alt="Edit Icon" class="editButton" data-index="${index}">
           <img src="img/close.png" alt="Delete Icon" class="deleteButton" data-index="${index}">  
        </div>
        `;
        taskElement.className = "taskItem";
        taskElement.innerHTML = `
            <p>${task.task}</p>
            <p>Category: ${task.category}</p>
            <p>Priority: ${task.priority}</p>
            <button class="deleteButton" data-index="${index}">Delete</button>
        `;
        taskContainer.appendChild(taskElement);
    });

    // Add delete functionality
    const deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            taskList.splice(index, 1);
            renderTasks();
        });
    });
}
*/
const taskTemplateList = document.getElementById("taskList");
const template = document.getElementById("taskTemplate");
const emptyTemplate = document.getElementById("emptyTemplate");
const totalTasks = document.querySelector(".totalTask");
const completedTasks = document.querySelector(".completedTasks");
function noTasks() {
    const emptyClone = emptyTemplate.content.cloneNode(true);
    taskTemplateList.appendChild(emptyClone);
  
}
if (taskList.length === 0) {
  noTasks();
 }
function renderTasks() {
  totalTasks.textContent = `${taskCount} Total Tasks`;  
  completedTasks.textContent = `${completed} Completed`;  
  taskTemplateList.innerHTML = ""; // Clear existing tasks
  if (taskList.length === 0) {
    noTasks(); // Show empty state if no tasks
    return; // Exit if no tasks
  
    } else {
    console.log("Rendering tasks:", taskList);
  taskList.forEach((t, index) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".taskTitle").textContent = t.task;
    clone.querySelector(".tagWork").textContent = t.category;
    clone.querySelector(".tagHigh").textContent = t.priority;
    const check=clone.querySelector("input[type='checkbox']");
    check.checked = t.completed;
    check.setAttribute("data-index", index);
     check.addEventListener("change", handleCheckboxChange);
    

    const editBtn = clone.querySelector(".editIcon");
    const deleteBtn = clone.querySelector(".deleteIcon");

    editBtn.setAttribute("data-index", index);
    deleteBtn.setAttribute("data-index", index);

    // Add event listeners
    editBtn.addEventListener("click", handleEdit);
    deleteBtn.addEventListener("click", handleDelete);

    taskTemplateList.appendChild(clone);
    
  });
    }
}
function handleDelete(e) {
  const index = e.target.getAttribute("data-index");
  taskCount--;
  if (taskList[index].completed) {
    completed--;
  }
  taskList.splice(index, 1); 
  renderTasks(); 
}
function handleEdit(e) {
  const index = e.target.getAttribute("data-index");
  const task = taskList[index];
  
  document.querySelector(".taskInput").value = task.task;
  document.querySelector(".categoriesDropdown").value = task.category;
  document.querySelector(".sortDropdown").value = task.priority;
  checked = task.completed;


  taskList.splice(index, 1);
  renderTasks();
}
function handleCheckboxChange(e) {
            const index = e.target.getAttribute("data-index");
            const task = taskList[index];
            task.completed = e.target.checked;
            if (task.completed) {   
                completed++;
            } else {
                completed--;
            }       
            console.log(`Total completed tasks: ${completed}`);
            renderTasks();
           
 }

 function sort() {
    taskList.sort((a, b) => {
        if (a.priority === "High" && b.priority !== "High") return -1;
        if (a.priority !== "High" && b.priority === "High") return 1;
        if (a.priority === "Medium" && b.priority !== "Medium") return -1;
        if (a.priority !== "Medium" && b.priority === "Medium") return 1;
        if (a.priority === "Low" && b.priority !== "Low") return -1;
        if (a.priority !== "Low" && b.priority === "Low") return 1
        return 0; // If both are the same priority
    });
    renderTasks();
 }
const searchInput = document.querySelector(".searchInput");
const categoriesDropdown = document.querySelector(".searchCategoriesDropdown");
let selectedCategory = categoriesDropdown.value;
function checkSearch(tasks, searchTerm) {
  return tasks.filter(t =>
    Object.values(t).some(val =>
      typeof val === "string" && val.includes(searchTerm)
    )
  );
}

 function filterTasks(searchTerm) {
    taskTemplateList.innerHTML = ""; // Clear existing tasks
    
    if (taskList.length === 0) {
        noTasks(); // Show empty state if no tasks
        return; // Exit if no tasks
  
    } else{
        taskList.forEach((t, index) => {
        console.log(selectedCategory)
        const hasValue = Object.values(t).some(value =>typeof value === "string" && value.includes(searchTerm)
)
        if((hasValue)&(t.category === selectedCategory || selectedCategory === "all")) {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".taskTitle").textContent = t.task;
        clone.querySelector(".tagWork").textContent = t.category;
        clone.querySelector(".tagHigh").textContent = t.priority;
        const check=clone.querySelector("input[type='checkbox']");
        check.checked = t.completed;
        check.setAttribute("data-index", index);
        check.addEventListener("change", handleCheckboxChange);

        const editBtn = clone.querySelector(".editIcon");
        const deleteBtn = clone.querySelector(".deleteIcon");

        editBtn.setAttribute("data-index", index);
        deleteBtn.setAttribute("data-index", index);

        // Add event listeners
        editBtn.addEventListener("click", handleEdit);
        deleteBtn.addEventListener("click", handleDelete);

        taskTemplateList.appendChild(clone);
        }
        else{
              noTasks(); // Show empty state if no tasks match the search
        }
    });
}
 }

searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();
    filterTasks(searchTerm);
 });
categoriesDropdown.addEventListener("change", function() {
    selectedCategory = categoriesDropdown.value;
    filterTasks('');
 });
