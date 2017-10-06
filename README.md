# Transmute CLI

Work in progress CLI.

### Getting Started

```
$ npm install -g transmute-cli@latest 
```

#### OSX

```
yarn config set prefix /usr/local/
yarn global remove transmute-cli
yarn global add transmute-cli
```

#### Dev Commands
```
$ npm config set prefix /usr/local
$ npm install -g firebase-tools
$ npm install
$ firebase init
$ npm run start
$ npm run migrate transmute ./environment.secret.env
$ npm run mask ./environment.secret.env
$ npm run js-config transmute ./environment.secret.env ./functions/environment.constants.js
```

#### Reading

- https://firebase.google.com/docs/functions/config-env
- https://www.npmjs.com/package/dotenv