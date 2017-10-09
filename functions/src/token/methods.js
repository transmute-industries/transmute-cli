const T = require("transmute-framework").default.init();
const moment = require("moment");
const uuidv4 = require("uuid/v4");
const _ = require("lodash");
const TokenChallengeStore = require("./TokenChallengeStore");

const confirmAddressSignedMessage = (address, message, signature) => {
  return T.Toolbox.recover(message, signature).then(recoveredAddress => {
    return recoveredAddress === address;
  });
};

const generateChallengeObjectForAddressToSign = (
  tcs,
  client_address,
  client_message_raw
) => {
  // SIGN THIS TO PROVE YOU CONTROL ADDRESS
  const timestamp = moment().unix();
  const uuid = uuidv4();
  const message_raw = `${uuid}.${client_address}.${client_message_raw}`;
  let function_address
  return T.getAccounts()
    .then(addresses => {
      function_address = addresses[1]
      return function_address;
    })
    .then(function_address => {
      return T.Toolbox.sign(function_address, message_raw);
    })
    .then(signatureObject => {
      const tokenChallengeObject = {
        client_address,
        client_message_raw,
        function_address,
        timestamp,
        uuid,
        message_raw,
        message_hex: signatureObject.messageBufferHex,
        message_signature: signatureObject.signature,
        token_issued: false
      };
      return tcs.set(tokenChallengeObject);
    });
};

const challengeClientToSignMessage = functionParams => {
  const { message_raw, message_signature, address } = functionParams.query;
  let didClientAddressSignMessageRaw, tcs;
  tcs = new TokenChallengeStore(functionParams.env.TransmuteFramework.db);

  return confirmAddressSignedMessage(address, message_raw, message_signature)
    .then(_didClientAddressSignMessageRaw => {
      didClientAddressSignMessageRaw = _didClientAddressSignMessageRaw;
      return generateChallengeObjectForAddressToSign(tcs, address, message_raw);
    })
    .then(challengeObject => {
      return {
        status: 200,
        body: {
          // callingArgs: _.omit(functionParams, "db", "admin"),
          conditions: {
            didClientAddressSignMessageRaw
          },
          challenge: challengeObject.message_raw
        },
        redirect: null
      };
    });
};

const verifyClientHasSignedMessage = functionParams => {
  const {
    address,
    message_raw,
    message_hex,
    message_signature
  } = functionParams.query;

  const tcs = new TokenChallengeStore(functionParams.env.TransmuteFramework.db);
  let clientAddressHasStoredChallenge,
    clientMessageRawIsStoredChallengeMessageHex,
    functionAddressHasSignedStoredChallengeMessageHex,
    functionAddressIsNotClientAddress,
    storedChallange,
    conditions,
    success;
  return tcs
    .get(address)
    .then(_storedChallange => {
      storedChallange = _storedChallange
      // Address has stored challange
      clientAddressHasStoredChallenge =
        storedChallange.client_address === address;

      // Has the client_address signed the message we expect them to sign.
      clientMessageRawIsStoredChallengeMessageHex =
        storedChallange.message_hex === message_raw;

      // We trust the store, and verify that this function has signed this challenge
      return confirmAddressSignedMessage(
        storedChallange.function_address,
        storedChallange.message_hex,
        storedChallange.message_signature
      );
    })
    .then(_functionAddressHasSignedStoredChallengeMessageHex => {
      functionAddressHasSignedStoredChallengeMessageHex = _functionAddressHasSignedStoredChallengeMessageHex
      // Client and server must sign with different addresses.
      functionAddressIsNotClientAddress =
        storedChallange.function_address !== address;

      // We trust client, and verify that they have signed the stored challenge
      // Does this signature originate from the client_address
      return confirmAddressSignedMessage(
        address,
        message_raw,
        message_signature
      );
    })
    .then(clientAddressHasSignedMessageRaw => {
      conditions = {
        // client and function address must not be the same
        functionAddressIsNotClientAddress,
        // the function must sign the challenge for it to be valid
        functionAddressHasSignedStoredChallengeMessageHex,
        // the client address has a stored challenge
        // If not we cannot verify, clients must sign a challenge that is already signed by the function)
        clientAddressHasStoredChallenge,
        // the client message_raw is the stored message hex
        // the client is providing a signature for the stored message hex
        clientMessageRawIsStoredChallengeMessageHex,
        // the client message_raw, message_hex, message_signature were signed by the client address
        clientAddressHasSignedMessageRaw
      };

      success = _.every(_.values(conditions));

      if (success) {
        storedChallange.token_issued = true;

        return tcs.set(storedChallange).then(updatedStoredChallange => {
          return functionParams.env.TransmuteFramework.firebaseAdmin
            .auth()
            .createCustomToken(address, conditions)
            .then(customToken => {
              return {
                status: 200,
                body: {
                  // callingArgs: _.omit(functionParams, "db", "admin"),
                  token: customToken
                },
                redirect: null
              };
            });
        });
      } else {
        return {
          status: 401,
          body: {
            message: "client and function have not signed the same challenge."
          },
          redirect: null
        };
      }
    });
};

module.exports = {
  challengeClientToSignMessage,
  verifyClientHasSignedMessage
};
