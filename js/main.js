//Находим элементы на страницу
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach((task) => renderTask(task));

checkEmptyList()

//Добавление задачи
form.addEventListener("submit", addTask)


//Удаление задачи
taskList.addEventListener('click', deleteTask)


//Отмечаем задачу завершенной
taskList.addEventListener('click', doneTask)

// if (localStorage.getItem('tasksHTML')) {
//     taskList.innerHTML = localStorage.getItem('tasksHTML')
// }

function addTask(event) {
  //отменяем отправку формы
  event.preventDefault();

  //достаем текст задачи из поля ввода
  const taskText = taskInput.value;

  //описываем задачу в виде объекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false
  }

  //Добавляем задачу в массив с задачами
  tasks.push(newTask)

  //Сохраняем список задач в хранилище браузера LocalStorage
  saveToLocalStorage()

  //Рендерим задачу на страницу
  renderTask(newTask)

  //Очищаем поле ввода и возвращаем на него фокус
  taskInput.value = ""
  taskInput.focus()

  checkEmptyList()



  //проверка, если в списке дел что-то есть, то убираем "список дел пуст"
//   if (taskList.children.length > 1) {
//     emptyList.classList.add('none')
//   }

 /// saveHTMLtoLS()
}

function deleteTask(event) {
    //Проверяем если клик был Не по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') {
        return 
    }

    //Проверяем что клик был по кнопке "удалить задачу"
    const parentNode = event.target.closest('.list-group-item')
    
    //Определяем ID задачи
    const id = Number(parentNode.id)


    // //Находим индекс задачи в массиве
    // const index = tasks.findIndex((task) => task.id === id)

    // //Удаляем задачу из массива с задачами
    // tasks.splice(index, 1)

    //Удаляем задачу через фильтрацию массива
    tasks = tasks.filter((task) => task.id !== id) 

    //Сохраняем список задач в хранилище браузера LocalStorage
    saveToLocalStorage()

    //Удаляем задачу из разметки
    parentNode.remove()

    checkEmptyList()

    //Проверка. Если в списке задач нет задач, то возвращаем блок "Список задач пуст"
    // if (taskList.children.length === 1) {
    //     emptyList.classList.remove('none')
    // }

   /// saveHTMLtoLS()
    
    // //Проверяем что клик был по кнопке "удалить задачу"
    // if (event.target.dataset.action === 'delete') {
    //     const parentNode = event.target.closest('.list-group-item')
    //     parentNode.remove()
    
    //     //Проверка. Если в списке задач нет задач, то возвращаем "Список задач пуст"
    //     if (taskList.children.length === 1) {
    //         emptyList.classList.remove('none')
    //     }
    // }
}

function doneTask(event) {
    //Проверяем что клик был не по кнопке "задача выполнена"
    if (event.target.dataset.action !== 'done') {
        return
    }

    //Проверяем что клик был по кнопке "задача выполнена"
    const parentNode = event.target.closest('.list-group-item')
    
    //Определяем id задачи
    const id = Number(parentNode.id)
    

    const task = tasks.find((task) => task.id === id)

    task.done = !task.done

    //Сохраняем список задач в хранилище браузера LocalStorage
    saveToLocalStorage()


    
    const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')

 ///   saveHTMLtoLS()

    // //Проверяем что клик был по кнопке "задача выполнена"
    // if (event.target.dataset.action === 'done') {
    //     const parentNode = event.target.closest('.list-group-item')
    //     const taskTitle = parentNode.querySelector('.task-title')
    //     taskTitle.classList.toggle('task-title--done')
    // }
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`
        taskList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
  //Формируем css класс
  const cssClass = task.done ? "task-title task-title--done" : "task-title"

  //Формируем разметку для новой задачи
  const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
   </li>`;


  //добавление задачи на страницу
  taskList.insertAdjacentHTML('beforeend', taskHTML)
}

// function saveHTMLtoLS() {
//     localStorage.setItem('tasksHTML', taskList.innerHTML)
// }