const request = require('postman-request');
const constants = require('../constants/constants');

const forecast = (latitude, longitude, callback) => {
    const weatherStackURL = `${constants.thirdPartyBaseUrls.weatherStackBaseUrl}/current?query=${latitude},${longitude}&access_key=${constants.accessKeys.weatherStackAccessKey}`;
    request({url: weatherStackURL, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined);
        } else if(body.error) {
            callback(body.error.info, undefined);
        } else {
            const data = body.current;
            response = `${data.weather_descriptions[0]}. ${data.temperature} ` +
            `out there, but it feels like ${data.feelslike}.`;
            callback(undefined, response);
        }
    });
}

module.exports = forecast;