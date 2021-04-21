const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode');

const app = express();
const port = process.env.PORT || 3001;

// Define paths for express config.
const staticPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(staticPath));

app.get('', (req, res) => {
    res.render('index', {
        authorName: 'Shivam Kapoor',
        title: 'Weather',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        authorName: 'Shivam Kapoor',
        title: 'Help',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        authorName: 'Shivam Kapoor',
        title: 'About Me',
    });
});
 
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address in the query string',
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error) {
            return res.send(error);
        }
        forecast(latitude, longitude, (forecastError, response) => {
            if(forecastError) {
                return res.send(forecastError);
            }
            res.send({
                forecast: response,
                location: place,
                address: req.query.address,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    res.send({
        products: [],
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        authorName: 'Shivam Kapoor',
        title: '404',
    });
});

app.listen(port, () => {
    console.log(`Serving the app at port ${port}.`);
});