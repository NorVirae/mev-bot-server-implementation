import { BigNumber, ethers, providers, Wallet } from "ethers";
import { config } from "dotenv";
import path from "path";
import abiManager from "./artifacts/abi/abiManager";
import contractManager from "./artifacts/contractAddress/contractAddressManager";

// configure environment stuff ~
require("log-timestamp");
config({ path: path.join(__dirname, "../", ".env") });

// get data from env files ~
const GAS_WALLET_KEY: string = process.env.GAS_WALLET_KEY || "";
const BINANCE_RPC = process.env.BINANCE_RPC;
// const BINANCE_RPC = process.env.BINANCE_RPC || "http://127.0.0.1:8545";

// Token contract addresses ~ mainnet
const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const CAKE = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
const DOT = "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402";
const WBNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";

// Token contract addresses ~ mainnet
const BUSD_TEST = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
const LINK_TEST = "0x6631986a9DC5f654bB563BcE56ACbE389906EfEf";
const WBNB_TEST = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";

// allow Trade constant
let allowTrade = true;

async function checkAndStartTrade(provider: ethers.providers.StaticJsonRpcProvider) {
  // Wallets and providers for wallets and contracts ~

  const botWallet = new Wallet(GAS_WALLET_KEY, provider);

  const arbeeContract = new ethers.Contract(
    contractManager.triangularArbitrageContract,
    abiManager.triangularArbitrage.abi,
    botWallet
  );
  const borrowAmount = ethers.utils.parseUnits("100000", 18);
  const startTrade =
    await arbeeContract.checkTriangularTradeProfitabilityOnBlockCall(
      BUSD,
      CAKE,
      DOT,
      borrowAmount
    );

  console.log(startTrade);

  // get latest block ~

  const block = await provider.getBlock("latest");
  // console.log(block.gasLimit.toString());
  return startTrade;
}

function executeTrade() {
  allowTrade = false;
  console.log("Execute Trade");
  allowTrade = true;
}

async function main() {
  // implement a function to check trade profitability ~
  const provider = new providers.StaticJsonRpcProvider(BINANCE_RPC);

  // implement function to execute trade ~

  provider.on("block", async (blockNumber) => {
    // console.log(blockNumber);
    let startTrade = await checkAndStartTrade(provider);

    if (startTrade && allowTrade) {
      executeTrade();
      console.log(startTrade)
    }
  });
}

main();
