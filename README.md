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
$ yarn transmute login
$ yarn transmute echo 'hello' 
$ yarn transmute gen-env js transmute ./environment.secret.env ./environment.constants.js 
$ yarn transmute gen-env ts transmute ./environment.secret.env ./environment.constants.ts 
$ yarn transmute gen-env mask transmute ./environment.secret.env ./environment.example.env 
$ yarn transmute mig-env firebase transmute ./environment.secret.env 
$ yarn transmute serve 
$ yarn transmute firestore 
$ yarn transmute accounts 
$ yarn transmute sign -m "100:0x6e13dbe820cdf54f79bde558ab1a6b6ff2261b42" 
$ yarn transmute sign -m "sign:0x6187a9e0fc30a546e7243c600518c098773f2f846a87c81a4831ffd03a9bd941"

$ yarn transmute recover -m <msg> -s <sig> 
$ yarn transmute patch
$ yarn transmute unpatch
 
``` 
 
#### Reading 
 
- https://firebase.google.com/docs/functions/config-env 
- https://www.npmjs.com/package/dotenv