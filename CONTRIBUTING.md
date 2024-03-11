# Contributing

To get started, make sure you have the following installed:

1. Node.js (check package.json "engines" for version, I recommend using [nvm](https://github.com/coreybutler/nvm-windows#readme) for managing Node.js versions)
2. [Docker Engine](https://docs.docker.com/engine/install/)

I recommend using VS Code and installing the workspace recommendations.

Now run `npm i`, this will install all dependencies.

Make sure you have docker running. Now run `npm run dev` and Wait for the output to say:

> @cwfc/wordpress:setup-env: WordPress development site started at http://localhost:8888

Or something similar.

The plugin should become available in the wordpress installation. Go to <http://localhost:8888/wp-admin>
to make sure. The default user is `admin` and the password is `password`. Create a new page and add a new block "Cw Filter Calendar".
On the side panel to the right, you should add the organization and password. These are credentials used for CogWork/dans.se/minaaktiviteter.se.
If you don't know it, contact the IT responsible for your organization and explain why you should be trusted.
For WCJ (West Coast Jitterbugs), contact it@wcj.se.
