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
transmute setup
```

If you have configs stored somwhere, you can use them like this:

```sh
transmute setup --from ~/Code/secrets/.transmute/
```

## Usage

### Basic

Just a front end app, using transmute hosted services (this repo).

```
transmute init --basic .
```

This will create a new dapp, which is configured to use transmute industries hosted functions, ethereum and ipfs. This app provides a pure front end development experience for users who do not wish to configure functions, ethereum or ipfs, but who do wish to develop against hosted version of these services.


### Advanced

Dockerized app, api, ipfs and ethereum, fully configurable boilerplate.

```
transmute init --advanced .
```

This will create a new dapp, which contains these functions, as well as docker configurations for ethereum, ipfs and a demo web app. This boilerplate is meant to be a starting point for developers, not all of these services may be desired.


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
$ yarn transmute gen-web js ./environment.web.js
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

