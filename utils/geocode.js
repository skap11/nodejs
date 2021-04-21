const request = require('postman-request');
const constants = require('../constants/constants');

const geocode = (address, callback) => {
    const geolocationURL = `${constants.thirdPartyBaseUrls.mapboxBaseUrl}/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${constants.accessKeys.mapboxAccessKey}&limit=1`;
    request({url: geolocationURL, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to mapbox service.', undefined);
        } else if(!body.features.length) {
            callback('Entered location not found.', undefined);
        } else {
            const placeInformation = body.features[0];
            const [longitude, latitude] = placeInformation.center;
            const place = placeInformation.place_name;
            callback(undefined, {
                latitude, 
                longitude,
                place,
            });
        }
    });
}

module.exports = geocode;