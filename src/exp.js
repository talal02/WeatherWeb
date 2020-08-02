const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../fpages/views')
const partialsPath = path.join(__dirname, '../fpages/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicdir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Talal Ahmed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Talal Ahmed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Lorem ipsum and ++',
        name: 'Talal Ahmed'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(`${req.query.address}`, (e, { lat, long, locationName } = {}) => {
        if(e) {
            return res.send({
                error: e
            })      
        } 
        forecast(lat, long, (e, { temp, precip, desc} = {}) => {
            if(e) {
                return res.send({
                    error: e
                })
            }
            res.send({
                forecast: `${desc}. It is currently ${temp} degrees out. There is ${precip}% chances of rain.`,
                location: locationName,
                address: req.query.address
            })
        })
        
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        name: 'Talal Ahmed',
        message: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        name: 'Talal Ahmed',
        message: 'Page not found'
    })
})

app.listen(5000, () => {console.log('Listening on 5000...')})

