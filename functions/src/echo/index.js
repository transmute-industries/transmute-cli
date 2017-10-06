
module.exports = (functionParams) => {
    // normally all work would be done here.
    // redirect, body and status are used handled the same way by server and cloud function
    return {
        status: 200,
        body: functionParams,
        redirect: null
    }
}