const request = require('request');

const geocode = require('../geocode/geocode.js');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        //console.log(`URL: http://www.mapquestapi.com/geocoding/v1/address?key=oaOZGVFqXXCAL915svsgS4V1LudAs1ue&location=${encodedAddress}`);
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=oaOZGVFqXXCAL915svsgS4V1LudAs1ue&location=${encodedAddress}`,
            json : true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to the MapQuest servers.');
            } else {
                resolve({
                    address: geocode.getAddress(body),
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude:body.results[0].locations[0].latLng.lng
                });
            }
        });
    })
};

geocodeAddress('Surat India').then((location) => {
    console.log(location)
}, (errorMessage) => {
    console.log(errorMessage)
});