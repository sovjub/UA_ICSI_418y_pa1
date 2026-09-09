
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-name");
const prioritySelector = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");

const tasks = [];

let taskCounter = 0;

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = Listeners >

form.addEventListener("submit", function (event) {
    console.log("SUBMIT EVENT FIRED");
    event.preventDefault();

    if (taskInput.value.trim() === "") { console.log("Task name cannot be empty"); return; }

    const taskName = taskInput.value;
    const taskPriority = prioritySelector.value;

    const task = {
        name: taskName,
        priority: taskPriority,
        completed: false,
        index: taskCounter++
    };

    tasks.push(task);

    taskInput.value = ""; // clear the box
    taskInput.focus(); // refocus the cursor so we can fire off tasks in fast succession

    displayTasks();
});



// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = Functions >

function displayTasks() {

    taskList.innerHTML = "";


    for (const task of tasks) {
        // ===========================================make the new element and format the display text
        const paragraph = document.createElement("p");
        paragraph.textContent = task.index + ") " + task.name + " - " + task.priority;
        if (task.completed === true) {
            paragraph.classList.add("completedState");
        }
        // ============================================================================add complete button
        const completeButton = document.createElement("button"); //
        completeButton.textContent = "Complete"; // Button label
        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;
            console.log("Task number " + task.index + " marked as " + task.completed);
            displayTasks();
        });
        if (task.completed === false) {
            completeButton.textContent = "Complete";
            completeButton.classList.add("pendingState");
        }
        else {
            completeButton.textContent = "Undo";
            completeButton.classList.add("completedState");
        }
        paragraph.appendChild(completeButton); // attach it to the currently handled task

        //============================================================================add a delete button
        const deleteButton = document.createElement("button"); //
        deleteButton.textContent = "Delete"; // Button label
        deleteButton.addEventListener("click", function () {
            console.log("Task number " + task.index + " deleted.");
            tasks.splice((tasks.indexOf(task)), 1);
            displayTasks();
        });
        if (task.completed === false) {
            deleteButton.classList.add("completedState");
        }
        else {
            deleteButton.classList.add("pendingState");
        }
        paragraph.appendChild(deleteButton);

        //===================================================================actaully add it to the list
        taskList.appendChild(paragraph);


    }
}