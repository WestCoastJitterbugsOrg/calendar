# Contributing

To get started, make sure you have the following installed:

1. Node.js >= 18.14 (npm >= 8.19.2)
2. [Docker Engine](https://docs.docker.com/engine/install/)

I recommend using VS Code and installing the workspace recommendations.

Now run `npm i`, this will install all dependencies.

Create a file called `.wp-env.override.json` and fill it with the following:

```json
{
    "config": {
        "cwfc_options.org": <organization code>,
        "cwfc_options.apikey": <organization api key>
    }
}
```

The organization code/key is for CogWork/dans.se/minaaktiviteter.se. If you don't know it, contact the IT responsible for your
organization and explain why you should be trusted. For WCJ (West Coast Jitterbugs), contact it@wcj.se.

We'll need to setup a local wordpress environment for debugging. But before that, we have to populate the plugin bundle
inside the build directory so that the wordpress environment can find our plugin. To do this, run `npm build`. If that
fails, you can manually copy `src/cw-filter-calendar.php` to `build/cw-filter-calendar` (create the folders if they don't exist).

Now run `npm run setup-env`. This will host Wordpress on <http://localhost:8888>.

By running `npm start`, the plugin should become available in the wordpress installation. Go to <http://localhost:8888/wp-admin>
to make sure. The default user is `admin` and the password is `password`.

If you run this in vs code, you can press F5 in order to connect the debugger. Now you can add breakpoints in the PHP code
inside the `src` folder.
