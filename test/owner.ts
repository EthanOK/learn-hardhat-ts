import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

// loadFixture 避免代码重复并提高测试套件的性能，固定装置是一个设置函数，仅在第一次调用时运行
// chai 断言库

describe("Owner", function () {
    async function deployFixture() {
        // get local account
        const [owner, other] = await ethers.getSigners();
        console.log("owner:", owner.address);
        console.log("other:", other.address);
        // get Contract Factory
        const contractOwner = await ethers.getContractFactory("Owner");
        const contractowner = await contractOwner.deploy();
        await contractowner.deployed();
        return { contractowner, owner, other };

    }

    describe("Test Deployment", function () {
        it("Should set the right owner", async function () {
            const { contractowner, owner } = await loadFixture(deployFixture);
            expect(await contractowner.getOwner()).to.equal(owner.address);
        });

        it("Should changeOwner to other", async function () {
            const { contractowner, owner, other } = await loadFixture(deployFixture);
            await contractowner.changeOwner(other.address);
            expect(await contractowner.getOwner()).to.equal(other.address);
        });

        it("Should fail if change Owner to other and owner call changeOwner", async function () {
            const { contractowner, owner, other } = await loadFixture(deployFixture);
            await contractowner.changeOwner(other.address);
            await expect(contractowner.changeOwner(owner.address)).to.be.revertedWith("Caller is not owner");


        });
    });


});