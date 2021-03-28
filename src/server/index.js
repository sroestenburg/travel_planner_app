const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js')
const http = require('http');
const https = require('https');

dotenv.config();
const backEndPort = 8081;
console.log(process.env.GEONAMES_USER);

const weatherApi ={
    application_key: process.env.API_KEY
};
const geoNames ={
    username: process.env.GEONAMES_USER
}
const pixabay ={
    key: process.env.KEY
}

let travelRequests = [];

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(backEndPort, function () {
    console.log('Example app listening on port ' + backEndPort)
})

app.post('/test', bodyParser.json(), function (req, res) {
    res.send(mockAPIResponse)
})


app.post('/weatherData',bodyParser.json(), function (req, res) {
    // console.log(req);
    // console.log(req.body);
    travelRequests.push(req.body);
    // 1. Call Geonames API
    // 2. Call WeatherApi
    console.log(req.body);
    resolveLocation(req.body, res);
   
})

function resolveLocation(userInput, res) {
               
    let path = "/searchJSON?q=" + encodeURI( userInput.location ) + "&maxRows=1&username=" + geoNames.username ;
    // console.log(path);

    var options = {
        host: 'api.geonames.org',
        path: path,
        method: 'GET'
    };

    function callback(response) {
        let geoDataStream = '';

        //another stream of data has been received, so append it to `dataStream`
        response.on('data', function (stream) {
            geoDataStream += stream;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function () {
            // response from GeoNames
            // if location was resolved, call getWeatherData
            console.log(geoDataStream)
            console.log(JSON.parse(geoDataStream));
            let geoData = JSON.parse(geoDataStream);
            console.log(geoData);

            if (geoData != null && geoData.geonames != undefined){
                let geoLoc = {
                    lng: geoData.geonames[0].lng, 
                    lat: geoData.geonames[0].lat
                };
                console.log(geoLoc);
                getWeatherData(geoLoc, userInput, res)
            }
            //res.send(geoDataStream)
        });
    }

    http.request(options, callback).end();
}

function getWeatherData(geoLoc, userInput, res) {
    // geoLoc.lat geoLoc.lng
    console.log(new Date())
    let today = new Date();
    let path = "/v2.0/current" + "?lat=" + geoLoc.lat + "&lon=" + geoLoc.lng + "&key=" + weatherApi.application_key;
    // console.log(path);

    var options = {
        host: "api.weatherbit.io",
        path: path,
        method: 'GET'
    };

    callback = function(response) {
        let weatherDataStream = '';

        //another stream of data has been received, so append it to `dataStream`
        response.on('data', function (stream) {
            weatherDataStream += stream;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function () {
            // response from weatherBit
            //console.log(weatherDataStream)
            res.send(weatherDataStream)
        });
    }

    http.request(options, callback).end();
}


app.post('/pixabay',bodyParser.json(), function (req, res) {
    console.log("this is pixabay");
    console.log(req.body);
    getPixImage(req.body.location, res);
   
})

function getPixImage(location, res) {
               
    let path = "/api/?key=" + pixabay.key + "&q=" + encodeURI( location ) + "&image_type=photo";
    console.log(path);

    var options = {
        host: "pixabay.com",
        path: path,
        method: 'GET'
    };

    callback = function(response) {
        let pixDataStream = '';

        //another stream of data has been received, so append it to `dataStream`
        response.on('data', function (stream) {
            console.log(stream);
            pixDataStream += stream;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function () {
            // here response from pixabay
            console.log("pixDataStream")
            console.log(pixDataStream)
            res.send(pixDataStream)
        });
    }

    https.request(options, callback).end();
}

