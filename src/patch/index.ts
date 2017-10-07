const path = require("path");

import { add, remove } from "./commands/moveDirectory";
import { patchFiles, unpatchFiles } from "./commands/patchFiles";

export default vorpal => {
  vorpal
    .command("patch", "Patch Truffle Migrations")
    .action((args, callback) => {
      console.log("patching...");
      let sourceDirectory = path.resolve(__dirname, "../../contracts/");
      let destinationDirectory = path.resolve(
        __dirname,
        "../../../../../contracts/TransmuteFramework/"
      );
      add(sourceDirectory, destinationDirectory, err => {
        if (err) {
          throw err;
        }
        let sourceDirectory = path.resolve(__dirname, "../../test/");
        let destinationDirectory = path.resolve(
          __dirname,
          "../../../../../test/TransmuteFramework/"
        );
        add(sourceDirectory, destinationDirectory, err => {
          if (err) {
            throw err;
          }
          let patchTargetPath = path.resolve(
            __dirname,
            "../../../../../migrations/2_deploy_contracts.js"
          );
          let transmuteMigrations = path.resolve(
            __dirname,
            "../../migrations/2_deploy_contracts.js"
          );

          // console.log(patchTargetPath)
          // console.log(transmuteMigrations)

          patchFiles(patchTargetPath, transmuteMigrations).then(() => {
            callback();
          });
        });
      });
    });

  vorpal
    .command("unpatch", "UnPatch Truffle Migrations")
    .action((args, callback) => {
      console.log("unpatching...");

      let destinationDirectory = path.resolve(
        __dirname,
        "../../../../../test/TransmuteFramework/"
      );
      remove(destinationDirectory, err => {
        if (err) {
          throw err;
        }
        // remove tests
      });

      destinationDirectory = path.resolve(
        __dirname,
        "../../../../../contracts/TransmuteFramework/"
      );

      remove(destinationDirectory, err => {
        if (err) {
          throw err;
        }
        let patchFilePath = path.resolve(
          __dirname,
          "../../../../../migrations/2_deploy_contracts.js"
        );
        let backupPath = path.resolve(
          __dirname,
          "../../../../../migrations/2_deploy_contracts.js.transmute.bak"
        );
        unpatchFiles(patchFilePath, backupPath);
      });
    });

  return vorpal;
};
