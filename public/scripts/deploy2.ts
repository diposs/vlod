import { ethers } from "hardhat";

async function main() {
  const collection_factory = await hre.ethers.getContractFactory(
    "CollectionFactory"
  );
  const collection = await collection_factory.deploy();

  await collection.deployed();

  console.log(` nft collection factory address: ${collection.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
