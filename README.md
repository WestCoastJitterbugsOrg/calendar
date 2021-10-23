# Personalized Calendar for WCJ...
...and possibly other organizations that use cogwork

## Setup

Make sure you have NodeJS installed. At the time of writing, I'm using v14.18.0. You will also need to install yarn.

There are two projects: The server and the client. In the server directory, run `npm i`. In the client directory, run `yarn`. This will install all dependencies needed to get you started. 

You will need to add a file called `wcjpassword` into server/src with the password for calls to cogwork's api. 

It's possible to run both the server and the client in a couple of different environments. 

## Running the server in a local development environment

`npm start` in the server directory will start a local development server that will listen to api calls on port 8081. 

## Building the server for production

Running `npm run build:prod` in the server directory will compile the NodeJS server into the dist direcotry which can then be deployed.

## Running the client in local development environment (fullscreen)

In the client directory, run `yarn start`. It should open a browser at http://localhost:3000. 

## Deploying the client as a wordpress plugin

If you run a wordpress server locally through something like VVV, run `yarn build` in the client directory. If you want to deploy it to https://wcj.se, run `yarn build:prod`. 

In the wp-content/plugins directory of you wordpress install, create a new directory named wcj-calendar. Copy wcj-calendar.php and client/build to it. 

Go to the wordpress admin page and activate the plugin. You can now add it by using the shortcode `[wcjcal]`
