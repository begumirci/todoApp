
const todoForm = document.querySelector('.todo-form');
const inputElement = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoItem = document.querySelector('.todo-item');
const todos = document.querySelectorAll('span.todo-name');
const clearComplete = document.querySelector('.clearAll');
const options = document.querySelectorAll('[name="option"]');
const listCount = document.querySelector('#kalan');



todoForm.addEventListener('submit',(e) =>{

    e.preventDefault();
    if(inputElement.value === ''){return;}
    
    todoList.innerHTML += `<li class="todo-item">
                <label>
                    <input class='toggle' type="checkbox">
                    <span class='todo-name'>${inputElement.value}</span>
                    <button class="del-btn" >x</button>
                </label>
            </li>`;
       
    inputElement.value = '';
    todoCounter();
    bindClicks();
    clearBtn();
    edit();
    saveItem();
})

for (const option of options) {
    option.addEventListener('click',select);
}

function select(){
    todoList.classList.value = 'todo-list ' + this.value;
}

todoList.addEventListener('dblclick',(e) =>{
    if(e.target.tagName === 'SPAN')
    edit(e.target);
})

function edit(e){
    const firstText = e.firstChild;
    const realText = firstText.textContent;
    const newInput = document.createElement("input");
    newInput.classList.add('edit');
    newInput.value = realText;
    e.replaceChild(newInput,firstText);

    newInput.addEventListener("keydown",(text) =>{
        if(text.key === 'Enter'){
            const newText = newInput.value;
            if(newText !== ''){
                firstText.textContent = newText;
            };
            e.replaceChild(firstText,newInput);
        }
        saveItem();
    })
}

function markTodo(){
    this.parentElement.parentElement.classList.toggle('completed');
    showBtn();
    todoCounter();
    saveItem();
}

function removeTodo(){
    this.parentElement.parentElement.remove();
    todoCounter();
    saveItem();
}

//Bütün clickleri bağlama fonskiyonu
function bindClicks() {

    for (const btn of document.querySelectorAll('.del-btn')) {
        btn.innerText = 'del';
        btn.addEventListener('click',removeTodo)
    }
    for (const btn of document.querySelectorAll('.toggle')) {
        btn.addEventListener('click',markTodo);
    }
}

clearComplete.addEventListener('click',clearCompleted);
function clearCompleted() {

    for (const el of document.querySelectorAll('li.completed')) {
        el.remove();
        todoCounter();
    }
     saveItem();
}

function todoCounter(){
    const todoCount = document.querySelectorAll('.todo-item:not(.completed)').length;
    if(todoCount === 0 || todoCount === 1) {
        listCount.innerText = `${todoCount} item left`;
    }else {
        listCount.innerText = `${todoCount} items left`;
    }
    saveItem();
}

function showBtn (){
    if(document.querySelector('li.completed') === null){
        clearComplete.classList.add('unvisible');
    }
    else{
        clearComplete.classList.remove('unvisible');
    }
    saveItem();
}

function saveItem(){
    localStorage.setItem("data",todoList.innerHTML)
}

function dataLoad(){
    todoList.innerHTML = localStorage.getItem("data");
}

dataLoad();
showBtn();
todoCounter();









