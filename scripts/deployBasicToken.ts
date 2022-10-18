import { ethers } from "hardhat";

async function main() {
    const BasicToken = await ethers.getContractFactory("BasicToken");
    const ethervalue = ethers.utils.parseEther('10');
    const token = await BasicToken.deploy(ethervalue);
    await token.deployed();
    console.log(`10 ETH BasicToken deployed to ${token.address}`);
}

// npx hardhat run scripts/deployBasicToken.ts --network localhost or goerli or tbsc mumbai
// npx hardhat verify --contract "contracts/BasicToken.sol:BasicToken"  --network mumbai 0xB6D0c44E1590D6fF9D15200f688eeADD9A836958 10000000000000000000
main();
