const db = require('../../config/mongoose')
const Login = require('../login')
const loginSample = require('../../loginSample.json')

db.once('open', () => {
  Login.insertMany(loginSample)
  console.log('done')
})
