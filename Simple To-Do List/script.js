document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    // Modal Elements
    const modal = document.getElementById("editModal");
    const modalInput = document.getElementById("modalInput");
    const saveEditBtn = document.getElementById("saveEditBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
  
    let editIndex = null;
  
    const saveTasks = (tasks) => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    const getTasks = () => {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    };
  
    const renderTasks = () => {
      taskList.innerHTML = "";
      const tasks = getTasks();
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `task ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button class="mark-complete">${task.completed ? "Undo" : "Complete"}</button>
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        `;
  
        li.querySelector(".mark-complete").addEventListener("click", () => {
          task.completed = !task.completed;
          saveTasks(tasks);
          renderTasks();
        });
  
        li.querySelector(".edit").addEventListener("click", () => {
          editIndex = index;
          modalInput.value = task.text;
          modal.style.display = "block"; // Show modal
        });
  
        li.querySelector(".delete").addEventListener("click", () => {
          tasks.splice(index, 1);
          saveTasks(tasks);
          renderTasks();
        });
  
        taskList.appendChild(li);
      });
    };
  
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        const tasks = getTasks();
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        taskInput.value = "";
        renderTasks();
      }
    });
  
    saveEditBtn.addEventListener("click", () => {
      const tasks = getTasks();
      if (modalInput.value.trim()) {
        tasks[editIndex].text = modalInput.value.trim();
        saveTasks(tasks);
        renderTasks();
        modal.style.display = "none"; // Hide modal
      }
    });
  
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none"; // Hide modal
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"; // Close modal if clicked outside
      }
    });
  
    renderTasks();
  });