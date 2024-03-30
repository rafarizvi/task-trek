document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskTemplate = Handlebars.compile(document.getElementById('task-template').innerHTML);

    async function displayTasks() {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();

        taskList.innerHTML = taskTemplate({ tasks });


        const updateButtons = document.querySelectorAll('.update-status');
        updateButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const taskId = event.target.parentElement.dataset.taskId;
                const newStatus = event.target.previousElementSibling.value;

                await updateStatus(taskId, newStatus);
            });
        });
    }

    async function updateStatus(taskId, newStatus) {
        await fetch(`/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });

        displayTasks();
    }


    displayTasks();
});