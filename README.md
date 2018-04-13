## The Great Escape API / React App

React Web project with ExpressJS on NodeJS

[![](https://img.shields.io/badge/bluemix-powered-blue.svg)](https://bluemix.net)
![Platform](https://img.shields.io/badge/platform-NODE-lightgrey.svg?style=flat)

### Table of Contents
* [Summary](#summary)
* [Requirements](#requirements)
* [Configuration](#configuration)
* [Run](#run)
* [Debug](#debug)

<a name="summary"></a>
### Summary
The React web starter contains an opinionated set of components for modern web development, including:

* [React](https://facebook.github.io/react/)
* [Webpack](https://webpack.github.io/)
* [Sass](http://sass-lang.com/) 
* [Babel](https://babeljs.io/) for ECMAScript 2015 (ES2015) 
* [gulp](http://gulpjs.com/)

React is a framework for creating user interfaces in modular components.

### Documentation
Simple TGE API Documentation can be found
[here](tge.mybluemix.net/docs/server/routes/index.html)
 

<a name="requirements"></a>
### Development Requirements
#### Local Development Tools Setup (optional)

- Install the latest [NodeJS](https://nodejs.org/en/download/) 6+ LTS version.

#### IBM Cloud development tools setup (optional)

1. Install [Docker](http://docker.io) on your machine.
2. Install the [IBM Cloud CLI](https://console.ng.bluemix.net/docs/cli/index.html)
3. Install the plugin with:

  `bx plugin install dev -r bluemix`

<a name="configuration"></a>
### Configuration

The project contains IBM Cloud specific files that are used to deploy the application as part of an IBM Cloud DevOps flow. The `.bluemix` directory contains files used to define the IBM Cloud toolchain and pipeline for your application. The `manifest.yml` file specifies the name of your application in IBM Cloud, the timeout value during deployment, and which services to bind to.

Service credentials are taken from the VCAP_SERVICES environment variable if running IBM Cloud Cloud Foundry, from individual environment variables per service if running on IBM Cloud Container Service (see ./server/config/mappings.json), or from a config file if running locally, named`./server/config/localdev-config.js`.


<a name="run"></a>
### Run

Running the Node application both serves the TGE API, as well as the webpack-ed React application that serves as the Admin Portal.

When running the application locally, the admin portal homepage can be found at ```localhost:3000```, and all API endpoints at their respective routes as defined in the `server/routes` directory.

The entry point of the Node app is ```server/server.js```, and you can spin it up with any of the following commands: 

```
npm start

node server/server.js

npm run reset
```

IMPORTANT: ```npm run reset``` clears out the SQL database and reloads the web app. It is useful only during initial development when making changes to the database schema.

### Run Frontend Web App Only

The entry point of the React app is ```client/index.jsx```, and you if you want to exclusively run it with webpack-dev-server (for rapid development with Hot Module Replacement) you can use this command: 

```
npm run live-reload
```

The ```live-reload``` script serves the web application at http://0.0.0.0:8080/, and will update as you make changes to the .jsx and .scss files.

#### Using IBM Cloud development CLI
The IBM Cloud development plugin makes it easy to compile and run your application if you do not have all of the tools installed on your computer yet. In this situation, your application will be compiled with Docker containers, similarly to how it will be built when publishing to IBM Cloud. To compile and run your app, run:

```bash
bx dev build
bx dev run
```

Note: If you encounter `'dev' is not a registered command. See 'bx help'.` make sure you have installed the IBM Cloud CLI:

On macOS and Linux:
```
curl -sL https://ibm.biz/idt-installer | bash
```
Windows:
```
Set-ExecutionPolicy Unrestricted; iex(New-Object Net.WebClient).DownloadString('http://ibm.biz/idt-win-installer')
```

#### Using your local development environment

Modern web applications require a compilation step to prepare your ES2015 JavaScript or Sass stylesheets into compressed Javascript ready for a browser. Webpack is used for bundling your JavaScript sources and styles into a `bundle.js` file that your `index.html` file can import. 

***Webpack***

For development mode, use `webpack -d` to leave the sources uncompress and with the symbols intact.

For production mode, use `webpack -p` to compress and obfuscate your sources for development usage.

***Gulp***

Gulp is a task runner for JavaScript. You can run the above Webpack commands in by running:

```bash
gulp
```


##### API Endpoints

Your application will be running at: `http://localhost:3000` locally, or `http://tge.mybluemix.net` if published to IBM Cloud.

- Health endpoint: `/appmetrics-dash`
- Cart endpoint: `/cart`
- New Arrivals endpoint: `/feed`
- Items endpoint: `/items`
- Orders endpoint: `/orders`
- Users endpoint: `/users`

The `/routes/public` "endpoint" in routes forwards requests for the web app and static resources to the `public` directory so they can be served appropriately. This setup is what keeps the entire system bundled into one Node environment.


##### Session Store
You may see this warning when running `bx dev run`:
```
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
```
When deploying to production, it is best practice to configure sessions to be stored in an external persistence service.

<a name="debug"></a>
### Debug

#### Using IBM Cloud development CLI
To build and debug your app, run:
```bash
bx dev build --debug
bx dev debug
```

