const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const db = require('../src/config/db/server')

const app = express()
const route = require('../src/routers/users')

const port = 4000

db.connect()

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', engine({ 
    extname: '.hbs', 
    defaultLayout: 'main.hbs', 
    helpers: require('./app/helpers/handlebars'),
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources','views'))


app.use(express.json())
app.use(methodOverride('_method'))

app.use(route)
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

