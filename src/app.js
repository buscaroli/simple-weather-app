// Required Packages
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Path to used directories
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Calling the app
const app = express();
const port = process.env.PORT || 3000;

// Configuring handlebars (hbs)
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Configuring the app
app.use(express.static(publicPath));

// Setting routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        author: 'Matteo'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Matteo'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author: 'Matteo',
        helpText: 'We are here to help you...'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Address is required.'
        });
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send ({ error });
        } 
        forecast(latitude, longitude, (error, { temperature, wind_speed, uv_index }) => {

            if (error) {
                return res.send({ error });
            } 
            
            res.send ({
                location,
                temperature: temperature,
                wind_speed: wind_speed,
                uv_index
            });

            // console.log('Location: ' + location + '.')
            // console.log('Temperature: ' + temperature + ' C.');
            // console.log('Wind Speed: ', + wind_speed + ' Km/h');
            // console.log('UV Index: ' + uv_index);
            
            
        });

        
    });

    
        
    
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Matteo',
        errorMsg: 'This help Page hasn\'t been found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Matteo',
        errorMsg: 'Page not found.'
    });
});

// Starting the server
app.listen(port, () => {
    console.log('Server up on port ' + port + '.')
});

