const request = require('request');

var getWeather = (lat, lon, callback) => {
    var url = `https://api.darksky.net/forecast/456a7bef4a5ff8bc2a21474a826b3211/${lat},${lon}`;
    //console.log(url);

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            //console.log(body.currently.temperature);
            callback(undefined, {
                temperature: body.currently.temperature,
                feelsLike: body.currently.apparentTemperature 
            });
        } else {
            //console.log('');
            callback('Unable to fetch weather data.');
        } 
        
    });
};


module.exports.getWeather = getWeather;

