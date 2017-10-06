# Transmute CLI

Work in progress CLI.

### Getting Started

```
$ npm install -g transmute-cli@latest 
```

#### Dev Commands
```
$ npm install -g firebase-tools
$ npm install
$ firebase init
$ yarn test-bin gen-env js transmute ./environment.secret.env ./environment.constants.js
$ yarn test-bin gen-env ts transmute ./environment.secret.env ./environment.constants.ts
$ yarn test-bin gen-env mask transmute ./environment.secret.env ./environment.example.env
$ yarn test-bin mig-env firebase transmute ./environment.secret.env
$ yarn test-bin install globals
$ yarn test-bin serve

```

#### Reading

- https://firebase.google.com/docs/functions/config-env
- https://www.npmjs.com/package/dotenv