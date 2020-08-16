const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';


let toDos = [];

function deleteToDo(e){
    const btn = e.target;  //어떤 "X" 버튼이 클릭되었는지 알기 위해 .target을 쓴다 
    const li = btn.parentNode;  //버튼의 부모인 li 요소를 저장한다 
    toDoList.removeChild(li);  // toDoList를 가져와서 li를 제거한다 
    const cleanToDos = toDos.filter(function(toDo){  // 
        return toDo.id !== parseInt(li.id);  //모든 toDos가 li의 id와 같지 않은 것을 반환 한다. 
    });
    toDos = cleanToDos;  // toDo.id와 li.id가 같지 않은 항목들을  toDos 어레이에 새로 적용한다 
    saveToDo();  // 저장 함수 호출 
}

function saveToDo (){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("span");
    const label = document.createElement("label");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    label.innerText = text;  // 입력한 값을 span에 넣는다
    li.appendChild(delBtn);
    delBtn.classList.add("btn"); // 버튼 클래스 이름 추가 
    li.appendChild(label);
    li.classList.add("toDo");
    li.id = newId;
    
    toDoList.appendChild(li);
    //const toDos 어레이에 넣기 위해 객체를 만든다 
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDo();
}

function handleToDo(e){
    e.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value ='';
}

// 로컬 스토리지에 저장된 To do 불러오기 
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    } 
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleToDo)
}

init();

//done