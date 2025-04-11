const axios = require('axios');

const TELEGRAM_BOT_TOKEN = '8091511209:AAGFrkbuHzKKHeCHsY8ZUrJ5N6ZJDEF8aks';
const TELEGRAM_CHAT_ID = '6288485520';

async function sendTelegramNotification({ type, fromToken, toToken, amount, txHash }) {
  const message = `
✅ *${type} Successful!*
🔁 *From:* ${fromToken}
💱 *To:* ${toToken}
💰 *Amount:* ${amount}
🔗 *Txn:* [View on MonadScan](https://monadscan.io/tx/${txHash})
⏰ *Time:* ${new Date().toLocaleString()}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });
    console.log('✅ Telegram notification sent!');
  } catch (err) {
    console.error('❌ Failed to send Telegram notification:', err.message);
  }
}

module.exports = sendTelegramNotification;
