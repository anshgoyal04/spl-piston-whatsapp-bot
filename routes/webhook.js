const express = require("express");

const router = express.Router();
const { sendTextMessage } = require("../utils/whatsapp");
// Webhook Verification
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.VERIFY_TOKEN
  ) {
    console.log("✅Webhook Verified");
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

    if (message) {
      const from = message.from;
      const text = message.text?.body;

      console.log("From:", from);
      console.log("Message:", text);

      await sendTextMessage(
        from,
        `Welcome to SPL Piston 🚀

We manufacture:

• Pistons
• Piston Rings
• Connecting Rods
• Cylinder Blocks
• Engine Components

Reply:

1 - Product Catalog
2 - Export Inquiry
3 - OEM Partnership
4 - Contact Sales
5 - Company Information`
      );
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

module.exports = router;