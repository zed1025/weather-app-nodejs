const request = require('request');

var getAddress = (body) => {
    var add1 = body.results[0].locations[0].street;
    var add2 = body.results[0].locations[0].adminArea5;
    var add3 = body.results[0].locations[0].postalCode;
    return `${add1} ${add2} ${add3}`;
};


var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    //console.log(`URL: http://www.mapquestapi.com/geocoding/v1/address?key=oaOZGVFqXXCAL915svsgS4V1LudAs1ue&location=${encodedAddress}`);
    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=oaOZGVFqXXCAL915svsgS4V1LudAs1ue&location=${encodedAddress}`,
        json : true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the MapQuest servers.');
        } else {
            callback(undefined, {
                address: getAddress(body),
                latitude: body.results[0].locations[0].latLng.lat,
                longitude:body.results[0].locations[0].latLng.lng
            });
        }
    });
};


module.exports = {
    getAddress,
    geocodeAddress

};
