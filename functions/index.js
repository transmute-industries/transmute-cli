const functions = require('firebase-functions');
const querystring = require("querystring");
const url = require("url");
const cors = require('cors')({ origin: true });
const user_functions = require('./src')

exports.echo = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        let response = user_functions['echo']({
            name: 'echo',
            query: querystring.parse(url.parse(req.url).query),
            body: req.body
        });
        res.status(200).json(response);
    });
});

