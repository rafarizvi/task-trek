console.log("tasks.js connected");

// Removes tasks from view tasks pages
const tasksEl = document.querySelectorAll(".taskList");

const deleteTask = async (id, task) => {
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            task.remove();
        }
    } catch (error) {
        console.error("Error deleting task:", error.message);
    }
};

tasksEl.forEach((task) => {
    task.addEventListener("click", (e) => {
        const tag = e.target.tagName;
        const taskId = e.target.id;

        if (tag === 'BUTTON') {
            deleteTask(taskId, task);
        }
    });
});