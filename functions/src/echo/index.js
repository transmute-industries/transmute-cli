const _ = require("lodash");

module.exports = functionParams => {
  // normally all work would be done here.
  // redirect, body and status are used handled the same way by server and cloud function
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      body: _.omit(functionParams, "env"),
      redirect: null
    });
  });
};
