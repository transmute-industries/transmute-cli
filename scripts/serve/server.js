const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const querystring = require("querystring");

let cwd = process.cwd();
let env, functions;

try {
  functions = require(path.join(cwd, "./functions/src"));
} catch (e) {
  throw Error(e);
}

try {
  env = require(path.join(cwd, "./environment.constants"));
} catch (e) {
  throw "expect serve to be run from a directory with environment.constants.js in it.";
}

const db = env.firebaseAdmin.firestore();

const HOST = env.TRANSMUTE_API_HOST || "0.0.0.0";
const PORT = env.TRANSMUTE_API_PORT || "3001";

const extractParams = async request => {
  var pathname = url.parse(request.url).pathname;
  let requestBodyJson = await new Promise((resolve, reject) => {
    let result = "";
    request
      .on("data", function(data) {
        result += data;
      })
      .on("end", async () => {
        try {
          let response;
          if (result) {
            response = JSON.parse(result);
          } else {
            response = {};
          }
          resolve(response);
        } catch (e) {
          // handle json parse errors better!!!
          reject(e);
        }
      });
  });
  return {
    name: pathname,
    query: querystring.parse(url.parse(request.url).query),
    body: requestBodyJson,
    db,
    admin: env.firebaseAdmin,
    env
  };
};

async function onRequest(request, response) {
  var pathname = url.parse(request.url).pathname;
  var functionName = pathname.split("/")[1];
  let headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
  if (functionName === "favicon.ico") {
    fs
      .createReadStream(path.join(__dirname, "..", "favicon.ico"))
      .pipe(response);
  } else {
    if (functions[functionName]) {
      let functionParams = await extractParams(request);
      let functionResponse = await functions[functionName](functionParams);

      // console.log(request.url);
      // console.log(_.omit(functionParams, "db", "admin"), functionResponse);

      if (!functionResponse.redirect) {
        response.writeHead(functionResponse.status, headers);
        response.end(JSON.stringify(functionResponse));
      } else {
        response.writeHead(302, {
          Location: functionResponse.redirect
          //add other headers here...
        });
        response.end();
      }
    } else {
      console.log('function: "', functionName, '" not found.');
      response.writeHead(404, headers);
      response.end(
        JSON.stringify({
          status: 404,
          message: "function not found!"
        })
      );
    }
  }
}
console.log("Server has started and listening on : " + HOST + ":" + PORT);
http.createServer(onRequest).listen(PORT, HOST);
