const express = require('express');
const app = express();
const path = require('path');
app.use("/personal-calendar", express.static(path.join(__dirname, 'dist/prod')));

app.listen('8080');

console.log("Listening route /personal-calendar on port 8080");