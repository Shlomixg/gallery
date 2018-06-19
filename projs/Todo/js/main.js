'use strict';

var gTodos;
var gTodosFilter = 'All';
var gTodoID = 1;

var TODOS_KEY = 'todosApp'

function init() {
    console.log('Todo App');
    gTodos = createTodos();
    renderCounts();
    renderTodos();
}

function todoClicked(elTodo, todoID) {
    gTodos.forEach(function (todo) {
        if (todo.id === todoID) {
            todo.isDone = !todo.isDone;
            elTodo.classList.toggle('done');
            renderCounts();
            saveToStorage(TODOS_KEY, gTodos);
        }
    });
}

function deleteTodo(ev, todoID) {
    ev.stopPropagation();   
    console.log('Deleting Todo', todoID);
    gTodos.forEach(function (todo, todoIdx) {
        if (todo.id === todoID) {
            gTodos.splice(todoIdx, 1);
            renderTodos();
            renderCounts();
            saveToStorage(TODOS_KEY, gTodos);
        }
    });
}

function addTodo() {
    var todoTxt = prompt('What do you want todo?..');
    while (todoTxt === null) {
        todoTxt = prompt('What do you want todo?.. Insert data');
    }

    var todoImportance = +prompt('How much it\'s important to you?');
    while (todoImportance < 1 || todoImportance > 3) {
        todoImportance = +prompt('How much it\'s important to you? Insert number from 1 to 3');
    }

    var newTodo = createTodo(todoTxt, todoImportance);
    gTodos.unshift(newTodo);
    renderCounts();

    document.querySelector('.status-filter').value = 'All';
    gTodosFilter = 'All';
    renderTodos();

    saveToStorage(TODOS_KEY, gTodos);
}

function setFilter(strFilter) {
    if (strFilter === 'Filter By') return;

    gTodosFilter = strFilter;
    renderTodos();
}

function sortTodos(strSort) {
    if (strSort === 'Sort By') return;

    if (strSort === 'Date') {
        gTodos.sort(sortTodoDate);
    } else if (strSort === 'Importance') {
        gTodos.sort(sortTodoImportance);
    } else if (strSort === 'Alphabet') {
        gTodos.sort(sortTodoText);
    }
    renderTodos();
}

function sortTodoDate(a, b) {
    return a.createdAt - b.createdAt;
}

function sortTodoText(a, b) {
    var text1 = a.txt.toUpperCase();
    var text2 = b.txt.toUpperCase();
    if (text1 < text2) return -1;
    if (text1 > text2) return 1;
    return 0;
}

function sortTodoImportance(a, b) {
    return a.importance - b.importance;
}

function renderTodos() {
    var strHTML = '';
    var todos = getTodosForDisplay();

    if (todos.length === 0) {
        if (gTodosFilter === 'All') strHTML += 'No Todos';
        else if (gTodosFilter === 'Active') strHTML += 'No Active Todos';
        else if (gTodosFilter === 'Done') strHTML += 'No Done Todos';
    }

    var hideArrows = '';
    if (gTodosFilter !== 'All') hideArrows = ' hide';

    todos.forEach(function (todo, idx) {
        var className = (todo.isDone) ? ' done' : '';
        var hideMoveDown = (idx === 0) ? ' hide' : '';
        var hideMoveUp = (idx === todos.length - 1) ? ' hide' : '';
        strHTML +=
            `
            <li class="todo${className}" onclick="todoClicked(this, ${todo.id})">
                ${todo.txt}
                <div class="btns">
                <button class="btn btn-arrow${hideMoveDown}${hideArrows}" onclick="moveTodo(event, ${idx}, 'up')">&#9651;</button>
                <button class="btn btn-arrow${hideMoveUp}${hideArrows}" onclick="moveTodo(event, ${idx}, 'down')">&#9661;</button>
                <button class="btn btn-danger" onclick="deleteTodo(event, ${todo.id})">X</button>
                </div>  
            </li>
            `
    })
    document.querySelector('.todos').innerHTML = strHTML;
}

function createTodos() {
    var todos = loadFromStorage(TODOS_KEY);
    if (todos) return todos;

    todos = [];

    todos.push(createTodo('Learn Javascript', 1))
    todos.push(createTodo('Play with HTML5', 2))
    todos.push(createTodo('Master CSS', 3))

    return todos;
}

function createTodo(txt, importance) {
    return {
        id: gTodoID++,
        txt: txt,
        importance: importance,
        createdAt: Date.now(),
        isDone: false,
    };
}

function renderCounts() {
    var activeCount = 0;
    gTodos.forEach(function (todo) {
        if (!todo.isDone) activeCount++;
    })

    document.querySelector('.total-count').innerText = gTodos.length;
    document.querySelector('.active-count').innerText = activeCount;
}

function getTodosForDisplay() {
    var todos = [];
    gTodos.forEach(function (todo) {
        if (gTodosFilter === 'All' ||
            (gTodosFilter === 'Active' && !todo.isDone) ||
            (gTodosFilter === 'Done' && todo.isDone)) {
            todos.push(todo);
        }
    });
    return todos;
}

function moveTodo(event, todoIdx, direction) {
    event.stopPropagation();
    var temp = gTodos[todoIdx];
    if (direction === 'up') {
        gTodos[todoIdx] = gTodos[todoIdx - 1];
        gTodos[todoIdx - 1] = temp;
    } else if (direction === 'down') {
        gTodos[todoIdx] = gTodos[todoIdx + 1];
        gTodos[todoIdx + 1] = temp;
    }
    renderTodos();
}