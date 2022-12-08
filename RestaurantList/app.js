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
    res.render('index',{restaurants: restaurantList.results})
})
app.get('/restaurants/:id',(req,res) => {
    const restaurant = restaurantList.results.find(r => r.id.toString() === req.params.id)
    res.render('show',{restaurant: restaurant})
})
app.get('/Search',(req,res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(r => {
        return r.category.toLowerCase().includes(keyword.toLocaleLowerCase())
            || r.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    })
    res.render('index',{restaurants: restaurants,keyword: keyword})
})

app.listen(port,() => {
    console.log(`The Web Is Running On http:localhost:${port}`)
})


