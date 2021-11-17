const mongoose = require('mongoose')
const Login = require('../login')
const loginSample = require('../../loginSample.json')
mongoose.connect('mongodb://localhost/login-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Login.insertMany(loginSample)
  console.log('done')
})
