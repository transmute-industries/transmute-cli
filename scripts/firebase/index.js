const path = require("path");

module.exports = vorpal => {
  vorpal
    .command("status", "report on the status of the cli.")
    .action((args, callback) => {
      var unsubscribe = vorpal.T.firebaseApp
        .auth()
        .onAuthStateChanged(function(user) {
          // handle it
          if (user) {
            console.log("🔵  Logged in as:", user.uid);
            unsubscribe();
            callback();
          } else {
            console.log("🔴  Logged out.");
            unsubscribe();
            callback();
          }
        });
    });

  vorpal
    .command("login", "login to firebase with transmute-framework")
    .action(async (args, callback) => {
      await vorpal.T.Firebase.login();
      callback();
    });
};
