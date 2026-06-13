const axios = require("axios");

async function sendTextMessage(to, message) {
  console.log("TOKEN:", process.env.TOKEN);
console.log("PHONE ID:", process.env.PHONE_NUMBER_ID);
  try {
    await axios.post(
      `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Message Sent");
  } catch (error) {
    console.error(
      "❌ Send Error:",
      error.response?.data || error.message
    );
  }
}

module.exports = {
  sendTextMessage,
};