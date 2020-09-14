const express = require('express');
const app = express();
const path = require('path');

app.use("/personal-calendar", express.static(path.join(__dirname, 'public')));

app.listen('8080');