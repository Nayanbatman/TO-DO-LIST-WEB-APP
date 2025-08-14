let tasks = [];
var list = document.querySelector(".taskList");
var button = document.querySelector("#newtask");
var input = document.querySelector("#inputtask");
var progressbar = document.querySelector("#progress");
var num = document.querySelector("#number");

function updateTaskList(){
list.innerHTML  = "";
tasks.forEach((task , index) =>{
    const listitem = document.createElement('li');


    listitem.innerHTML = `
    <div class="taskitem">
    <div class="task ${task.completed ? 'completed': ''}">
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <p>${task.text}</p>
    </div>
    <div class="icons">
    <i class="ri-edit-line"></i>
    <i class="ri-delete-bin-6-line"></i>    
    </div>
</div>
    `

    const deleteIcon = listitem.querySelector(".ri-delete-bin-6-line");
    deleteIcon.addEventListener("click", function() {
        deleteTask(index);
    });

    const editIcon = listitem.querySelector(".ri-edit-line");
    editIcon.addEventListener("click", function() {
        editTask(index);
    });

    

listitem.addEventListener("change",function(){
    toggleTaskComplete(index);
})
    list.append(listitem)
})
}

function toggleTaskComplete(index){
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTask();
};

function deleteTask(index){
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTask();
};

function editTask(index){
    input.value = tasks[index].text;
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTask();
}


function addTask(){
var task = input.value.trim();

if(task){
    tasks.push({text :task, completed : false});
    input.value ="";
    updateTaskList();
    updateStats();
    saveTask();
}
}

button.addEventListener("click", function(e){
    e.preventDefault();
    addTask();
})

function updateStats(){
const completedTasks = tasks.filter(task => task.completed).length;
const totalTasks = tasks.length;
const progress = (completedTasks / totalTasks) *100;

progressbar.style.width = `${progress}%`;
num.innerText = `${completedTasks}/${totalTasks}`;


if(tasks.length && completedTasks === totalTasks){
    congo();
}
}

function saveTask(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", function(){
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

function congo(){
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}