const API_URL = "https://jsonplaceholder.typicode.com/todos";
const tbody = document.getElementById("todoBody");

let todos = [];
let currentFilter = "all"; 
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        todos = data;
        applyFilter();
    })
    .catch(err => console.error(err));

function renderTodos(list) {
    tbody.innerHTML = "";

    list.forEach(todo => {
        const row = document.createElement("tr");
        row.className = todo.completed ? "completed" : "uncompleted";

        row.innerHTML = `
      <td>${todo.id}</td>
      <td>${todo.title}</td>
      <td>${todo.completed ? "Completed" : "Not Completed"}</td>
      <td>
        <button onclick="toggleStatus(${todo.id})">Toggle</button>
      </td>
    `;

        tbody.appendChild(row);
    });
}

function applyFilter() {
    let filteredTodos = [];
    if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (currentFilter === "uncompleted") {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else {
        filteredTodos = todos;
    }
    renderTodos(filteredTodos);
}

function toggleStatus(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    applyFilter();
}

const buttons = {
    all: document.getElementById("allBtn"),
    completed: document.getElementById("completedBtn"),
    uncompleted: document.getElementById("uncompletedBtn")
};

function setActiveButton(type) {
    Object.values(buttons).forEach(btn => btn.classList.remove("active"));
    buttons[type].classList.add("active");
}

document.getElementById("completedBtn").onclick = () => {
    currentFilter = "completed";
    setActiveButton("completed");
    applyFilter();
};

document.getElementById("uncompletedBtn").onclick = () => {
    currentFilter = "uncompleted";
    setActiveButton("uncompleted");
    applyFilter();
};

document.getElementById("allBtn").onclick = () => {
    currentFilter = "all";
    setActiveButton("all");
    applyFilter();
};
