

const functions = require('firebase-functions');

const SECRET_ENV_PATH = './secret.env';
let IS_LOCAL = true;

try {
    let config = functions.config();
    IS_LOCAL = false;
} catch (e) {
    require('dotenv').config({ path: SECRET_ENV_PATH });
}

const SECRET_VAR_1 = (IS_LOCAL) ? process.env.SECRET_VAR_1 : config.transmute.secret_var_1;
const SECRET_VAR_2 = (IS_LOCAL) ? process.env.SECRET_VAR_2 : config.transmute.secret_var_2;

module.exports = {
    SECRET_VAR_1,
	SECRET_VAR_2
}
        
        