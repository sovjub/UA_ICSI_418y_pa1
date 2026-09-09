
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-name");
const prioritySelector = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");
const completedList = document.querySelector("#completed-list");

const tasks = [];
const comletedTasks = [];

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

    displayTasks();
});



// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = Functions >

function displayTasks() {

    taskList.innerHTML = "";
    completedList.innerHTML = "";


    for (const task of tasks) {
        // what does complete and incomplete tasks have in common when rendered?
        // Index, name, priority, also the delete button but we append that last.
        const paragraph = document.createElement("p");
        paragraph.textContent = task.index + ") " + task.name + " - " + task.priority; // format the task entry


        // ============================================================================add complete button
        const completeButton = document.createElement("button"); //
        completeButton.textContent = "Complete"; // Button label
        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;
            console.log("Task number " + task.index + " marked as " + task.completed);
            displayTasks();
        });
        paragraph.appendChild(completeButton); // attach it to the currently handled task
        //============================================================================add a delete button
        const deleteButton = document.createElement("button"); //
        deleteButton.textContent = "Delete"; // Button label
        deleteButton.addEventListener("click", function () {
            console.log("Task number " + task.index + " deleted.");
            tasks.splice((tasks.indexOf(task)), 1);
            displayTasks();
        });
        paragraph.appendChild(deleteButton);

        // ========================================================================Decide where it belongs.
        if (task.completed === false) { // add incomplete tasks to the correct list
            taskList.appendChild(paragraph); // actually add the task to list
        }
        else { // this is a completed task
            completedList.appendChild(paragraph); // actually add the task to list
        }



    }
}