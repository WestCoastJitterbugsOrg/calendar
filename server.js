const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
var parseString = require('xml2js').parseString;
const fs = require('fs')

app.use("/personal-calendar", express.static(path.join(__dirname, 'dist/prod')));


console.log("Listening route /personal-calendar on port 8080");

app.get("/personal-calendar/ma-events", handleDanSeData('https://dans.se/xml/?type=events&org=ma&pw='));

var pw = fs.readFileSync('wcjpassword', 'utf8');
app.get("/personal-calendar/wcj-events", handleDanSeData(`https://dans.se/xml/?type=events&org=wcj&pw=${pw}`));


app.listen('8080');


function handleDanSeData(url) {
    return function (req, res) {
        https.get(url, (resp) => {
            let data = '';
            
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                parseString(data, function (err, result) {
                    const events = result?.cogwork?.events[0]?.event;
                    res.send(events);
                })

            });

        })
    }
}