//global  variables
let arr = []
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let age = document.getElementById("age")
let email = document.getElementById("email")
let phone = document.getElementById("phone")
const msgFirstNameInput = document.getElementById("msgFirstNameInput")
const msgLastNameInput = document.getElementById("msgLastNameInput")
const msgAgeInput = document.getElementById("msgAgeInput")
const msgEmailInput = document.getElementById("msgEmailInput")
const msgPhoneInput = document.getElementById("msgPhoneInput")

let formVar = document.getElementById("formVar")
const divCards = document.getElementById("cards")
let submitBtn = document.getElementById("submitBtn")
let saveBtn = document.getElementById("saveBtn")

// Run iur website
webInit()

// input validation 
function checkInputIsLegal(obj) {
    msgFirstNameInput.innerHTML = obj.firstName ? '' : "Please fill the first name"
    msgLastNameInput.innerHTML = obj.lastName ? '' : "Please fill the last name"
    msgAgeInput.innerHTML = obj.age ? '' : "Please fill the age"

    msgEmailInput.innerHTML = obj.email ? '' : "Please fill the email"

    msgPhoneInput.innerHTML = obj.phone ? '' : "Please fill the phone"
    if (!obj.firstName || !obj.lastName || !obj.age || !obj.email || !obj.phone) {
        return false
    } else {
        return true
    }
}

// Function not refreshing for page
formVar.addEventListener("click", (event) => {
    event.preventDefault();
});

// function for running and refreshing website
function webInit() {
    if (localStorage.getItem('users')) {
        const strUsers = localStorage.getItem('users')
        arr = JSON.parse(strUsers)
    } else {
        arr = []
    }
    createCards()
}

// format for our user (obj)
function addNewUserObj() {
    const user = {
        firstName: firstName.value,
        lastName: lastName.value,
        age: age.value,
        email: email.value,
        phone: phone.value
    }
    return user
}

// main func - to add new user 
function addNewUser() {
    const newUser = addNewUserObj()
    const validation = checkInputIsLegal(newUser)
    if (validation) {
        addNewUserToLocalStorage(newUser)
        clearInputValue()
        webInit()
    }
}

// clear input 
function clearInputValue() {
    firstName.value = ""
    lastName.value = ""
    age.value = ""
    email.value = ""
    phone.value = ""

    // clear msg
    msgFirstNameInput.value = ""
    msgLastNameInput.value = ""
    msgAgeInput.value = ""
    msgEmailInput.value = ""
    msgPhoneInput.value = ""
}

// adding to local storage
function addNewUserToLocalStorage(newUser) {
    arr.push(newUser)
    // console.log(arr);
    const stringifyNewUser = JSON.stringify(arr)
    localStorage.setItem("users", stringifyNewUser)
}

//get our users from the local storage 
function updateUsetToLocalStorage() {
    const stringifyNewUser = JSON.stringify(arr)
    localStorage.setItem("users", stringifyNewUser)
}

// delete button
function deleteUser(index) {
    arr.splice(index, 1);
    updateUsetToLocalStorage()
    webInit()
}

//save button
function saveBtnFunc(item) {
    item.firstName = firstName.value
    item.lastName = lastName.value
    item.age = age.value
    item.email = email.value
    item.phone = phone.value
    if (checkInputIsLegal(item)) {
        createCards()
        const stringifyNewUser = JSON.stringify(arr)
        localStorage.setItem("users", stringifyNewUser)
        saveBtn.setAttribute("hidden", "true")
        submitBtn.removeAttribute("hidden", "true")
        window.location.reload()
    }
}

//edit btn
function editUser(item) {

    console.log("Button was clicked. 👌❤️");
    submitBtn.setAttribute("hidden", "true")
    saveBtn.removeAttribute("hidden", "true")
    saveBtn.setAttribute("class", "btn btn-success")
    // put in input
    firstName.value = item.firstName
    lastName.value = item.lastName
    age.value = item.age
    email.value = item.email
    phone.value = item.phone
    console.log(item)
    saveBtn.addEventListener("click", function () {
        saveBtnFunc(item)
    })

}

// create users cards
function createCards() {
    divCards.innerHTML = ""
    for (const item of arr) {
        const userIndex = arr.indexOf(item);
        const divElement = document.createElement('div')
        const cardFirstName = document.createElement('p')
        const cardLastName = document.createElement('p')
        const cardAge = document.createElement('p')
        const cardEmail = document.createElement('p')
        const cardPhone = document.createElement('p')
        const deleteBtn = document.createElement('i')
        const editBtn = document.createElement('i')
        // css 
        divElement.setAttribute("class", "divCard")
        cardFirstName.setAttribute("class", "firstName")
        cardLastName.setAttribute("class", "firstName")
        cardAge.setAttribute("class", "firstName")
        cardEmail.setAttribute("class", "firstName")
        cardPhone.setAttribute("class", "firstName")
        deleteBtn.setAttribute("class", "bi bi-x-circle-fill btnClass")
        editBtn.setAttribute("class", "bi bi-pencil-square btnClass")
        editBtn.setAttribute("id", "editBtn")
        editBtn.style.display = "none"
        deleteBtn.style.display = "none"
        // set data into cells
        cardFirstName.innerHTML = item.firstName
        cardLastName.innerHTML = item.lastName
        cardAge.innerHTML = item.age
        cardEmail.innerHTML = item.email
        cardPhone.innerHTML = item.phone
        deleteBtn.innerHTML = ""
        // buttons
        deleteBtn.addEventListener("click", function () {
            deleteUser(userIndex)
            console.log(arr);
        })
        editBtn.addEventListener("click", function () {
            editUser(item)
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
        divElement.appendChild(cardFirstName)
        divElement.appendChild(cardLastName)
        divElement.appendChild(cardAge)
        divElement.appendChild(cardEmail)
        divElement.appendChild(cardPhone)
        divCards.prepend(divElement)
    }
}



