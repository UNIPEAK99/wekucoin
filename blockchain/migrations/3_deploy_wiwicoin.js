var ConvertLib = artifacts.require("./ConvertLib.sol");
var WiwiCoin = artifacts.require("./WiwiCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, WiwiCoin);
  deployer.deploy(WiwiCoin);
};
