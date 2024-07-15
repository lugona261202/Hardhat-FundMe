require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETKEY_API_KEY = process.env.COINMARKETKEY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  //solidity: "0.8.24",
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.8.24",
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETKEY_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  mocha: {
    timeout: 500000,
  },
};
