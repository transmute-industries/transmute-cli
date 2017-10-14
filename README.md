# Transmute CLI 
 
Work in progress CLI. 

Very alpha, expect breaking changes...
 
### Getting Started 
 
``` 
$ npm install -g transmute-cli@latest  
$ yarn global add transmute-cli@latest
``` 

If you are brand new, you will need to setup some files, after running:

```
transmute setup --reset
```

### Setup from Local .transmute
```sh
transmute setup --reset --from ~/Code/secrets/.transmute/
mkdir smoke && cd smoke
transmute init .
cd dapp
yarn install
```

#### Serve Functions Locally
```sh
transmute serve
```

#### Start App 
```sh
yarn start
```

#### Security Rules

Use firestore.rules to restrict access to everything stored by the framework.

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Dev Commands 
``` 
$ npm install 
$ firebase init 
$ yarn transmute install globals 
$ yarn transmute login
$ yarn transmute echo 'hello' 

$ yarn transmute serve 
$ yarn transmute firestore 
$ yarn transmute accounts 
$ yarn transmute sign -m "100:0x6e13dbe820cdf54f79bde558ab1a6b6ff2261b42" 
$ yarn transmute sign -m "sign:0x6187a9e0fc30a546e7243c600518c098773f2f846a87c81a4831ffd03a9bd941"

$ yarn transmute recover -m <msg> -s <sig> 
$ yarn transmute patch
$ yarn transmute unpatch
 
``` 

### Environment Commands

#### JavaScript 
```
$ yarn transmute gen-node js dapp ../secrets/environment.secret.env ./environment.node.js
$ yarn transmute gen-web js ../secrets/firebase-client-config.json ./environment.web.js
```

#### TypeScript 
```
$ yarn transmute gen-node ts dapp ../secrets/environment.secret.env ./environment.node.ts
$ yarn transmute gen-web ts ../secrets/firebase-client-config.json ./environment.web.ts
```

#### Misc
```
$ yarn transmute gen-mask ./environment.secret.env ./environment.example.env 
$ yarn transmute mig-env firebase transmute ./environment.secret.env 
```


### TestRPC with ngrok

```yml
authtoken: TOKEN
tunnels:
  functions:
    addr: 3001
    proto: http
    hostname: functions.transmute.industries

  testrpc:
    addr: 8545
    proto: http
    hostname: testrpc.transmute.industries
```

```sh
ngrok start testrpc functions
```


 
#### Reading 
 
- https://firebase.google.com/docs/functions/config-env 
- https://www.npmjs.com/package/dotenv

