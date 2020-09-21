# Personalized Calendar for WCJ...
...and possibly other organizations that use dans.se

## Setup

Make sure you have NodeJS installed. At the time of writing, I'm using v14.9.0, which is the only version that has been tested so far.

With NodeJS installed, run `npm i` in the root directory of this project. This will install all dependencies you need.

## Run in local development environment

Simply run `npm run serve:dev` and go to `http://localhost:1234/` in your browser. As soon as you make a change in a file, the server will reload the website. 

## Run in production environment

Run `npm run build:prod` to build the project and generate files in `dist`. If successful, you should be able to run `npm run serve:prod` and go to `http://localhost:8080`
