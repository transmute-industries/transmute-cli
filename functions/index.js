const functions = require('firebase-functions');
const querystring = require("querystring");
const url = require("url");
const cors = require('cors')({ origin: true });
const user_functions = require('./src');
const env = require('./environment.node');

exports.echo = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        let response = user_functions['echo']({
            name: 'echo',
            query: querystring.parse(url.parse(req.url).query),
            body: req.body,
            env
        });
        if (!response.redirect) {
            res.status(response.status).json(response);
        } else {
            res.redirect(response.redirect)
        }
    });
});

exports.token = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        let response = user_functions['token']({
            name: 'token',
            query: querystring.parse(url.parse(req.url).query),
            body: req.body,
            env
        });
        if (!response.redirect) {
            res.status(response.status).json(response);
        } else {
            res.redirect(response.redirect)
        }
    });
});

