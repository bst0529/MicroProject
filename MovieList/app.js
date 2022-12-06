// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

// setting template engine
app.engine('handlebars',exphbs({'defaultLayout': 'main'}))
app.set('view engine','handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/',(req,res) => {
    res.render('index',{movies: movieList.results})
})
app.get('/movies/1',(req,res) => {
    const movieOne = {
        id: 1,
        title: 'Jurassic World: Fallen Kingdom',
        description:
          'Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.',
        release_date: '2018-06-06',
        image: 'c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
      }
    res.render('show',{movie: movieOne})
})

// start and listen on the Express server
app.listen(port,() => {
    console.log(`Express is listening on localhost:${port}`)
})