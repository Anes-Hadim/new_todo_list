let tasks= JSON.parse(localStorage.getItem('tasks')) || [];
let total =  JSON.parse(localStorage.getItem('total')) || 0;
let completed =  JSON.parse(localStorage.getItem('completed')) || 0;
displayTodo();
showTotal();
showCompleted();



document.addEventListener('keydown',(event) => {
  if (event.key==='Enter') {
    addTask();
  }
})

function pause(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}

async function addTask() {
  const task=document.querySelector('input').value;
  if (task!=='') {
    tasks.push({task:task,completed:false});
    document.querySelector('input').value='';
    total++;

    localStorage.setItem('tasks',JSON.stringify(tasks))
    localStorage.setItem('total',JSON.stringify(total))

    showTotal();
    showCompleted();
    displayTodo();
  } else {
    document.querySelector('.addTask').classList.add('empty');
    await pause(250)
    document.querySelector('.addTask').classList.remove('empty');
  }
}

function showTotal() {
  document.getElementById('all').innerHTML=total;
}

function showCompleted() {
  if (total !== 0) {
    document.getElementById('completed').innerHTML=`${completed} of ${total}`
  } else {
    document.getElementById('completed').innerHTML='0'
  }
}

function displayTodo() {
  let taskList = document.querySelector('.tasks')
  if(total===0) {
    taskList.innerHTML=`<img src="./images/Clipboard.svg" alt="clipboard">
    <p>Add the task you want above</p>`
  } else {
    taskList.innerHTML='';
    tasks.forEach((task,i) => {
      taskList.innerHTML+=` <div class="taskContainer">
      <input type="checkbox" class="check" ${task.completed ? 'checked' : ''} onchange="changeState(${i})">
      <p class="task ${task.completed ? 'complete' : ''}" id="task${i}">${tasks[i].task}</p>
      <button class="delete" onclick="deleteTask(${i})"><img src="./images/trash.svg" alt="delete"></button>
      </div>`
    })
  }
}

function changeState(index) {
  tasks[index].completed=!tasks[index].completed
  tasks[index].completed ? completed++ : completed--;

  localStorage.setItem('tasks',JSON.stringify(tasks))
  localStorage.setItem('completed',JSON.stringify(completed))

  showCompleted();
  displayTodo();
}

function deleteTask(index) {
  if (tasks[index].completed) {
    completed--;
  }
  tasks.splice(index,1);
  total--;

  localStorage.setItem('tasks',JSON.stringify(tasks))
  localStorage.setItem('total',JSON.stringify(total))
  localStorage.setItem('completed',JSON.stringify(completed))

  showTotal();
  showCompleted();
  displayTodo();
}
