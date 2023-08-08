var express = require("express");
var router = express.Router();
var request = require("request");
var cors = require("cors");
let { Web3 } = require("web3");
require("dotenv").config();

let provider = new Web3.providers.HttpProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);
const web3 = new Web3(provider);
const address = "0xC8CD2BE653759aed7B0996315821AAe71e1FEAdF";
/*
"address": "0x9c59D33594bC1f6046d704246A6CF9B9D3EF24F5"
*/
//Get Balance by address
router.get("/balance/:address", async (req, res) => {
  const address = req.params.address;
  try {
    let balance = await web3.eth.getBalance(address);
    balance = web3.utils.fromWei(balance, "ether");

    res.json({ address, balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching balance" });
  }
});

//Create account
router.get("/create", async (req, res) => {
  try {
    const account = await web3.eth.accounts.create();
    res.json({
      address: account.address,
      privateKey: account.privateKey,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error create account" });
  }
});

router.get("/", (req, res) => {
  async function main() {
    try {
      //Get the current block number from the network
      const balance = await web3.eth.getBalance(address);

      // Get transaction count (nonce)
      const nonce = await web3.eth.getTransactionCount(address);

      // Get code (smart contract) at the address
      const code = await web3.eth.getCode(address);

      res.json({
        address,
        balance: web3.utils.fromWei(balance, "ether"),
        //nonce,
        code,
      });
    } catch (error) {
      console.error(error);
    }
  }
  main();
});
module.exports = router;
