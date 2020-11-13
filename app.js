// jshint esversion: 6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req,res) => {
    const cityName = req.body.cityName;
    const apiKey = 'b4137cec08dc4f5dbd2140826201211';
    const query = cityName.capitalize();
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`; 

    https.get(url, (response)=>{
    // console.log(response.statusCode);

    response.on('data', (data) => {
        const weatherData = JSON.parse(data);
        const  temp = weatherData.current.temp_c;
        const weatherDescription = weatherData.current.condition.text;
        const icon = weatherData.current.condition.icon;
        res.write('<p>The weather is currently ' + weatherDescription + '</p>');
        res.write('<h1>The temperature is ' + query + ' is ' + temp + ' degrees Celcius.</h1>');
        res.write(`<img src="${icon}">`);
        res.send();
    });
});

});

app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`);
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

