import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    avalanche: {
      chainId: 43113,
      accounts: [process.env.NEXT_PUBLIC_ACCOUNT_PRIVATE_KEY|''],
      url: "https://ava-testnet.blastapi.io/275cbdc6-c032-4075-8897-cc50b0db3fd5/ext/bc/C/rpc",
    },
    arbitrum: {
      url:
        "https://arbitrum-goerli.blastapi.io/275cbdc6-c032-4075-8897-cc50b0db3fd5",
      chainId: 421613,
      accounts: [process.env.NEXT_PUBLIC_ACCOUNT_PRIVATE_KEY|''],
    },
  },
};

export default config;
