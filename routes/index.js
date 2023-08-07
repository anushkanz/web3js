var express = require("express");
var router = express.Router();
var request = require("request");
var cors = require("cors");
let { Web3 } = require("web3");
require("dotenv").config();

/*
"address": "0x9c59D33594bC1f6046d704246A6CF9B9D3EF24F5"
*/

router.get("/", function (req, res, next) {
  let provider = new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  );
  const web3 = new Web3(provider);
  async function main() {
    try {
      // Get the current block number from the network
      const currentBlockNumber = await web3.eth.getBlockNumber();
      console.log("Current block number:", currentBlockNumber);

      // Get the list of accounts in the connected node (e.g., Ganache)
      const accounts = await web3.eth.getAccounts();

      // Send a transaction to the network and wait for the transaction to be mined.
      // Note that sending a transaction with Ganache will cause it, in its default configuration, to min a new block.
      const transactionReceipt = await web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[1],
        value: web3.utils.toWei("0.001", "ether"),
      });
      console.log("Transaction Receipt:", transactionReceipt);

      // Get the updated block number
      const updatedBlockNumber = await web3.eth.getBlockNumber();
      console.log("Updated block number:", updatedBlockNumber);
      console.log(accounts);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  main();
});

module.exports = router;
