const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')
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


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  loginList.find()
    .lean()
    .then(lists => {
      const emailInList = lists.find(list => list.email === email)
      if (!emailInList) {
        res.render('index', { wrongEmail: email, email, password })
      } else {
        if (emailInList.password !== password) {
          res.render('index', { wrongPassword: password, email: email, password})
        } else {
          res.render('success', { name: emailInList.firstName})
        }
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Now running with http://localhost.${port}`)
})