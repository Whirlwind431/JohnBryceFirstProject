
(() => {
    "use strict"

    //variables
    let arr = []
    const formVar = document.getElementById("formVar")
    const divCards = document.getElementById("tasks")

    const textInput = document.getElementById("textInput");
    const dateInput = document.getElementById("dateInput");
    const timeInput = document.getElementById("timeInput");
    const textarea = document.getElementById("textarea");
    const msgTextInput = document.getElementById("msgTextInput");
    const msgDateInput = document.getElementById("msgDateInput");
    const msgTimeInput = document.getElementById("msgTimeInput");
    const msgTextarea = document.getElementById("msgTextarea");


    // buttons
    const submitBtn = document.getElementById("submitBtn")
    const saveBtn = document.getElementById("saveBtn")
    const clearBtn = document.getElementById("clearBtn")

    // Run iur website
    webInit()

    //Function task's create time
    function today() {
        let currentDate = new Date();
        let dateTime = currentDate.getDate() + "/"
            + (currentDate.getMonth() + 1) + "/"
            + currentDate.getFullYear() + " <br> "
            + currentDate.getHours() + ":"
            + currentDate.getMinutes() + ":"
            + currentDate.getSeconds();
        return dateTime;
    }


    // input validation 
    function checkInputIsLegal(obj) {
        msgTextInput.innerHTML = obj.text ? '' : "Please fill the task title"
        msgDateInput.innerHTML = obj.date ? '' : "Please fill the due date"
        msgTimeInput.innerHTML = obj.time ? '' : "Please fill the due time"
        msgTextarea.innerHTML = obj.description ? '' : "Please fill the description task"
        if (!obj.text || !obj.date || !obj.time || !obj.description) {
            return false
        } else {
            return true
        }
    }

    // Function not refreshing for page
    formVar.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    // function for running and refreshing website
    function webInit() {
        if (localStorage.getItem('tasks')) {
            const strTasks = localStorage.getItem('tasks')
            arr = JSON.parse(strTasks)
        } else {
            arr = []
        }
        createCards()
    }


    // format for our task (obj)
    function addNewTaskObj() {
        const task = {
            text: textInput.value,
            date: dateInput.value,
            time: timeInput.value,
            description: textarea.value,
            currentTime: today()
        }
        return task
    }

    // main func - to add new task 
    function addNewTask() {
        const newTask = addNewTaskObj()
        const validation = checkInputIsLegal(newTask)
        if (validation) {
            addNewTaskToLocalStorage(newTask)
            clearInputValue()
            webInit()
        }
    }

    // clear input 
    function clearInputValue() {
        textInput.value = ""
        dateInput.value = ""
        timeInput.value = ""
        textarea.value = ""

        // clear msg
        msgTextInput.value = ""
        msgDateInput.value = ""
        msgTimeInput.value = ""
        msgTextarea.value = ""
    }

    // adding to local storage
    function addNewTaskToLocalStorage(newTask) {
        arr.push(newTask)
        // console.log(arr);
        const stringifynewTask = JSON.stringify(arr)
        localStorage.setItem("tasks", stringifynewTask)
    }

    //get our tasks from the local storage 
    function updateTasksToLocalStorage() {
        const stringifynewTask = JSON.stringify(arr)
        localStorage.setItem("tasks", stringifynewTask)
    }

    // delete button
    function deleteTask(index) {
        arr.splice(index, 1);
        let result = confirm("Want to delete?");
        if (result) {
            updateTasksToLocalStorage()
            webInit()
        }
    }

    //save button
    function saveBtnFunc(item) {
        item.text = textInput.value
        item.date = dateInput.value
        item.time = timeInput.value
        item.description = textarea.value
        item.currentTime = today()
        if (checkInputIsLegal(item)) {
            createCards()
            const stringifynewTask = JSON.stringify(arr)
            localStorage.setItem("tasks", stringifynewTask)
            saveBtn.setAttribute("hidden", "true")
            submitBtn.removeAttribute("hidden", "true")
            window.location.reload()
        }
    }

    //edit btn
    function editTask(item) {
        console.log("Button was clicked. 👌❤️");
        submitBtn.setAttribute("hidden", "true")
        saveBtn.removeAttribute("hidden", "true")
        saveBtn.setAttribute("class", "btn btn-success")
        // put in input
        textInput.value = item.text
        dateInput.value = item.date
        timeInput.value = item.time
        textarea.value = item.description
        console.log(item)
        saveBtn.addEventListener("click", function () {
            saveBtnFunc(item)
        })

    }

    // create  cards
    function createCards() {
        divCards.innerHTML = ""

        for (const item of arr) {
            const taskIndex = arr.indexOf(item);
            const divElement = document.createElement('div')
            const cardTextInput = document.createElement('p')
            const cardDateInput = document.createElement('p')
            const cardTimeInput = document.createElement('p')
            const cardHorizLine = document.createElement('hr')
            const cardTextarea = document.createElement('p')
            const cardTimeCreation = document.createElement('p')
            const deleteBtn = document.createElement('i')
            const editBtn = document.createElement('i')
            // css 
            divElement.setAttribute("class", "divCard fade-in-image" )
            cardTextInput.setAttribute("class", "inputData")
            cardDateInput.setAttribute("class", "inputData")
            cardTimeInput.setAttribute("class", "inputData")
            cardTextarea.setAttribute("class", "inputData")
            cardTimeCreation.setAttribute("class", "inputData")
            deleteBtn.setAttribute("class", "bi bi-x-circle-fill btnClass")
            editBtn.setAttribute("class", "bi bi-pencil-square btnClass")
            editBtn.setAttribute("id", "editBtn")
            editBtn.style.display = "none"
            deleteBtn.style.display = "none"
            // set data into cells
            cardTextInput.innerHTML = `Task: ${item.text}`
            cardDateInput.innerHTML = `date: ${item.date}`
            cardTimeInput.innerHTML = `time: ${item.time}`
            cardTextarea.innerHTML = `description: ${item.description}`
            cardTimeCreation.innerHTML = `task time creation ${item.currentTime}`
            deleteBtn.innerHTML = ""
            // buttons
            deleteBtn.addEventListener("click", function () {
                deleteTask(taskIndex)
                console.log(arr);
            })
            editBtn.addEventListener("click", function () {
                editTask(item)
            })

            // buttons appearance -----------------------------------------------------------

            //mouseOver function to show the button
            function mouseOver() {
                editBtn.style.display = "inline";
                deleteBtn.style.display = "inline";
            }

            //mouseOut function to hide the button
            function mouseOut() {
                editBtn.style.display = "none";
                deleteBtn.style.display = "none";
            }
            // Add mouseenter event listener to the divElement (the card)
            divElement.addEventListener("mouseenter", mouseOver)

            // Add mouseleave event listener to the divElement (the card)
            divElement.addEventListener("mouseleave", mouseOut);

            // -----------------------------------------------------------

            editBtn.addEventListener("mouseenter", mouseOver)
            // append elements to our main divCards
            divElement.appendChild(deleteBtn)
            divElement.appendChild(editBtn)
            divElement.appendChild(cardTextInput)
            divElement.appendChild(cardDateInput)
            divElement.appendChild(cardTimeInput)
            divElement.appendChild(cardHorizLine)
            divElement.appendChild(cardTextarea)
            divElement.appendChild(cardTimeCreation)
            divCards.prepend(divElement)

        }
    }


    // add func, delete func for our form
    submitBtn.addEventListener("click", () => addNewTask())

    clearBtn.addEventListener("click", () => clearInputValue())

})()