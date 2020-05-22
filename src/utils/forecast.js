const request = require('request');
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
const urlWeather = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}`;

const forecast = (latitude, longitude, callback) => {
    const url = urlWeather + '&query=' + latitude + ',' + longitude;
    request ({url, json:true}, (error, { body }) => {
        if (error) {
            callback ('Culdn\'t reach the Weather Forecast Service.', undefined);
        } else if (body.error){
            callback('Couldn\'t Access Forecast Data for the Location, try a different area.', undefined);
        } else {
            callback(undefined, {
                    location:       body.location.name,
                    country:        body.location.country,
                    temperature:    body.current.temperature,
                    wind_speed:     body.current.wind_speed,
                    uv_index:       body.current.uv_index
                    })
        }
    });
}


module.exports = forecast;