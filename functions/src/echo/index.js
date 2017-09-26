
const env = require('../../environment.constants')

module.exports = (functionParams) => {
    return {
        echo: functionParams,
        env
    }
}