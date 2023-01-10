// parse - constructing from JSON a JS value 
// described by a string
// stringy - converts a JS value to a JSON string 
// & specify properties for replacer arrays

//Event alert when the page is loading/ reloading
window.addEventListener('load', (event) => {
    alert("Loading List of Tasks TODO");
 });

// Selectors:
// taskInput - takes task message and saves him
const taskInput = document.querySelector(".introduceNewTask input")
// editDelete - select both Edit & Delete spans
const editDelete = document.querySelectorAll(".filters span")
// clearAll - select button, which deletes all tasks from all 3 filters
const clearAll = document.querySelector(".clear-btn")

// editTaskId - id of the task that will be moddified
let editTaskId
// isEditTask - boolean verifies if the edit button was clicked, in case
// if it is delete, check button or clear is false
let isEditTask = false
// taskBox - box which contains tasks that will be listed foreach filter, it beggins after the bold gray lane
let taskBox = document.querySelector(".task-box");
// allTasks - all tasks that need to be done, including ones that are done
let allTasks = JSON.parse(localStorage.getItem("todo-list"))

// list all existing tasks from All filter - this happens everytime when page is loaded
showTasksElement("all");

// Edit & Delete foreach button that a task has
editDelete.forEach(btn => {

    btn.addEventListener("click", () => {
        // if we selected the span 
        document.querySelector("span.all").classList.remove("all");
        btn.classList.add("all");
        showTasksElement(btn.id);
    });
});

// Showing menu of the selected task Edit & Delete
function showMenu(selectedTask) {
    // selecting div which contains Edit & Delete Settings
    let menuDiv = selectedTask.parentElement.lastElementChild;
    // and adding a new class to this task, to make visible
    menuDiv.classList.add("show");
    // event when s
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

// Modify status for task - it depends by value of the check button
function updateStatus(selectedTask) {
    // selecting the task name
    let taskName = selectedTask.parentElement.lastElementChild;
    // verify status of task 
    // if value of the check button is true we add a class name checked & set status as finished
    // else is not in the 'Finished' filter list, which means is 'InProgress' list
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        allTasks[selectedTask.id].status = "finished";
    } else {
        taskName.classList.remove("checked");
        allTasks[selectedTask.id].status = "inProgress";
    }
    // from JSON print values stored as string values
    localStorage.setItem("todo-list", JSON.stringify(allTasks))
}

// Edit message task
function editTask(taskId, textName) {
    
    isEditTask = true; 
    // id of edited task
    editTaskId = taskId;
    // changing value with the new one
    taskInput.value = textName;
    // touching button
    taskInput.focus();
    // add a new class name
    taskInput.classList.add("all");
}

// Delete message task
function deleteTask(deleteId, filter) {
    
    isEditTask = false;
    // modify content at index 1 of the array and be replaced with the exisitng elements
    allTasks.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(allTasks));
    // show again tasks at the filter we are, refresh list
    showTasksElement(filter);
}

// Delete all tasks from everywhere
clearAll.addEventListener("click", () => {

    isEditTask = false;
    // modify content at end of the array and be replaced with the exisitng elements
    allTasks.splice(0, allTasks.length);
    localStorage.setItem("todo-list", JSON.stringify(allTasks));
    // show again tasks at the filter we are, refresh list
    showTasksElement()
});

// reporting status after introducing a new task 
taskInput.addEventListener("keyup", e => {
    // value inserted in the placeholder input
    let userTask = taskInput.value.trim();
    // it the usered press ENTER & he wrote something will be added in 2 filters
    if(e.key == "Enter" && userTask) {
        // is adding an element NOT MODIFY AN EXISTING ONE
        if(!isEditTask) {
            allTasks = !allTasks ? [] : allTasks;
            let taskInfo = {name: userTask, status: "inProgress"};
            allTasks.push(taskInfo);

        } else { //CASE OF CHANGING MESSAGE TASK

            // edit is reset to false
            isEditTask = false;
            // and the new message is set
            allTasks[editTaskId].name = userTask;
        }

        // after inserting message, we clear the message placeholder
        // set in the JSON the new task and write him in the list of filter 
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(allTasks));
        // show full list for the current filter "all"
        showTasksElement(document.querySelector("span.all").id);
    }

});

// Functions which is showing tasks for a given filter
function showTasksElement(filter) {

    let liTag = "";

    // if there are tasks that must be done
    if(allTasks) {
        // foreach task we will make a dictionary with Key - id task & value - message that task has
        allTasks.forEach((task, id) => {
            // boolean verifis status of the task, checked - is status of check button
            let finished = task.status == "finished" ? "checked" : "";
            // if task is in all filter or if the task is not done yet verify if we are on the right filter 'In Progress'
            if(filter == task.status || filter == "all") {
                // adding a new element list tag in list and adding its SPAN which contains the settings for that task & name task
                // IMPORTANT: is to add an id number to identify the task that we want to modify
                // in paragraph we write it's task message & on click event it will be seen the menu with 2 Edit & Delete
                // ONLY WAY THAT I FOUND TO ADD TASKS IN TODO LIST
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${finished}>
                                <p class="${finished}">${task.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${task.name}")'><i class="uil uil-pen"></i>Edit</li> 
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    // In case if taskbox doesn't contains no liTags, is writing 'Planify new tasks | homeworks | projects'
    taskBox.innerHTML = liTag || `<span>Planify new tasks | homeworks | projects</span>`;

    // Makes all tasks Finished or In Progress to be on filer All
    !taskBox.querySelectorAll(".task").length
        ? clearAll.classList.remove("all") : clearAll.classList.add("all");
    // Make a MAX NUMBER of tasks that can be seen - if it's bigger than 300px user will use the scroller to see the tasks
    taskBox.offsetHeight >= 300 
        ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");

}