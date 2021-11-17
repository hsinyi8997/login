const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')
const routes = require('./routes')
const loginList = require('./models/login')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/login-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(routes)

app.listen(port, () => {
  console.log(`Now running with http://localhost.${port}`)
})