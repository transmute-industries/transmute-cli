# Transmute CLI 
 
Work in progress CLI. 
 
### Getting Started 
 
``` 
$ npm install -g transmute-cli@latest  
$ yarn global add transmute-cli@latest
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
$ yarn transmute gen-web js ../secrets/firebaseConfig.json ./environment.web.js
```

#### TypeScript 
```
$ yarn transmute gen-node ts dapp ../secrets/environment.secret.env ./environment.node.ts
$ yarn transmute gen-web ts ../secrets/firebaseConfig.json ./environment.web.ts
```

#### Misc
```
$ yarn transmute gen-mask ./environment.secret.env ./environment.example.env 
$ yarn transmute mig-env firebase transmute ./environment.secret.env 
```
 
#### Reading 
 
- https://firebase.google.com/docs/functions/config-env 
- https://www.npmjs.com/package/dotenv