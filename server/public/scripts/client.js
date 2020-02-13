$(document).ready(onReady);

// on page load, makes GET request for tasks table in database and applies event listeners
function onReady() {
    console.log("working Jquery");
    getTasks();
    applyEventListeners();
}

// adds ajax requests as event listeners on submit button and delete and update buttons in table tasks
function applyEventListeners() {
    $("#submitNewTask").on('click', handleNewTask);
    $('#listTableBody').on('click', '.deleteButton', handleDeleteTask);
    $('#listTableBody').on('click', '.updateButton', handleUpdateTask);
}

// GETs tasks table row contents from database
function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        appendTasks(response);
    }).catch(function (error) {
        console.log('Error in client-side GET request to /tasks', error);
    });
}

// appends rows to array
function appendTasks(array) {
    $("#listTableBody").empty();
    let rowCount = 1;
    for (task of array) {
        console.log(task.taskName);
        // if task is completed, adds completedTask class and removes update button functionality
        if (task.status === "Completed") {
            $('#listTableBody').append(`
            <tr data-id="${task.id}">
                <th scope="row">${rowCount}</th>
                <td>${task.taskName}</td>
                <td>${task.priority}</td>
                <td>${task.status}</td>
                <td>${task.notes}</td>
                <td><button class="deleteButton btn btn-danger btn-sm">Delete</button></td>
                <td><button class="archiveButton btn btn-outline-success btn-sm">Archive</button></td>
            </tr>
            `)
            $("#listTableBody").children().last().addClass("completedTask");
        }
        else {
            $('#listTableBody').append(`
            <tr data-id="${task.id}">
                <th scope="row">${rowCount}</th>
                <td>${task.taskName}</td>
                <td>
                    <select class="selectPriority">
                        <option value="${task.priority}" disabled selected hidden>${task.priority}</option>
                        <option value = "High">High</option>
                        <option value = "Medium">Medium</option>
                        <option value = "Low">Low</option>
                    </select>
                </td>
                <td>
                    <select class="selectStatus">
                        <option value="${task.status}" disabled selected hidden>${task.status}</option>
                        <option value = "Not Started">Not Started</option>
                        <option value = "In Progress">In Progress</option>
                        <option value = "Completed">Completed</option>
                    </select>
                </td>
                <td>${task.notes}</td>
                <td><button class="deleteButton btn btn-danger btn-sm">Delete</button></td>
                <td><button class="updateButton btn btn-outline-primary btn-sm">Update</button></td>
            </tr>
            `)
        }
        // increments the number in the # column
        rowCount++;
    }
}

// on Submit button click, adds new task to database, then GETs contents to append to DOM
function handleNewTask() {
    // requires taskName and Notes inputs to have values
    if(!$("#taskName").val() || !$("#addPriority").val()) {
        return Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Please enter task name and priority.'
          })
    }
    // posts new task to database with input values
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            taskName: $("#taskName").val(),
            priority: $("#addPriority").val(),
            notes: $("#notes").val()
        }
        // updates the task list and empties input fields
    }).then(function () {
        getTasks();
        $("#taskName").val("");
        $("#addPriority").val("");
        $("#notes").val("");
    }).catch(function (error) {
        console.log('Error in client-side POST', error);
    });
}

// on delete button click, removes that task from database and GETs contents to append to DOM
function handleDeleteTask() {
    let id = $(this).parent().parent().data().id;
    // sweet alerts modal for confirming delete
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            $.ajax({
                method: 'DELETE',
                url: `tasks/${id}`
            }).then(function () {
                getTasks();
            }).catch(function (error) {
                console.log('Error in Client-side Delete Request', error);
            });
        }
    })
}

// on update button click, alters that item's priority and status in database , then updates table contents on DOM
function handleUpdateTask() {
    // grabs id from table row
    let id = $(this).parent().parent().data().id;
    // grabs selected status from status dropdown
    let status = $(this).parent().parent().find(".selectStatus").children("option:selected").val();
    // grabs selected priority from priority dropdown
    let priority = $(this).parent().parent().find(".selectPriority").children("option:selected").val();
    console.log(`status to update item ${id} to:`, status);
    console.log(`priority to update item ${id} to:`, priority);
    $.ajax({
        method: 'PUT',
        url: `tasks/${id}`,
        data: {
            status: status,
            priority: priority
        }
    }).then(function () {
        // updates table
        getTasks();
    }).catch(function (error) {
        console.log('There is an error in client-side PUT request', error)
    });
}
