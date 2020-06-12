const IPFS = artifacts.require("IPFS");

module.exports = function(deployer) {
  deployer.deploy(IPFS);
};
