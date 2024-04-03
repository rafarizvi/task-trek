
const delButtonHandler = async (event) => {
    const taskBox = event.target.closest(".box");
    const taskId = taskBox.dataset.taskId;

    const confirmed = window.confirm("Are you sure you want to delete this task?");

    if (confirmed) {
    
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                taskBox.remove(); 
            } else {
                alert("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("An error occurred while deleting the task");
        }
    }
};


const updateFormHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const taskBox = form.closest(".box");
    const taskId = taskBox.dataset.taskId;

    const statusSelect = form.querySelector("select[name='status']");
    const selectedStatus = statusSelect.value;

    const prioritySelect = form.querySelector("select[name='priority']");
    const selectedPriority = prioritySelect.value;

    if (selectedStatus || selectedPriority) {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: "PUT",
                body: JSON.stringify({ status: selectedStatus, priority: selectedPriority }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const taskStatusElement = taskBox.querySelector(".task-status");
                taskStatusElement.textContent = selectedStatus;

                
                console.log("Status updated successfully");

                
                location.reload(); 
            } else {
                alert("Failed to update task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
            alert("An error occurred while updating the task");
        }
    } else {
        alert("Please select either a status or a priority to update");
    }
};



document.addEventListener("DOMContentLoaded", () => {

    const deleteButtons = document.querySelectorAll(".delete-task");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", delButtonHandler);
    });

    
    const updateForms = document.querySelectorAll(".update-status");
    updateForms.forEach((form) => {
        form.addEventListener("submit", updateFormHandler);
    });

    
});


document.getElementById("showFormBtn").addEventListener("click", () => {
    document.getElementById("taskFormContainer").style.display = "block";
});


document.getElementById("cancelBtn").addEventListener("click", () => {
    document.getElementById("taskFormContainer").style.display = "none";
});



document.getElementById("addTaskForm").addEventListener("submit", async (event) => {
    event.preventDefault();


    const start_date = document.querySelector('#start-date').value.trim();
    const due_date = document.querySelector('#due-date').value.trim();
   
    const title = document.querySelector('input[name="title"]').value.trim();
    const description = document.querySelector('textarea[name="description"]').value.trim();


    try {

        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, start_date, due_date}),
        });

        if (response.ok) {
            
            document.location.reload();
        } else {
        
            const responseData = await response.json();
            alert(responseData.message);
        }
    } catch (error) {
        console.error("Error adding task:", error);
        alert("An error occurred while adding the task.");
    }
});


