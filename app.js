const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')
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

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Now running with http://localhost.${port}`)
})