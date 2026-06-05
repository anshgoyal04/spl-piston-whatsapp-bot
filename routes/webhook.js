const express = require("express");
const users = require("../data/users");
const { saveLead } = require("../utils/saveLead");
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
      text === "hii"||
      text === "hey"||
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

  users[from].flow = "export";
  users[from].step = "name";
  users[from].exportData = {};

  await sendTextMessage(
    from,
    "🌍 Export Inquiry\n\nPlease enter your Name:"
  );

  return res.sendStatus(200);
}

    // OEM Partnership
    if (text === "3") {

  users[from].flow = "oem";
  users[from].step = "company";

  users[from].oemData = {};

  await sendTextMessage(
    from,
    `🏭 OEM Partnership

Please enter Company Name:`
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
// EXPORT FLOW

if (users[from].flow === "export") {

  if (users[from].step === "name") {

    users[from].exportData.name = text;
    users[from].step = "company";

    await sendTextMessage(
      from,
      "Please enter Company Name:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "company") {

    users[from].exportData.company = text;
    users[from].step = "country";

    await sendTextMessage(
      from,
      "Please enter Country:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "country") {

    users[from].exportData.country = text;
    users[from].step = "email";

    await sendTextMessage(
      from,
      "Please enter Email:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "email") {

    users[from].exportData.email = text;
    users[from].step = "phone";

    await sendTextMessage(
      from,
      "Please enter Phone Number:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "phone") {

    users[from].exportData.phone = text;
    users[from].step = "product";

    await sendTextMessage(
      from,
      "Please enter Required Product:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "product") {

    users[from].exportData.product = text;
    users[from].step = "quantity";

    await sendTextMessage(
      from,
      "Please enter Expected Quantity:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "quantity") {

    users[from].exportData.quantity = text;
    users[from].step = "remarks";

    await sendTextMessage(
      from,
      "Any Additional Remarks?"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "remarks") {

    users[from].exportData.remarks = text;

    await saveLead(
      "Export_Inquiries",
      {
        Date: new Date().toLocaleString(),
        Name: users[from].exportData.name,
        Company: users[from].exportData.company,
        Country: users[from].exportData.country,
        Email: users[from].exportData.email,
        Phone: users[from].exportData.phone,
        Product: users[from].exportData.product,
        Quantity: users[from].exportData.quantity,
        Remarks: users[from].exportData.remarks
      }
    );

    users[from].flow = null;
    users[from].step = null;

    await sendTextMessage(
      from,
      `✅ Thank you!

Your Export Inquiry has been submitted successfully.

Our team will contact you shortly.`
    );

    return res.sendStatus(200);
  }
}
// OEM PARTNERSHIP FLOW

if (users[from].flow === "oem") {

  if (users[from].step === "company") {

    users[from].oemData.company = text;
    users[from].step = "contact";

    await sendTextMessage(
      from,
      "Please enter Contact Person Name:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "contact") {

    users[from].oemData.contact = text;
    users[from].step = "email";

    await sendTextMessage(
      from,
      "Please enter Email:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "email") {

    users[from].oemData.email = text;
    users[from].step = "phone";

    await sendTextMessage(
      from,
      "Please enter Phone Number:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "phone") {

    users[from].oemData.phone = text;
    users[from].step = "requirement";

    await sendTextMessage(
      from,
      "Please describe your OEM Requirement:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "requirement") {

    users[from].oemData.requirement = text;
    users[from].step = "volume";

    await sendTextMessage(
      from,
      "Expected Annual Volume?"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "volume") {

    users[from].oemData.volume = text;
    users[from].step = "remarks";

    await sendTextMessage(
      from,
      "Any Additional Remarks?"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "remarks") {

    users[from].oemData.remarks = text;

    await saveLead(
      "OEM_Partnership",
      {
        Date: new Date().toLocaleString(),
        Company: users[from].oemData.company,
        "Contact Person": users[from].oemData.contact,
        Email: users[from].oemData.email,
        Phone: users[from].oemData.phone,
        Requirement: users[from].oemData.requirement,
        "Annual Volume": users[from].oemData.volume,
        Remarks: users[from].oemData.remarks
      }
    );

    users[from].flow = null;
    users[from].step = null;

    await sendTextMessage(
      from,
      `✅ OEM Partnership Request Submitted Successfully.

Our business team will contact you shortly.`
    );

    return res.sendStatus(200);
  }
}
    if (
  text === "thanks" ||
  text === "thank you" ||
  text === "ok" ||
  text === "okay"
) {
  await sendTextMessage(
    from,
    `🙏 Thank you for contacting SPL Piston.

Type "menu" anytime to view available options.`
  );

  return res.sendStatus(200);
}

await sendTextMessage(
  from,
  `Type "menu" to view available options.`
);

return res.sendStatus(200);

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

module.exports = router;