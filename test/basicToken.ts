import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BasicToken", function () {

    async function deployFixture() {
        const InitialBalance = 10000;
        const ethervalue = ethers.utils.parseEther('10');
        const [owner, addr1, addr2] = await ethers.getSigners();
        const BasicToken = await ethers.getContractFactory("BasicToken");
        console.log("owner:", await ethers.provider.getBalance(owner.address));
        // payable; To this contract storage value ether
        //const token = await BasicToken.deploy(InitialBalance, { value: ethervalue });
        const token = await BasicToken.deploy(InitialBalance);
        await token.deployed();
        return { token, owner, addr1, addr2, InitialBalance };
    }

    describe("Deployment", function () {

        it("totalSupply is true", async function () {
            const { token, owner, InitialBalance } = await loadFixture(deployFixture);
            console.log("owner:", await ethers.provider.getBalance(owner.address));
            console.log("token:", await ethers.provider.getBalance(token.address));
            expect(await token.totalSupply()).to.equal(InitialBalance);
        });

        it("balanceOf(owner) is InitialBalance", async function () {
            const { token, owner, InitialBalance } = await loadFixture(deployFixture);
            expect(await token.balanceOf(owner.address)).to.equal(InitialBalance);
        });

        it("owner transfer 1000 to addr1", async function () {
            const { token, owner, addr1, InitialBalance } = await loadFixture(deployFixture);
            await token.transfer(addr1.address, 1000);
            expect(await token.balanceOf(addr1.address)).to.equal(1000);
            expect(await token.balanceOf(owner.address)).to.equal(InitialBalance - 1000);
        });

        it("addr1 connect contract,addr1 to addr2", async function () {
            const { token, owner, addr1, addr2 } = await loadFixture(deployFixture);
            // addr1 1000 owner 9000
            await token.transfer(addr1.address, 1000);
            // addr1 connect contract 实例
            const addr1connettoken = token.connect(addr1);
            //addr1 to addr2 200; addr1 800
            await addr1connettoken.transfer(addr2.address, 200);

            //console.log(await token.balanceOf(addr2.address));
            //console.log(await addr1connettoken.balanceOf(addr1.address));

            expect(await token.balanceOf(owner.address)).to.equal(9000);
            expect(await token.balanceOf(addr2.address)).to.equal(200);
            expect(await token.balanceOf(addr1.address)).to.equal(800);
            

        });
    });

});