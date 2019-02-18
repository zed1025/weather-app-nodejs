/*
    - Unable to add error handling for invalid address due to insufficient information in the api data
        - Use valid address or zip-code or the program might crash
    - API Info for MapQuest
        GeoLocation by Address API
        http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=Washington,DC
        API Key: oaOZGVFqXXCAL915svsgS4V1LudAs1ue
    - API Info for DarkSky API
        API Key: 456a7bef4a5ff8bc2a21474a826b3211
        https://api.darksky.net/forecast/[key]/[latitude],[longitude]
*/


const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
    .options({
        a : {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true    //always treat 'address' flag as a string
        }
    })
    .help()
    .alias('help', 'h')
    .argv; 
//console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.feelsLike}.`);
            }
        });
    }
});




