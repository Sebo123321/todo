const taskList = document.getElementById("taskList");

function addTasks() {
  // Get the values of the input elements
  const taskTitle = document.getElementById("taskTitle").value;
  const taskDesc = document.getElementById("taskDesc").value;

  // Check if one of the fields is empty
  if (taskTitle.trim() === "" || taskDesc.trim() === "") {
    swal("Todo lista", "Vaš zadatak treba imati naslov i tekst!", "error");
    return;
  }

  // Create a new <li> element
  const newTask = document.createElement("li");

  // Assign its inner HTML
  newTask.innerHTML = /* HTML */ `
  <div class=task-t-and-d" style="width:70%;max-width:70%;min-width:70%;">
    <h2>${taskTitle}</h2>
    <p>${taskDesc}</p>
  </div>
  <div class="task-styling">
    <button onclick="removeTask(this)" class="btn bg-danger"><i class="fa-solid fa-trash fa-xl" style="color: #0;"></i></button>
    <input type="checkbox" class="bg-danger" onchange="markTaskCompleted(this)">
  </div>
  `;

  // Add the new task to the <ul> element
  taskList.insertBefore(newTask, taskList.firstChild);

  // Clear the input fields
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
}

document.getElementById("addTask").addEventListener("click", addTasks);

// Update the task counter

function updateTaskCount() {
  const countElement = document.getElementById("taskNum");
  countElement.innerText = `Broj zadataka: ${
    document.getElementById("taskList").childElementCount
  }`;
}

const observer = new MutationObserver(updateTaskCount);
const config = { childList: true };
observer.observe(document.getElementById("taskList"), config);

// Delete all tasks button

const removeAllTasksButton = document.getElementById("deleteAll");

removeAllTasksButton.addEventListener("click", () => {
  const tasks = taskList.children;

  const tasksArray = Array.from(tasks);

  tasksArray.forEach((task) => {
    taskList.removeChild(task);
  });
});

// Delete only completed tasks

const removeOnlyCompletedTasksButton =
  document.getElementById("deleteComplete");

removeOnlyCompletedTasksButton.addEventListener("click", () => {
  const completedTasks = taskList.querySelectorAll("li.completed");

  completedTasks.forEach((task) => {
    taskList.removeChild(task);
  });
});

// Remove the task

function removeTask(button) {
  const removeButton = button; // Get the remove button

  removeButton.parentElement.parentElement.remove(); // Remove the button's parent element (<li>)
}

// Add a fetaure to mark tasks as completed

function markTaskCompleted(checkbox) {
  const taskItem = checkbox.parentElement.parentElement; // Find the parent <li> element

  if (checkbox.checked) {
    taskItem.classList.add("completed"); // Add a CSS class to indicate completion
    taskItem.classList.add("disabled");
  } else {
    taskItem.classList.remove("completed"); // Remove the CSS class
  }
}

// Dark (dark) mode

const toggler = document.getElementById("darkModeToggle");
const icon = document.getElementById("icon");
const allText = document.querySelectorAll(
  "label, p, ul.tasks li h2, ul.tasks li div.task-t-and-d p, sup, .title"
);
let dark = false;

function toggleMode() {
  if (dark) {
    icon.classList.remove("fa-moon"); // Remove the moon icon

    icon.classList.add("fa-sun"); // Add the sun icon

    // Change the page theme to light

    document.body.classList.remove("bg-dark");
    document.body.style.backgroundColor = "white";

    allText.forEach((textElement) => {
      textElement.style.color = "black";
      textElement.style.transition = "color 0.3s linear";
    });
  } else if (!dark) {
    icon.classList.remove("fa-sun"); // Remove the sun icon

    icon.classList.add("fa-moon"); // Add the moon icon

    // Change the page theme to dark

    document.body.style.transition = "background-color 0.3s"
    document.body.classList.add("bg-dark");

    allText.forEach((textElement) => {
      textElement.style.color = "whitesmoke";
      textElement.style.transition = "color 0.3s";
    });
  }

  dark = !dark;
}

toggler.addEventListener("click", toggleMode);
