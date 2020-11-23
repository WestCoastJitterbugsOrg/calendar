# Personalized Calendar for WCJ...
...and possibly other organizations that use dans.se

## Setup

Make sure you have NodeJS installed. At the time of writing, I'm using v14.9.0.

With NodeJS installed, run `npm i` in the root directory of this project. This will install all dependencies you need.

## Run in local development environment

Simply run `npm start` and go to `http://localhost:8080/personal-calendar` in your browser. As soon as you make a change in a file, the server will reload the website. 

## Run in production environment

Run `npm run start:prod` and go to `http://localhost:8080/personal-calendar` in your browser. 
This should build the project and generate files in `dist`, and then serve the using server.js. Unlike in development, 
this won't reload the website when you make a change in a file.