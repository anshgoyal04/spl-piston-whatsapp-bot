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

  users[from].flow = "catalog";

  await sendTextMessage(
    from,
    `📚 SPL Piston Product Catalog

Please select:

1.1 Hero Honda

1.2 Bajaj

1.3 Honda

1.4 Yamaha

1.5 TVS Suzuki

1.6 Mahindra

1.7 LML Group

1.8 BS6 Models

Type the option number.`
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

  users[from].flow = "callback";
  users[from].step = "name";

  users[from].callbackData = {};

  await sendTextMessage(
    from,
    `📞 Request a Callback

Our sales team will contact you shortly.

Please enter your Name:`
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
    // CATALOG FLOW

if (users[from].flow === "catalog") {

  if (text === "1.1") {
await saveLead(
  "General_Leads",
  {
    Date: new Date().toLocaleString(),
    Phone: from,
    Activity: "Downloaded Bajaj Catalog"
  }
);
    await sendTextMessage(
      from,
      `📄 Hero Honda Catalog

https://drive.google.com/file/d/1LgU-qxh4fcut4ykfAL9R9u8VSL9_SfLi/view`
    );

    users[from].flow = null;

    return res.sendStatus(200);
  }

  if (text === "1.2") {
await saveLead(
  "General_Leads",
  {
    Date: new Date().toLocaleString(),
    Phone: from,
    Activity: "Downloaded Bajaj Catalog"
  }
);
    await sendTextMessage(
      from,
      `📄 Bajaj Catalog

https://drive.google.com/file/d/191MzUXoTRws8Excec_58p_OCmdTJWBV9/view`
    );

    users[from].flow = null;

    return res.sendStatus(200);
  }

  if (text === "1.3") {
await saveLead(
  "General_Leads",
  {
    Date: new Date().toLocaleString(),
    Phone: from,
    Activity: "Downloaded Honda Catalog"
  }
);
    await sendTextMessage(
      from,
      `📄 Honda Catalog

https://drive.google.com/file/d/1gVFzN_E-mluU-cD0lw7CZ8qB21_47PhS/view`
    );

    users[from].flow = null;

    return res.sendStatus(200);
  }

  if (text === "1.4") {
await saveLead(
  "General_Leads",
  {
    Date: new Date().toLocaleString(),
    Phone: from,
    Activity: "Downloaded Yamaha Catalog"
  }
);
    await sendTextMessage(
      from,
      `📄 Yamaha Catalog

https://drive.google.com/file/d/1bjuPepLZjXgJn1mD5_8ZTrd_1eFUl8zy/view`
    );

    users[from].flow = null;

    return res.sendStatus(200);
  }

  if (text === "1.5") {
await saveLead(
  "General_Leads",
  {
    Date: new Date().toLocaleString(),
    Phone: from,
    Activity: "Downloaded TVS Suzuki Catalog"
  }
);
    await sendTextMessage(
      from,
      `📄 TVS Suzuki Catalog

https://drive.google.com/file/d/1sUvfbU2vLV1_miSQrTxhgxJsWNajuBnb/view`
    );

    users[from].flow = null;

    return res.sendStatus(200);
  }

  if (text === "1.6") {
await saveLead(
  "General_Leads",
  {
    Date: new Date().toLocaleString(),
    Phone: from,
    Activity: "Downloaded Mahindra Catalog"
  }
);
    await sendTextMessage(
      from,
      `📄 Mahindra Catalog

https://drive.google.com/file/d/1PvRq6g5C4SsEqOHcD47ZoeD_GJlkrqOo/view`
    );

    users[from].flow = null;

    return res.sendStatus(200);
  }

  if (text === "1.7") {
await saveLead(
  "General_Leads",
  {
    Date: new Date().toLocaleString(),
    Phone: from,
    Activity: "Downloaded LML Group Catalog"
  }
);
    await sendTextMessage(
      from,
      `📄 LML Group Catalog

https://drive.google.com/file/d/1tqXyHknghEQqzAnBCkBd1nYcvjlvfCSR/view`
    );

    users[from].flow = null;

    return res.sendStatus(200);
  }

  if (text === "1.8") {
await saveLead(
  "General_Leads",
  {
    Date: new Date().toLocaleString(),
    Phone: from,
    Activity: "Downloaded BS6 Models Catalog"
  }
);
    await sendTextMessage(
      from,
      `📄 BS6 Models Catalog

https://drive.google.com/file/d/1YgkBA4Fswd-DE0PvGvqinHMDun_oURso/view`
    );
    users[from].flow = null;

    return res.sendStatus(200);
  }
  await sendTextMessage(
  from,
  `If you need pricing, OEM supply, or export support, reply:

2️⃣ Export Inquiry

3️⃣ OEM Partnership

4️⃣ Contact Sales Team`
);
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
await sendTextMessage(
  "919927088886",
  `🔔 NEW EXPORT INQUIRY

👤 Name: ${users[from].exportData.name}

🏢 Company: ${users[from].exportData.company}

🌍 Country: ${users[from].exportData.country}

📧 Email: ${users[from].exportData.email}

📱 Phone: ${users[from].exportData.phone}

⚙ Product: ${users[from].exportData.product}

📦 Quantity: ${users[from].exportData.quantity}

📝 Remarks: ${users[from].exportData.remarks}`
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
  "919927088886",
  `🔔 NEW OEM PARTNERSHIP

🏢 Company: ${users[from].oemData.company}

👤 Contact: ${users[from].oemData.contact}

📧 Email: ${users[from].oemData.email}

📱 Phone: ${users[from].oemData.phone}

⚙ Requirement: ${users[from].oemData.requirement}

📦 Annual Volume: ${users[from].oemData.volume}

📝 Remarks: ${users[from].oemData.remarks}`
);
    await sendTextMessage(
      from,
      `✅ OEM Partnership Request Submitted Successfully.

Our business team will contact you shortly.`
    );

    return res.sendStatus(200);
  }
}

// CALLBACK FLOW

if (users[from].flow === "callback") {

  if (users[from].step === "name") {

    users[from].callbackData.name = text;
    users[from].step = "phone";

    await sendTextMessage(
      from,
      "Please enter your Phone Number:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "phone") {

    users[from].callbackData.phone = text;
    users[from].step = "requirement";

    await sendTextMessage(
      from,
      "Please describe your requirement:"
    );

    return res.sendStatus(200);
  }

  if (users[from].step === "requirement") {

    users[from].callbackData.requirement = text;

    await saveLead(
      "Callback_Requests",
      {
        Date: new Date().toLocaleString(),
        Name: users[from].callbackData.name,
        Phone: users[from].callbackData.phone,
        Requirement: users[from].callbackData.requirement
      }
    );
await sendTextMessage(
  "919927088886",
  `🔔 NEW CALLBACK REQUEST

👤 Name: ${users[from].callbackData.name}

📱 Phone: ${users[from].callbackData.phone}

📝 Requirement:

${users[from].callbackData.requirement}`
);
    users[from].flow = null;
    users[from].step = null;

    await sendTextMessage(
      from,
      `✅ Callback Request Submitted Successfully.

Our sales team will contact you shortly.

📞 9927088886
📧 jindaludyog@gmail.com`
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