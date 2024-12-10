document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const filterButtons = document.querySelectorAll(".filter-btn");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Function to display tasks
    const displayTasks = (filter = "all") => {
      taskList.innerHTML = "";
  
      const filteredTasks = tasks.filter(task =>
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed)
      );
  
      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `task ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
            <img src="./assets/icons/check.png" alt="Complete" onclick="completeTask(${index})">
            <img src="./assets/icons/delete.png" alt="Delete" onclick="deleteTask(${index})">
          </div>`;
        taskList.appendChild(li);
      });
    };
  
    // Add a new task
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        displayTasks();
      }
    });
  
    // Mark task as complete
    window.completeTask = (index) => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };
  
    // Delete a task
    window.deleteTask = (index) => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };
  
    // Filter tasks
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        displayTasks(filter);
      });
    });
  
    // Initial render
    displayTasks();
  });
  