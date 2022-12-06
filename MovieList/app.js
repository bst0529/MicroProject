// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars',exphbs({'defaultLayout': 'main'}))
app.set('view engine','handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/',(req,res) => {
    // create a variable to store movieOne
    const movieOne = {
        id: 1,
        title: 'Jurassic World: Fallen Kingdom',
        image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
    }
    res.render('index',{movie: movieOne})
})

// start and listen on the Express server
app.listen(port,() => {
    console.log(`Express is listening on localhost:${port}`)
})