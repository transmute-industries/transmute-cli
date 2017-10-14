module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    azure: {
      host: "testrpc.azurewebsites.net",
      port: 80,
      network_id: "*" // Match any network id
    }
  }
};
