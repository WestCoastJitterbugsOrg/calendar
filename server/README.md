# Setup server

Run `npm i`. 

You will need to add a file called `wcjpassword` into server/src with the password for calls to cogwork's api. 

It's possible to run both the server and the client in a couple of different environments. 

## Running the server in a local development environment

`npm start` in the server directory will start a local development server that will listen to api calls on port 8081. 

## Building the server for production

Running `npm run build:prod` in the server directory will compile the NodeJS server into the dist direcotry which can then be deployed.