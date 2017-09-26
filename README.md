# Transmute CLI

Work in progress pulling out cli from transmute framework.

Combines:

- https://firebase.google.com/docs/functions/config-env
- https://www.npmjs.com/package/dotenv

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

