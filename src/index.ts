import { BigNumber, providers, Wallet } from "ethers";
import { config } from "dotenv";
import path from 'path'

// configure environment stuff ~
require("log-timestamp");
config({path: path.join(__dirname, "../", ".env")})

// get data from env files ~
const GAS_WALLET_KEY: string= process.env.GAS_WALLET_KEY || "";
const BINANCE_RPC_TEST = process.env.BINANCE_RPC_TEST
// const BINANCE_RPC = process.env.BINANCE_RPC || "http://127.0.0.1:8545";


// Token contract addresses ~ mainnet
const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
const CAKE = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
const DOT = "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402"
const WBNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";


// Token contract addresses ~ mainnet
const BUSD_TEST = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
const CAKE_TEST = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
const DOT_TEST = "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402"

// smart contract address

async function main() {

  // Wallets and providers for wallets and contracts ~
  const walletRelay = new Wallet(GAS_WALLET_KEY);
  console.log(BINANCE_RPC_TEST)
  const provider = new providers.StaticJsonRpcProvider(BINANCE_RPC_TEST);


  // get latest block ~

  const block = await provider.getBlock("latest");
  console.log(block.gasLimit.toString())

  // implement a function to check trade profitability ~


  // implement function to execute trade ~

  provider.on("block", async (blockNumber) => {
    console.log(blockNumber);
  });
}

main();
