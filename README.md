# About this project

This is a web calendar that fetches information from dans.se (or other CogWork API) 
and allows users to filter on courses, dance styles and more. At the moment it's a 
wordpress plugin that can be included on any page by using the shortcode `[wcjcal]`, 
but it shouldn't be impossible to create a standalone PHP application.

It's used by the Gothenburg swing dance association "WCJ" at https://wcj.se/kalender/. 
Work is done to allow all clubs using CogWork to use it. 

# Contributing

To get started, make sure you have Node.js >= 16.10 and [yarn](https://yarnpkg.com/getting-started/install) installed.

Now, run `yarn`. This will install all dependencies needed to get you started.

## Standalone local development environment

There are no documented instructions to get this going yet. I might add it later.

## Wordpress plugin

You can run the plugin locally or deploy it to https://wcj.se/, see below for the steps to run/deploy it. 
When you have done that, go ahead and activate in the admin page, go to the settings page for WCJ Calendar and 
type the organization's password. Then you can add it to a page by using the shortcode `[wcjcal]`.

### Setting up a local wordpress development and deploying the plugin to it

Install docker and docker-compose. Run `yarn start:wordpress`. In another terminal, run `docker-compose up -d`. Go to http://localhost:8000/wp-admin/install.php and set up the wordpress installation 
with the credentials found in docker-compose.yml.

### Production plugin deployment

If you want to deploy it to https://wcj.se, run `yarn build:prod` and copy the files from the build folder to the a 
directory named wcjcal inside the wp-content directory on the server.
