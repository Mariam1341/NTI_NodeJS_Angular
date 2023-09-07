// const addUser = document.getElementById("addUser")
const allUsers = []
const addUser = document.querySelector("#addUser")
const showAll = document.querySelector("#showAll")
const formHeaders = ["id", "userName", "age", "status"]
const dataWrap = document.querySelector("#dataWrap")
const single = document.querySelector("#single")
const edit = document.querySelector("#editUserSection")

const createUserObj = function(formData){
    const user = { }
    formHeaders.forEach( h => {
        if( h == "id" ) user[h]=Date.now()
        else user[h] = formData[h].value
    })
    return user
}

const storeToLocalStorage = function(key, data){
    //if there is an error set item with []
    let myData
    try{
        myData =  JSON.stringify(data)
    }
    catch(e){
        myData = '[]'
    }
    localStorage.setItem(key, myData)
}
if(addUser){
    addUser.addEventListener("submit", function(e){
        e.preventDefault()
        const allUsers = JSON.parse(localStorage.getItem('myUsers')) || []
        let user = createUserObj( addUser.elements )
        allUsers.push(user)
        storeToLocalStorage("myUsers", allUsers)
        addUser.reset()
        window.location="index.html"
    })
}


const createMyOwnEle = function(parent, ele, txt, classes){
    myEle = document.createElement(ele)
    if(txt) myEle.textContent=txt
    if(classes) myEle.classList = classes
    parent.appendChild(myEle)
    return myEle
}

const toggle = status =>{
    if( status == 'active'){
        return'Inactive'
    }else{
        return 'Active'
    }
    
}

const drawall = function(usersData){
    dataWrap.textContent=""
    if( !usersData.length ){
        const tr = document.createElement("tr")
        dataWrap.appendChild(tr)
        tr.textContent="no users yet"
    }
    usersData.forEach((user, index)=>{
        const tr = createMyOwnEle(dataWrap, "tr", null, null)
        formHeaders.forEach( head=> createMyOwnEle(tr, "td", user[head], null) )
        const td = createMyOwnEle(tr, "td", null,null)
        const delBtn = createMyOwnEle(td, "button", "delete","btn btn-danger mx-2")
        const editBtn = createMyOwnEle(td, "button", "edit","btn btn-primary mx-2")
        const showBtn = createMyOwnEle(td, "button", "show","btn btn-success mx-2") 
        const activeStatus = createMyOwnEle(td, "button", toggle(user.status),"btn btn-warning") 

        delBtn.addEventListener("click", function(e){ 
            usersData.splice(index, 1)
            tr.remove()
            storeToLocalStorage("myUsers", usersData)
            drawall(usersData)
         })
         showBtn.addEventListener("click", function(e){
            localStorage.setItem("single", JSON.stringify(user))
            window.location="single.html"
         })

         editBtn.addEventListener("click", e =>{
            localStorage.setItem("oldUser", JSON.stringify(user))
            window.location="edit.html"
         })
         activeStatus.addEventListener("click", function(e){
            editUserData(1, user)
            usersData = JSON.parse(localStorage.getItem('myUsers')) || []
            drawall(usersData)
         })
    })
}

if(dataWrap){
    const usersData = JSON.parse(localStorage.getItem('myUsers')) || []
    drawall(usersData)
}

if(single){
    const userData = JSON.parse(localStorage.getItem("single"))
    single.textContent= `${userData.id} - ${userData.userName}`
    console.log(userData)
}

if(edit){
    const oldUser = JSON.parse(localStorage.getItem("oldUser"))
    const editUser = document.getElementById('editUser');
    const name = editUser.querySelector('input[name="userName"]');
    const active = editUser.querySelector('#active');
    const inactive = editUser.querySelector('#inactive')
    const age = editUser.querySelector('input[name="age"]');
    
    name.placeholder = oldUser.userName
    age.placeholder = oldUser.age
    oldUser.status == 'active'?
        active.checked = true :
        inactive.checked = true
    
    editUser.addEventListener("submit", e => {
        e.preventDefault()
        editUserData(0, oldUser, editUser.elements)
        editUser.reset()
        window.location="index.html"
    })
}
    

const editUserData = (toggleState, oldUser, data) => {
    let tempUser = {}
    if(!toggleState){
        tempUser = createUserObj(data)
    }
    formHeaders.forEach( h => {
        if( h == "id" ) tempUser.id = oldUser.id
        if( toggleState == 1) tempUser.status = toggle(oldUser.status).toLocaleLowerCase()
        if(!tempUser[h]) tempUser[h] = oldUser[h]
    })
    updateUsers(oldUser,tempUser)
}

const updateUsers = (oldUser, tempUser) => {
    const allUsers = JSON.parse(localStorage.getItem('myUsers')) || []
    const index = allUsers.findIndex(user=> user.id == oldUser.id)
    allUsers[index] = tempUser
    storeToLocalStorage("myUsers", allUsers)
}
