// standarg way of deploying:
// import
// main function
// calling of main function

const { getNamedAccounts, deployments } = require("hardhat");

// new method
// async function deployFunc(hre){
// console.log("Hi!")
// hre.getNamedAccounts()
// hre.deployments
//}
// module.exports.default = deployFunc

//module.exports = async (hre)=>{// hre is hardhat run enviornment , we extract variables from it ,
//  const {getNamedAccounts,deployments}=hre

const { networkconfig } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // if chainId is X use address Y
  // if chainId is Z use address A
  //const ethUsdPriceFeedAddress = networkconfig[chainId]["ethUsdPriceFeed"]
  let ethUsdPriceFeedAddress;
  if (chainId == 31337) {
    const ethUsdAggregator = await deployments.get("MockAggregatorValidator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  log("----------------------------------------------------");
  log("Deploying FundMe and waiting for confirmations...");

  // if the contract doesn't exist , we deploy a minimal version of
  // contract for our local testing

  // well what happens when we want to change chains?
  // when going for localhost or hardhat network we want to use a mock

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress], // put price feed address
    log: true,
  });
  log("------------------");
};

if (
  !developmentChains.includes(network.name) &&
  process.env.ETHERSCAN_API_KEY
) {
  await verify(fundMe.address, [ethUsdPriceFeedAddress]);
}

module.exports.tags = ["all", "fundme"];
