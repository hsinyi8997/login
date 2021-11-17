const express = require('express')
const router = express.Router()
const loginList = require('../../models/login')

router.post('/', (req, res) => {
  const { email, password } = req.body
  loginList.find()
    .lean()
    .then(lists => {
      const emailInList = lists.find(list => list.email === email)
      if (!emailInList) {
        res.render('index', { wrongEmail: email, email, password })
      } else {
        if (emailInList.password !== password) {
          res.render('index', { wrongPassword: password, email: email, password })
        } else {
          res.render('success', { name: emailInList.firstName })
        }
      }
    })
    .catch(error => console.log(error))
})

module.exports = router