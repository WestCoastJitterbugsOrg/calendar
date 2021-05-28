
import cors from 'cors';
import https from 'https';
import { parseString } from 'xml2js';
import fs from 'fs';
import path from 'path';
import express, { RequestHandler } from 'express';
import {google} from 'googleapis'
import gcal2wcj from './gcal';
// rest of the code remains same
const app = express();
const PORT = 8081;


app.use(cors());


app.get("/ma-events", handleDanSeData('https://dans.se/xml/?type=events&org=ma&pw='));

var pw = fs.readFileSync(path.resolve(__dirname, 'wcjpassword'), 'utf8');
app.get("/wcj-events", handleDanSeData(`https://dans.se/xml/?type=events&org=wcj&pw=${pw}`));
// 

app.get("/gcal", async function (req, res) {
    try {
        const events = await google.calendar({
            version: "v3",
            auth: "AIzaSyCMeXBPWfEvrxH4-U8y3VpWhDPZnwYqRMc"
        }).events.list(
            {
                calendarId: "wcj.se_57n2cj034c49cirl0rl20t3io4@group.calendar.google.com",
                alwaysIncludeEmail: false,
                timeMin: req.query["from"]?.toString() || new Date(2019, 8, 1).toISOString(),
                timeMax: req.query["to"]?.toString() || new Date(2019, 11, 1).toISOString()
            });

        res.json(gcal2wcj(events.data.items));
    } catch (x) {
        res.status(500).send(x); throw x;
    }
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});


function handleDanSeData(url: string): RequestHandler {
    return function (req, res) {
        return https.get(url, resp => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk: string) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                parseString(data, function (err, result) {
                    const events = result?.cogwork?.events[0]?.event;
                    res.send(events);
                })

            })
        })
    }
}