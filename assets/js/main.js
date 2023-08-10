
const todoForm = document.querySelector('.todo-form');
const inputElement = document.querySelector('.todo-input');

const todoList = document.querySelector('.todo-list');
const todoItem = document.querySelector('.todo-item');

const todos = document.querySelectorAll('span.todo-name');


//const elements = document.querySelectorAll('.completed');
const clearComplete = document.querySelector('.clearAll');
const options = document.querySelectorAll('[name="option"]');
const listCount = document.querySelector('#kalan');
const footers = document.querySelector('.footer');



let count = 0;
listCount.innerText = count;


todoForm.addEventListener('submit',(e) =>{

    e.preventDefault();
    
    if(inputElement.value === ''){
        return;
    }
    
    todoList.innerHTML += `<li class="todo-item">
                <label>
                    <input class='toggle' type="checkbox">
                    <span class='todo-name'>${inputElement.value}</span>
                    <button class="del-btn" >x</button>
                </label>
            </li>`;
       
     
    count +=1;
    listCount.innerText = count;
    inputElement.value = '';
    bindClicks();
    clearBtn();
    //hideFooter();
    
    saveItem();
    edit();
    
    
})

todoList.addEventListener('dblclick',edit)
function edit(e){

    if(e.target.className === 'todo-item'){
        let newTodo = document.cre
    }
    

}

// 1 Yeni eleman eklendiğinde eventleri bağlamak -- en mantıksızı bu 
// delegre etmek
//create element ile oluşturmak -- sağlıklı çalısması icin mutlaka data havuzuna baglanması lazım
//event delegation

/*
todoList.addEventListener('click',deleteTodo);
function deleteTodo(e){

    const targetEl = e.target;
    if(targetEl.classList.contains('del-btn')){
        removeTodo(targetEl)
        count -=1;
        listCount.innerText = count;
    }
    if(targetEl.classList.toggle('toggle')){
        markTodo(targetEl);
    }
    clearBtn();
}*/

for (const option of options) {
    option.addEventListener('click',dondur);
}

function dondur(){
    todoList.classList.value = 'todo-list ' + this.value;
}

//eğer en asagıdaki blink fonsksiyonunu kullanırsın burası el değil this olacak./Ayrıca remove fonksiyonu da.

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
    if(this.parentElement.parentElement.classList.contains('completed')){
        count-=1;
        listCount.innerText = count;
        
    }else{
        count+=1;
        listCount.innerText = count;
    }

    clearBtn();
    saveItem();
}

function removeTodo(){
    this.parentElement.parentElement.remove();
    count-=1;
    listCount.innerText = count;
    saveItem();
}


//bind-- bağlamak
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
function clearCompleted(){

    for (const el of document.querySelectorAll('li.completed')) {
        el.remove();
    }
}

function clearBtn (){
    if(document.querySelector('li.completed') === null){
        clearComplete.classList.add('unvisible');
    }
    else{
        clearComplete.classList.remove('unvisible');
    }

}




function hideFooter() {
    if(count === 0){
        footers.classList.add('unvisible');
    }else{
        footers.classList.remove('unvisible');
    }
}

clearBtn();
//hideFooter();
function saveItem(){
    localStorage.setItem("data",todoList.innerHTML)
}

function dataLoad(){
    todoList.innerHTML = localStorage.getItem("data");
}
dataLoad();




