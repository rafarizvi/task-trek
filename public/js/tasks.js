
const updateForm = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#task-description').value.trim();
    const title = document.querySelector('#task-title').value.trim();
    const status = document.querySelector('#task-status').value.trim();
  
    if (status && title && description) {
      const response = await fetch(`/api/tasks/:id`, {
        method: 'GET',
        body: JSON.stringify({ title, status, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create project');
      }
    }
  };

  const updateButton = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#task-description').value.trim();
    const title = document.querySelector('#task-title').value.trim();
    const status = document.querySelector('#task-status').value.trim();
  
    if (status && title && description) {
      const response = await fetch(`/api/tasks/`, {
        method: 'POST',
        body: JSON.stringify({ title, status, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/api/tasks/`);
      } else {
        alert('Failed to create project');
      }
    }
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete project');
      }
    }
  };



// document.addEventListener('DOMContentLoaded', async () => {
//     const taskList = document.getElementById('taskList');

//     async function displayTasks() {
//         try {
//             const response = await fetch('/api/tasks');
//             console.log('Response from server:', response);
    
//             if (!response.ok) {
//                 throw new Error('Failed to fetch tasks');
//             }
    
//             const tasks = await response.json();
//             console.log('Tasks received:', tasks);

//             // Clear the task list before adding new tasks
//             taskList.innerHTML = '';

//             // Iterate through each task and render it using the task template
//             tasks.forEach(task => {
//                 const taskElement = document.createElement('div');
//                 taskElement.classList.add('task');
//                 taskElement.innerHTML = `
//                     <p>Title: ${task.title}</p>
//                     <p>Description: ${task.description}</p>
//                     <p>Status: ${task.status}</p>
//                     <select class="status-select">
//                         <option value="pending"${task.status === 'pending' ? ' selected' : ''}>Pending</option>
//                         <option value="completed"${task.status === 'completed' ? ' selected' : ''}>Completed</option>
//                         <option value="inProgress"${task.status === 'inProgress' ? ' selected' : ''}>In Progress</option>
//                     </select>
//                     <button class="update-status" data-task-id="${task.id}">Update Status</button>
//                 `;
//                 taskList.appendChild(taskElement);
//             });

//             // Add event listeners to update status buttons
//             const updateButtons = document.querySelectorAll('.update-status');
//             updateButtons.forEach(button => {
//                 button.addEventListener('click', async (event) => {
//                     const taskId = event.target.dataset.taskId;
//                     const newStatus = event.target.previousElementSibling.value;
//                     await updateStatus(taskId, newStatus);
//                 });
//             });
//         } catch (error) {
//             console.error('Error fetching or displaying tasks:', error);
//         }
//     }

//     async function updateStatus(taskId, newStatus) {
//         try {
//             await fetch(`/api/tasks/${taskId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ status: newStatus })
//             });
//             displayTasks();
//         } catch (error) {
//             console.error('Error updating task status:', error);
//         }
//     }

//     displayTasks();
// });
