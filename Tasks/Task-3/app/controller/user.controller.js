const { all } = require('await')
const DealWithJson = require('../helpers/dealWithJson.helper')

const findUser = (req, res) =>{
  const id =  req.params.userId
  const allUsers = DealWithJson.readFromJSON()
  const user = allUsers.find(user => user.id == id)
  if(! user) res.send('User is not Found')
  return user
}

const userDelete =  (allUsers, id)=> {
  const index = allUsers.findIndex(user => user.id == id)
  console.log(index)
  allUsers.splice(index, 1)
}

const userOperation = (req, res, type) =>{
  let allUsers = DealWithJson.readFromJSON()
  let id 
  if(type != 'add'){
    const oldUser = findUser(req, res)
    id = oldUser.id
  }

  if(type == 'delete'){
    userDelete(allUsers, id)
  }else{
    type == 'add'? id = Date.now() : userDelete(allUsers, id)
    const userData = {id, ...req.body}
    allUsers.push(userData)
  }
  DealWithJson.writeToJSON(allUsers)
}


class User {
  static showAll(req, res) {
    const userSearch = req.query.searchKey
    let allUsers = DealWithJson.readFromJSON()
    if(userSearch) allUsers = allUsers.filter(user => user.name.includes(userSearch))
    res.render('home', {
      pageTitle : 'All Users',
      hasUsers :allUsers.length,
      allUsers
    })
  }


  static showSingle(req, res) {
    const user = findUser(req, res)
    res.render('show', {
      pageTitle : user.name,
      userData : user
    })
  }
  static delete(req, res) {
    res.render('delete', {
      pageTitle : 'Delete'
    })
  }

  static deleteLogic (req, res){
    userOperation(req, res, 'delete')
    res.redirect('/')
  }
  static add(req, res) {
    res.render('add', {
      pageTitle : 'Add User'
    })
  }

  static addLogic (req, res){
    userOperation(req, res, 'add')
    res.redirect("/")
  }
  static editUser(req, res) {
    const user = findUser(req, res)
    res.render('edit', {
      pageTitle : 'Edit User', 
      userData : user
    })
  }

  static editLogic (req, res) {
    userOperation(req, res, 'edit')
    res.redirect("/")
  }
}

module.exports = User