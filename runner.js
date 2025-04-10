const { getPrivateKeys } = require("./lib/utils");
const Utils = require("./lib/utils");
const Application = require("./main");

async function runIndefinitely() {
  const privateKeys = getPrivateKeys();

  for (const key of privateKeys) {
    const app = new Application(key);
    console.log(`⏳ Starting bot for wallet: ${Utils.maskedWallet(key)}`);
    await app.start();
  }

  const delay = Utils.getRandomDelay(); // Random delay in ms
  console.log(`🕒 Waiting ${delay / 1000} seconds before next run...`);

  setTimeout(runIndefinitely, delay);
}

runIndefinitely();
