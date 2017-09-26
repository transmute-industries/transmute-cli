# Transmute CLI

Work in progress pulling out cli from transmute framework.

Combines:

- https://firebase.google.com/docs/functions/config-env
- https://www.npmjs.com/package/dotenv

```
$ npm install
$ npm run start
$ npm run migrate transmute ./environment.secret.env
$ npm run mask ./environment.secret.env
$ npm run js-config transmute ./environment.secret.env
```