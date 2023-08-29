import { ethers } from "hardhat";

async function main() {
  const Vold_collection = await hre.ethers.getContractFactory("NFTCollection");
  const Vold_collection_contract = await Vold_collection.deploy(
    "Vold NFT Collection",
    "VLD"
  );

  await Vold_collection_contract.deployed();

  console.log(` NFT Collection address: ${Vold_collection_contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
