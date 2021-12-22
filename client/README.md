# WCJ Calendar client

To get started, make sure you have Node.js >= 16.10 and [yarn](https://yarnpkg.com/getting-started/install) installed.

Now, run `yarn`. This will install all dependencies needed to get you started. 

## Fullscreen local development environment

In the client directory, run `yarn start`. It should open a browser at http://localhost:3000. 

## Wordpress plugin

I'm working on porting the whole project to a wordpress plugin, so that no server is needed. You can try this out locally or deploy it to https://wcj.se/

### Setting up a local wordpress development and deploying the plugin to it

If you don't have PHP installed, follow the instructions [here](https://www.php.net/manual/en/install.php). Then, make sure you have wp-cli installed by following [these instructions](https://make.wordpress.org/cli/handbook/guides/installing/). Run `wp-init.sh` to initialize a wordpress site inside the wp-plugin directory.

Now, run `yarn build` followed by `cp `

To serve the wordpress site, run `wp server --path=wp-plugin`

If you run a wordpress server locally through something like VVV, run `yarn build` in the client directory. If you want to deploy it to https://wcj.se, run `yarn build:prod`. 

In the wp-content/plugins directory of you wordpress install, create a new directory named wcj-calendar. Copy wcj-calendar.php and client/build to it. 

Go to the wordpress admin page and activate the plugin. You can now add it by using the shortcode `[wcjcal]`