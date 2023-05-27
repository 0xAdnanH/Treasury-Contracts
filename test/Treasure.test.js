const { expect } = require("chai");
const { ethers } = require("hardhat");
const { keccak256 } = require("ethers/lib/utils");
let provider = ethers.getDefaultProvider();
let minimumEther;
let addr1;
let addr2;
let addr3;
let addr4;
let treasureContract;
let HashOfSecretWord = ethers.utils.solidityKeccak256(
  ["string"],
  ["consistency"]
);
before(async () => {
  [addr1, addr2, addr3, addr4] = await ethers.getSigners();
  const TreasureFactory = await ethers.getContractFactory("Treasure");

  treasureContract = await TreasureFactory.deploy(HashOfSecretWord);
  minimumEther = ethers.utils.parseEther("1");
});

describe("Testing Competition Logic", () => {
  describe("Testing Constructor", () => {
    it("should set secretword as in constructor", async () => {
      const result = await treasureContract.secretWord();
      expect(result).to.equal(HashOfSecretWord);
    });
  });
  describe("Testing deposit function", () => {
    it("should deposit successfully as addr1", async () => {
      await treasureContract.connect(addr1).deposit({ value: minimumEther });
      expect(await treasureContract.Deposits(addr1.address)).to.be.true;
    });
    it("should revert if addr1 deposited twice", async () => {
      //This it() body also tests the Modifier onlyDepositor
      await expect(
        treasureContract.connect(addr1).deposit({ value: minimumEther })
      ).to.be.revertedWith("Already deposited");
    });
    it("should deposit successfully as addr2", async () => {
      await treasureContract.connect(addr2).deposit({ value: minimumEther });
      expect(await treasureContract.Deposits(addr2.address)).to.be.true;
    });
    it("should revert if addr2 deposited twice", async () => {
      //This it() body also tests the Modifier onlyDepositor
      await expect(
        treasureContract.connect(addr2).deposit({ value: minimumEther })
      ).to.be.revertedWith("Already deposited");
    });
    it("should revert if amount ether less than 1", async () => {
      await expect(
        treasureContract.connect(addr4).deposit({ value: 400 })
      ).to.be.revertedWith("Value deposited is less than 1 ether");
    });
  });

  describe("Testing Commitment function", () => {
    it("should commit successfully as addr1", async () => {
      const complexKey = ethers.utils.solidityKeccak256(
        ["address", "string"],
        [addr1.address, "consistency"]
      );
      await treasureContract.connect(addr1).commitment(complexKey);
      expect(await treasureContract.commit(addr1.address)).to.equal(complexKey);
    });
    it("should commit successfully as addr2", async () => {
      const complexKey = ethers.utils.solidityKeccak256(
        ["address", "string"],
        [addr2.address, "solidity"]
      );
      await treasureContract.connect(addr2).commitment(complexKey);
      expect(await treasureContract.commit(addr2.address)).to.equal(complexKey);
    });
    it("should revert if addr3 commit without depositing", async () => {
      const complexKey = ethers.utils.solidityKeccak256(
        ["address", "string"],
        [addr3.address, "did not deposited"]
      );
      await expect(
        treasureContract.connect(addr3).commitment(complexKey)
      ).to.be.revertedWith("Not a Depositor");
    });
  });
  describe("Testing revealWord function", () => {
    it("should pass successfully the two checks for addr1", async () => {
      const word = "consistency";

      await treasureContract.connect(addr1).revealWord(word);

      expect(await treasureContract.winner()).to.equal(addr1.address);
    });
    it("should revert for addr2", async () => {
      const word = "solidity";
      await expect(
        treasureContract.connect(addr2).revealWord(word)
      ).to.be.revertedWith("Incorrect Word");
    });
    it("should revert for addr3 for not depositing", async () => {
      const word = "did not deposited";
      await expect(
        treasureContract.connect(addr3).revealWord(word)
      ).to.be.revertedWith("Not a Depositor");
    });
  });
});
