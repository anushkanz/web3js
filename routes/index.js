var express = require("express");
var router = express.Router();
var request = require("request");
var cors = require("cors");
let { Web3 } = require("web3");
require("dotenv").config();

router.get("/", function (req, res, next) {
  let provider = new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  );
  const web3 = new Web3(provider);
  async function getLatestBlockNumber() {
    const blockNumber = await web3.eth.getBlockNumber();
    console.log("Latest block number:", blockNumber);
    res.send(blockNumber);
  }
});

module.exports = router;
