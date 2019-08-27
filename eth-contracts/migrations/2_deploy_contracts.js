// migrating the appropriate contracts
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var CustomERC721Token = artifacts.require("CustomERC721Token");

module.exports = async (deployer,network) => {
  if(network == "development")
  {
    await deployer.deploy(CustomERC721Token);
  }
  await deployer.deploy(SquareVerifier);
  await deployer.deploy(SolnSquareVerifier,SquareVerifier.address);
};
