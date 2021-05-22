const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
var xmlParser = require('xml2json');

app.use("/personal-calendar", express.static(path.join(__dirname, 'dist/prod')));

app.listen('8080');

console.log("Listening route /personal-calendar on port 8080");

app.get("/wcj-events", function (req, res) {
    https.get('https://dans.se/xml/?type=events&org=wcj&pw=vrenskzizity', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            var json = JSON.parse(xmlParser.toJson(data));
            console.log(json?.cogwork?.events?.event);
            res.send(json?.cogwork?.events?.event);
        });

    })
})