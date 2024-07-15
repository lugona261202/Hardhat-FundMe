const { network } = require("hardhat");
const {
  developmentChains,
  DECIMALS,
  INITAL_ANSWER,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  if (chainId == 31337) {
    log("Local network detected ! deploying mocks....");
    await deploy("MockAggregatorValidator", {
      contract: "MockAggregatorValidator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITAL_ANSWER],
    });
    log("Mocks deployed");
    log("..............");
  }
};

module.exports.tags = ["all", "mocks"]; // if you want to run specific contracts then give them such tags
// and while comiling use these tags
