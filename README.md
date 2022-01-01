# Personalized Calendar for WCJ...
...and possibly other organizations that use cogwork

## Setup

This repository contains two projects. The javascript (ReactJS) client, and the nodejs-server that provides a middle API between the cogwork API and the client. Both projects require Node.js >= 16.10. I would recommend installing it through [nvm](https://github.com/nvm-sh/nvm#installing-and-updating). Check out the README files in each of the project for further install and deploy instructions.

The client also contains WIP files for a wordpress plugin. When it's finished, there will be no need for a separate server api, so the server directory will be removed and all the content inside client will be moved to the root folder. 