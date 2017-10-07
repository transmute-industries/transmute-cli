# Transmute CLI

Work in progress CLI.

### Getting Started

```
$ npm install -g transmute-cli@latest 
```

#### Dev Commands
```
$ npm install
$ firebase init
$ yarn transmute install globals
$ yarn transmute echo 'hello'
$ yarn transmute gen-env js transmute ./environment.secret.env ./environment.constants.js
$ yarn transmute gen-env ts transmute ./environment.secret.env ./environment.constants.ts
$ yarn transmute gen-env mask transmute ./environment.secret.env ./environment.example.env
$ yarn transmute mig-env firebase transmute ./environment.secret.env
$ yarn transmute serve
$ yarn transmute firestore
$ yarn transmute accounts
$ yarn transmute sign "100:0x6e13dbe820cdf54f79bde558ab1a6b6ff2261b42"

```

#### Reading

- https://firebase.google.com/docs/functions/config-env
- https://www.npmjs.com/package/dotenv