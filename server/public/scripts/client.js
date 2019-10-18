$(document).ready(onReady);

function onReady() {
    console.log("working Jquery");
    updateTable();
    applyEventListeners();
}

function applyEventListeners() {
    $("#submitNewTask").on('click', handleNewTask);
}

function updateTable() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        appendTasks(response);
    }).catch(function (error) {
        console.log('Error in client-side GET request to /tasks', error);
    });
}

function appendTasks(array) {
    for (task of array) {
        console.log(task.taskName);
        $('#listTableBody').append(`
            <tr data-id="${task.id}">
                <td>${task.taskName}</td>
                <td>
                    <select class="selectPriority">
                        <option value="" disabled selected hidden>${task.priority}</option>
                        <option value = "High">High</option>
                        <option value = "Medium">Medium</option>
                        <option value = "Low">Low</option>
                    </select>
                </td>
                <td>
                    <select class="selectPriority">
                        <option value="" disabled selected hidden>${task.status}</option>
                        <option value = "notStarted">Not Started</option>
                        <option value = "inProgress">In Progress</option>
                        <option value = "completed">Completed</option>
                    </select>
                </td>
                <td>${task.notes}</td>
                <td><button class="delete">Delete</button></td>
            </tr>
        `)
    }
}

function handleNewTask(e) {
    e.preventDefault();

}

