const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geo')
const forecast = require('./utils/forecastt')
const { error } = require('console')

// console.log(__dirname)
// console.log(__filename)
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// console.log(publicDirectoryPath)

// Setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sai Krishna'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Lord Krishna',
        name:'Sai Krishna'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some usefull text',
        title:'Help',
        name:'Sai Krishna'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please enter an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'It is snowing',
    //     location:'philadelphia',
    //     address:req.query.address
    // })
})
app.get('/products',(req,res)=>{
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sai Krishna',
        errorMessage:'Help articles not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sai Krishna',
        errorMessage:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('Server is setup to 3000')
})