var express = require('express');
var app = express();

const config = require('../config.json')

function start_server() {
    if (!(Object.keys(config).includes("WEB_PORT"))) return
    var server = app.listen(config.WEB_PORT, () => {
        console.log(`-Web server port: ${server.address().port}`)
    })


    /*               ROUTES                       */
    app.get('/test', function (req, res) {
        res.send('Hello World');
    })

    app.get('/', function (req, res) { // home
        res.sendFile(__dirname + "/views/index.html");
    })
}



module.exports = {
    start_server
}
