const express = require('express')
const {engine} = require('express-handlebars')
const port = 3000

const app = express()
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static(__dirname + '/public'))

const restaurantList = require('./restaurant.json')

app.get('/',(req,res) => {
    res.render('index',{restaurant: restaurantList})
})
app.get('/show',(req,res) => {
    res.render('show')
})

app.listen(port,() => {
    console.log(`The Web Is Running On http:localhost:${port}`)
})


