// Create an array to store the to-do list data
var todoList = [];

// Load todoList from localStorage
$(document).ready(function() {
    var json = localStorage.getItem('todoList');
    if (json != null) {
        todoList = JSON.parse(json);
    }
    render();
});

// Save todoList to localStorage when the tab is closing
window.addEventListener('beforeunload', function (e) {   
    localStorage.setItem('todoList', JSON.stringify(todoList));
});

function addTodo() {
    let domTask = document.getElementById("task");
    let domtimeBegin = document.getElementById("timeBegin");
    let domtimeEnd = document.getElementById("timeEnd");

    let taskName = domTask.value;
    let timeBegin = domtimeBegin.value;
    let timeEnd = domtimeEnd.value;

    var todo = {
        taskName: taskName,
        timeBegin: timeBegin,
        timeEnd: timeEnd,
    };

    todoList.push(todo);

    render();
    // Clear input fields
    domTask.value = "";
    domtimeBegin.value = "";
    domtimeEnd.value = "";
}

function render() {
    let domTodoList = document.getElementById("todoList");
    let htmlTodoList = "";

    for (let i = 0; i < todoList.length; i++) {
        let todo = todoList[i];
        htmlTodoList +=
            `<tr>` +
            `<th scope="row">` +
            (i + 1) +
            `</th>` +
            `<td>` +
            todo.taskName +
            `</td>` +
            `<td>` +
            todo.timeBegin +
            `</td>` +
            `<td>` +
            todo.timeEnd +
            `</td>` +
            `<td><input type="checkbox" checked></td>
            <td class="primary"><button onclick="editTask(${i})">Sửa</button></i></td>
            <td class="danger"><button onclick="deleteTask(${i})">Xóa</button></td>
        </tr>`;
    }

    domTodoList.innerHTML = htmlTodoList;
}

function editTask(index) {
    let todo = todoList[index];

    let newTaskContent = prompt("Nhập nội dung công việc mới:");
    let newtimeBegin = prompt("Nhập ngày bắt đầu mới:", todo.timeBegin);
    let newtimeEnd = prompt("Nhập ngày kết thúc mới:", todo.timeEnd);

    if (newTaskContent !== null && newtimeBegin !== null && newtimeEnd !== null) {
        todo.taskName = newTaskContent;
        todo.timeBegin = newtimeBegin;
        todo.timeEnd = newtimeEnd;

        render();
    }
}

function deleteTask(index) {
    todoList.splice(index, 1);
    render();
}

// Initial render when the page loads
render();
