# Sample Angular 2 application with OAuth2 authentication and REST backend

[![Build Status](https://travis-ci.org/selakavon/angular2-rest-oauth-localstorage.svg?branch=master)](https://travis-ci.org/selakavon/angular2-rest-oauth-localstorage)

Try it on Heroku: https://joggingtracker-ui-angular2.herokuapp.com/ 
* Registed new user or use admin/admin credentials
* REST api calls proxied to - https://joggingtracker.herokuapp.com

### Authentication
OAuth2 with access-token stored in local-storage

### Building

````sh
npm install
````

##### Developer build

Compiles Typescript to **build/js** directory.

````sh
npm run build
````

##### Production build

Compiles TS, browserify and packages application to **dist** directory.

````sh
npm run build-dist
````

### Running

To run this application you need to connect it to a backend such as [spring-rest-oauth2-mongo](https://github.com/selakavon/spring-rest-oauth2-mongo).
See below for proxy configuration. 
In real life you would deploy both backend and the frontend in one container, this is a modular approach for demonstration purposes.

##### Developer mode

Runs browsersync using index.html and build/js scripts.
BS is configured to access backend REST api through proxy to avoid CSRF complications during development (see bs-config.js).

````sh
npm run start-dev
````

##### Production mode

Runs app.js node application providing:
* public access to angular script files
* proxied access to api
* sends index.html for every other path

````sh
npm start
````
