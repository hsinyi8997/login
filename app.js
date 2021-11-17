const express = require('express')
const { engine } = require('express-handlebars')
const routes = require('./routes')
const app = express()
const port = 3000

require('./config/mongoose')
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(routes)

app.listen(port, () => {
  console.log(`Now running with http://localhost.${port}`)
})