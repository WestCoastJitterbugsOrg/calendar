# WCJ Calendar client

To get started, make sure you have Node.js >= 16.10 and [yarn](https://yarnpkg.com/getting-started/install) installed.

Now, run `yarn`. This will install all dependencies needed to get you started. 

## Fullscreen local development environment

In the client directory, run `yarn start`. It should open a browser at http://localhost:3000. 

## Wordpress plugin

I'm working on porting the whole project to a wordpress plugin, so that no server is needed. At the moment the server is still required though, so make sure to deploy it in another process.

You can try this out locally or deploy it to https://wcj.se/. When you have it deployed, go ahead and activate in the admin page and add it to a page by using the shortcode `[wcjcal]`.

### Setting up a local wordpress development and deploying the plugin to it

If you don't have PHP installed, follow the instructions [here](https://www.php.net/manual/en/install.php). Then, make sure you have wp-cli installed by following [these instructions](https://make.wordpress.org/cli/handbook/guides/installing/). Run `wp-init.sh` to initialize a wordpress site inside the wp-build directory.

Now, run `yarn build` followed by `cp `

To serve the wordpress site, run `wp server --path=wp-build`

Go to http://localhost:8080/wp-admin and sign in using "admin" as both user and password.

### Production plugin deployment
If you want to deploy it to https://wcj.se, run `yarn build:prod`. 

...more info coming