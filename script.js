
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-name");
const prioritySelector = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");
const stats = document.querySelector("#stats");

const tasks = [];

const task_object = {
    name: "Task name here",
    priority: "what priority",
    completed: false
};
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = Listeners >



form.addEventListener("submit", function (event) {
    console.log("SUBMIT EVENT FIRED");
    event.preventDefault();

    const taskName = taskInput.value;
    const taskPriority = prioritySelector.value;

    const task = {
        name: taskName,
        priority: taskPriority,
        completed: false
    };

    tasks.push(task);

    displayTasks();
});
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = Functions >

function displayTasks() {

    taskList.innerHTML = "";

    for (const task of tasks) {

        const paragraph = document.createElement("p");

        paragraph.textContent =
            task.name + " - " + task.priority;

        taskList.appendChild(paragraph);
    }
}