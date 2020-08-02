const request = require('request')
const geocoding = (address, callback) => {
    const encodedaddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedaddress}.json?access_token=pk.eyJ1IjoidGFsYWwwMiIsImEiOiJja2RhMnJheWYwZHhqMnByeGdxemo0dnhyIn0.xH44JGlA_xTMqZpejWbJIw&limit=1`
    
    request({ url: url, json: true}, (e, { body } = {}) => {
        var { message, features } = body
        features = features[0]
        if(e) {
            callback('Unable to connect to the location API..!', undefined)
        } else if( message || features === undefined ){
            callback('Location Not Found..! Try Again :)', undefined)
        } else {
            callback(undefined, {
                long:  features.center[0],
                lat:  features.center[1],
                locationName:  features.place_name
            })
        }
    })
}

module.exports = geocoding 