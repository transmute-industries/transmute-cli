
var env = require('../../environment.constants')

module.exports = (callback) => {
    console.log('echo!');
    console.log(env);
    callback();
}