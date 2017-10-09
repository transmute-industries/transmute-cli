#!/usr/bin/env node
const vorpalLog = require("vorpal-log");
const vorpalTour = require("vorpal-tour");
const rc = require("vorpal-rc");
const vorpal = require("vorpal")();
const shell = require("shelljs");
const path = require("path");
const webEnvPath = path.join(process.cwd(), "./environment.web");
const os = require("os");
// https://github.com/vorpaljs/vorpal-tour/
// https://github.com/AljoschaMeyer/vorpal-log/
// https://github.com/subk/vorpal-rc

let T;
try {
  T = require(webEnvPath).TransmuteFramework;
} catch (e) {
  console.log(
    "Could not require require transmute framework from a local environment.web"
  );
}

vorpal.T = T;
vorpal.logger = vorpal.logger;

vorpal
  .use(rc, path.join(os.homedir(), ".awesomerc"))
  .use(vorpalLog)
  .use(vorpalTour, {
    command: "tour",
    tour: function(tour) {
      // Colors the "tour guide" text.
      tour.color("cyan");

      // Adds a step to the tour:
      // .begin spits user instructions when the step starts
      // .expect listens for an event. The function it calls
      //   expects a `true` to be called in order for the step
      //   to finish.
      // .reject spits text to the user when `false` is returned
      //   on an `.expect` callback.
      // .wait waits `x` millis before completing the step
      // .end spits text to the user when the step completes.
      tour
        .step(1)
        .begin('Welcome to the tour! Run "accounts".')
        .expect("command", (data, cb) => {
          cb(data.command === "accounts");
        })
        .reject('Uh.. Let\'s type "foo" instead..')
        .wait(500)
        .end("\nNice! Wasn't that command just amazing?\n");

      // A delay in millis between steps.
      tour.wait(1000);

      // Ends the tour, spits text to the user.
      tour.end("Very well done!");

      return tour;
    }
  })
  .delimiter("🦄   $")
  .show()
  .parse(process.argv);

require("./scripts")(vorpal);
