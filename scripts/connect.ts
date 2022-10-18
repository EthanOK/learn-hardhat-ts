import { ethers } from "ethers";
import dotenv from "dotenv";

//get .env 配置文件
dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BSC_URL);

async function get() {
    let blockNumber = await provider.getBlockNumber();
    console.log( blockNumber);
};
get();

// npx hardhat run scripts/connect.ts
// npx ts-node scripts/connect.ts
