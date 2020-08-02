const request = require('request')
const chalk = require('chalk')
const forecast = (lat, long, callback) => {
    const url = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${long}&key=de0f5cff14454e7fa592391cb2978f2f&lang=en`
    request({ url: url, json: true }, (e, { body }) => {
        var { error, data } = body
        data = data[0]
        if(e) {
            callback(chalk.red.inverse('Unable to connect to the weather API..!'), undefined)
        } else if( error ){
            callback(chalk.redBright.inverse('Unable to find location..!'), undefined)
        }else{
            callback(undefined, {
                temp:   data.temp,
                desc:   data.weather.description,
                precip:   data.precip,
                ob_time:   data.ob_time
            })
        }
    })
}

module.exports = forecast