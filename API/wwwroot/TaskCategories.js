$(document).ready(function () {

    var today = new Date();
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    var formattedDate = today.toLocaleDateString('en-US', options);
    var dateParts = formattedDate.split(", ");
    $('.date span:first-child').text(dateParts[0]);
    $('.date span:last-child').text(dateParts[1]);

    // Function to load tasks from the database
    function loadTasks() {
        $.ajax({
            url: 'https://localhost:5001/api/Task', // Replace with your API endpoint
            type: 'GET',
            success: function (tasks) {
                const taskTableBody = $('#taskTableBody');
                taskTableBody.empty(); // Clear existing rows

                tasks.forEach(task => {
                    const row = `
                        <tr data-id="${task.id}">
                            <td>${task.title}</td>
                            <td>${task.status}</td>
                            <td>
                                <button class="edit">Edit</button>
                                <button class="delete">Delete</button>
                            </td>
                        </tr>
                    `;
                    taskTableBody.append(row);
                });

                // Attach delete event listener
                attachEditEvent();
                attachDeleteEvent();
            },
            error: function (err) {
                console.error('Error loading tasks:', err);
            }
        });
    }

    // Function to delete a task
    function deleteTask(taskId) {
        $.ajax({
            url: `https://localhost:5001/api/Task/${taskId}`, // Replace with your API endpoint
            type: 'DELETE',
            success: function () {
                alert('Task deleted successfully');
                loadTasks(); // Reload tasks after deletion
            },
            error: function (err) {
                console.error('Error deleting task:', err);
            }
        });
    }

    // Attach delete event listener
    function attachDeleteEvent() {
        $('.delete').off('click').on('click', function () {
            const taskId = $(this).closest('tr').data('id');
            if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(taskId);
            }
        });
    }

    // Attach edit event listener
    function attachEditEvent() {
        $('.edit').off('click').on('click', function () {
            const taskId = $(this).closest('tr').data('id');
            // Redirect to UpdateTask.html with taskId stored in localStorage
            localStorage.setItem('editTaskId', taskId);
            window.location.href = 'UpdateTask.html';
        });
    }

    // Load tasks on page load
    loadTasks();
});
