const { getPrivateKeys, delay } = require("./lib/utils");
const Application = require("./main"); // your existing main.js class
const evm = require("web3connectjs");

const runBotFor24Hours = async () => {
  const privateKeys = getPrivateKeys();
  const startTime = Date.now();
  const durationMs = 24 * 60 * 60 * 1000; // 24 hours

  while (Date.now() - startTime < durationMs) {
    for (const key of privateKeys) {
      console.log(`\n▶️ Running wallet: ${key.slice(0, 6)}...`);

      try {
        const app = new Application(key);
        await evm.connect(key);
        await app.start();
      } catch (err) {
        console.error("⚠️ Error:", err.message);
      }

      await delay(3000); // Delay between wallets
    }

    console.log("⏸ Waiting 1 minute before next round...");
    await delay(60000); // Wait 1 minute before next full cycle
  }

  console.log("✅ 24-hour run complete.");
};

runBotFor24Hours();
