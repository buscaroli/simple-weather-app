const request = require('request');

const urlGeolocation = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const geoKey = process.env.MAPBOX_API_KEY;



const geocode = (address, callback) => {
    const url = urlGeolocation + encodeURIComponent(address) + '.json?access_token=' + geoKey;
  
    request ({url, json: true}, (error, { body }) => {
        
        if (error) {
            callback ('Couldn\'t connect to the service.', undefined);
        } else if (body.features.length === 0) {
            callback ('Couldn\'t match the location.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1].toString(),
                longitude: body.features[0].center[0].toString(),
                location: body.features[0].place_name
            });
        }
        
    });
};



module.exports = geocode;