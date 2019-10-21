const request = require('request')

const met = function(artStuff, callback) {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' +
                 artStuff
    request({ url, json: true }, function(error, response) {
        if(error) {
            callback('Unable to connect to MET API', undefined)
        } else {
            const data = response.body
            if(data.total == 0) {
                callback('No objects found, kiddo', undefined) 
            } else {
                const object = data.objectIDs[0]
                callback(undefined, object)
                console.log(object)
            }
        }
    })
}

const object = function(artThing, callback) {
    const url ='https://collectionapi.metmuseum.org/public/collection/v1/objects/' + 
                artThing
    request({ url, json: true }, function(error, response) {
        if(error) {
            callback('Unable to connect to MET API', undefined)
        } else {
            const data = response.body
            if (data.constituents == null) {
                const info = {
                    artist : 'unknown',
                    title: data.title,
                    year: data.objectEndDate,
                    technique: data.medium,
                    metUrl: data.objectURL
                }
                callback(undefined, info)   
            } else {
                const info = {
                artist : data.constituents[0].name,
                title: data.title,
                year: data.objectEndDate,
                technique: data.medium,
                metUrl: data.objectURL
            }
            callback(undefined, info)   
            }
        }
    })
}

module.exports = {
    met : met,
    object : object
}