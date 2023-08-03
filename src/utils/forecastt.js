const request =require('request')

// const latitude = '34.053691'
// const longitude = '-118.242766'
// const url='http://api.weatherstack.com/current?access_key=ba9e1817cdd847211e5a544147e6ea39&query='+latitude+','+longitude

const forecast = (latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=ba9e1817cdd847211e5a544147e6ea39&query='+latitude+','+longitude
    request({url,json:true},(error,{body}={}) =>{
        if(error){
            callback('unable to connect to location',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0])
        }
    })
}


module.exports = forecast