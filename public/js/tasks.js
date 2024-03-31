
console.log('tasks.js connected');


// Removes tasks from view tasks pages
const tasksEl = document.querySelectorAll('.taskList');

const deleteNote = async (id, task) => {
  try {
    await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      task.remove();
  } catch (error) {
    console.error('Error deleting task:', error.message);
  }
}

tasksEl.forEach(task => {
    task.addEventListener('click', (e) => {
        const taskId = e.target.id
        deleteNote(taskId, task);
    });
});




// const deleteNote = (id) =>
//   fetch(`/api/tasks/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

// tasksEl.forEach(task => {
//     task.addEventListener('click', (e) => {
//         deleteNote(e.target.id);
//     });
// });

    // async function displayTasks() {
    //     const response = await fetch('/api/tasks');
    //     const tasks = await response.json();

    //     taskList.innerHTML = taskTemplate({ tasks });

    //     const updateButtons = document.querySelectorAll('.update-status');
    //     updateButtons.forEach(button => {
    //         button.addEventListener('click', async (event) => {
    //             const taskId = event.target.parentElement.dataset.taskId;
    //             const newStatus = event.target.previousElementSibling.value;

    //             await updateStatus(taskId, newStatus);
    //         });
    //     });
    // }

    // async function updateStatus(taskId, newStatus) {
    //     await fetch(`/tasks/${taskId}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ status: newStatus })
    //     });

    //     displayTasks();
    // }

    // const addTaskForm = document.getElementById('addTaskForm');

    // addTaskForm.addEventListener('click', async (event) => {
    //     event.preventDefault();

    //     const formData = new FormData(addTaskForm);
    //     const title = formData.get('title');
    //     const description = formData.get('description');

    //     try {
    //         const response = await fetch('/tasks', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ title, description })
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to add task');
    //         }

 
    //         const addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'));
    //         addTaskModal.hide();


            displayTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    });

    taskList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-task')) {
            const taskId = event.target.dataset.taskId;
            await deleteTask(taskId);
        }
    });

    async function deleteTask(taskId) {
        try {
            await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            });
            displayTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    displayTasks();
});