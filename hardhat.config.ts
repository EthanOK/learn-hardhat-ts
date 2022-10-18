import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "@nomiclabs/hardhat-etherscan";
import { ProxyAgent, setGlobalDispatcher } from "undici";

// 获得 .env 内配置信息
dotenv.config();

// 若翻墙需要设置代理
// const proxyAgent = new ProxyAgent('http://127.0.0.1:10810');
// setGlobalDispatcher(proxyAgent);

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },

  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 5,
    },
    tbsc: {
      url: process.env.TBSC_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 97,
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],

    },

  },
  etherscan: {
    //MUMBAI_API_KEY ETHERSCAN_API_KEY
    apiKey: process.env.MUMBAI_API_KEY || "",
  },
   
};

export default config;
