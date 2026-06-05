const express = require("express");
const users = require("../data/users");
const { sendTextMessage } = require("../utils/whatsapp");

const router = express.Router();

// Webhook Verification
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.VERIFY_TOKEN
  ) {
    console.log("✅ Webhook Verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Incoming Messages
router.post("/", async (req, res) => {
  try {
    console.log("🔥 WEBHOOK HIT");

    const message =
      req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = message.text?.body?.trim().toLowerCase();

    console.log("From:", from);
    console.log("Message:", text);

    if (!users[from]) {
      users[from] = {
        welcomed: false,
      };
    }

    // Welcome/Menu
    if (
      !users[from].welcomed ||
      text === "hi" ||
      text === "hello" ||
      text === "start" ||
      text === "menu"
    ) {
      users[from].welcomed = true;

      await sendTextMessage(
        from,
        `Welcome to SPL Piston 🚀

Manufacturer of:

• Pistons
• Piston Rings
• Connecting Rods
• Engine Components

Please choose:

1️⃣ Product Catalog

2️⃣ Export Inquiry

3️⃣ OEM Partnership

4️⃣ Contact Sales Team

5️⃣ About SPL Piston`
      );

      return res.sendStatus(200);
    }

    // Product Catalog
    if (text === "1") {
      await sendTextMessage(
        from,
        `📘 Product Catalog

Please select:

1.1 - Pistons
1.2 - Piston Rings
1.3 - Connecting Rods
1.4 - Complete Product Range`
      );

      return res.sendStatus(200);
    }

    // Export Inquiry
    if (text === "2") {
      await sendTextMessage(
        from,
        `🌍 Export Inquiry

Please share:

Company Name:
Country:
Required Product:
Expected Quantity:`
      );

      return res.sendStatus(200);
    }

    // OEM Partnership
    if (text === "3") {
      await sendTextMessage(
        from,
        `🏭 OEM Partnership

Please share:

Company Name:
Contact Person:
Requirement:
Annual Volume:`
      );

      return res.sendStatus(200);
    }

    // Contact Sales
    if (text === "4") {
      await sendTextMessage(
        from,
        `📞 Contact Sales Team

Mobile: +91 9927088886

Email:
jindaludyog@gmail.com

Website:
https://jindaludyog.com`
      );

      return res.sendStatus(200);
    }

    // About Company
    if (text === "5") {
      await sendTextMessage(
        from,
        `🏭 About SPL Piston

SPL Piston is a trusted manufacturer of:

• Pistons
• Piston Rings
• Connecting Rods
• Engine Components

We serve OEM customers and export markets.

Website:
https://jindaludyog.com`
      );

      return res.sendStatus(200);
    }

    // Invalid Option
    await sendTextMessage(
      from,
      `❌ Invalid Option

Please choose:

1️⃣ Product Catalog
2️⃣ Export Inquiry
3️⃣ OEM Partnership
4️⃣ Contact Sales Team
5️⃣ About SPL Piston

Type "menu" anytime to open the menu again.`
    );

    return res.sendStatus(200);

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

module.exports = router;