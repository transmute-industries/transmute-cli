var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
const querystring = require("querystring");

const HOST = process.env.TRANSMUTE_API_HOST || '0.0.0.0';
const PORT = process.env.TRANSMUTE_API_PORT || '3001';

const functions = require('./src')

const extractParams = async (request) => {
    var pathname = url.parse(request.url).pathname;
    let requestBodyJson = await new Promise((resolve, reject) => {
        let result = ''
        request.on('data', function (data) {
            result += data;
        }).on('end', async () => {
            try {
                let response
                if (result) {
                    response = JSON.parse(result)
                } else {
                    response = {}
                }
                resolve(response)
            } catch (e) {
                // handle json parse errors better!!!
                reject(e);
            }
        });
    })
    return {
        name: pathname,
        query: querystring.parse(url.parse(request.url).query),
        body: requestBodyJson
    }
}

async function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var functionName = pathname.split("/")[1];
    let headers = { "Content-Type": "application/json" };
    if (functionName === 'favicon.ico') {
        fs.createReadStream(path.join(__dirname,'..', 'favicon.ico')).pipe(response);
    } else {
        if (functions[functionName]) {
            let functionParams = await extractParams(request)
            let functionResponse = await functions[functionName](functionParams)
            console.log(functionParams, functionResponse);
            response.writeHead(200, headers);
            response.end(JSON.stringify(functionResponse));
        } else {
            console.log('function: "', functionName, '" not found.');
            response.writeHead(404, headers);
            response.end(JSON.stringify({
                status: 404,
                message: 'function not found!'
            }));
        }
    }
}

console.log("Server has started and listening on : " + HOST + ":" + PORT);
http.createServer(onRequest).listen(PORT, HOST);


