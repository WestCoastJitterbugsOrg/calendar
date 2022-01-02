# WCJ Calendar client

To get started, make sure you have Node.js >= 16.10 and [yarn](https://yarnpkg.com/getting-started/install) installed.

Now, run `yarn`. This will install all dependencies needed to get you started.

## Standalone local development environment

In the client directory, run `yarn start:standalone`. It should open a browser at http://localhost:3000.

## Wordpress plugin

I'm working on porting the whole project to a wordpress plugin, so that no server is needed. At the moment the server is still required though, so make sure to deploy it in another process.

You can try this out locally or deploy it to https://wcj.se/. When you have it deployed, go ahead and activate in the admin page and add it to a page by using the shortcode `[wcjcal]`.

### Setting up a local wordpress development and deploying the plugin to it

Install docker and docker-compose. Run `yarn start:wordpress`. In another terminal, run `docker-compose up -d` with elevated permissions (root/admin). Go to http://localhost:8000/wp-admin/install.php and set up the wordpress installation with the credentials found in docker-compose.yml. In the wodpress admin view, activate the plugin. You should now be able to use the shortcode.

### Production plugin deployment

If you want to deploy it to https://wcj.se, run `yarn build:prod`.

...more info coming
