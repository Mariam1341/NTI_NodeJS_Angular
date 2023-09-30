const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()


const partialDir = path.join(__dirname, "../resources/layouts")
const staticDir =path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../resources/views')
console.log(viewDir)
/**
 * علشان اقدر في home.hbs
 * ان انا اعمل srec= '/css/style.css'
*/
app.use(express.static(staticDir))//علشان اقدر في home.hbs
app.use(express.urlencoded({extended : true}))

app.set("view engine", 'hbs')
app.set('views', viewDir)

hbs.registerPartials(partialDir)


const userRoutes = require('../app/routes/user.rotes')
const exp = require('constants')
app.use(userRoutes)




app.get('*', (req, res) =>{
  res.render('error404')
} )
module.exports = app