import { ethers } from "hardhat";

async function main() {

  const marketplace = await ethers.getContractFactory("NFTMarketplace");
  const marketplace_contract = await marketplace.deploy();

  await marketplace_contract.deployed();

  console.log(` nft marketplace address: ${marketplace_contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
