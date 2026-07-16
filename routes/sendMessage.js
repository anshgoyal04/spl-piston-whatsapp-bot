const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const response = await axios.post(
      `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
       {
    messaging_product: "whatsapp",

    //to: "919677157230", // Customer Number
 to: "917500485737",
    type: "document",

document: {
  link: "https://spl-piston-whatsapp-bot-a7et.onrender.com/invoices/invoice-1.pdf",
  filename: "invoice-1.pdf",
  caption: "Please find your invoice attached."
}
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json"
    }
  }
    );

    console.log(response.data);

    res.send("Message sent successfully");

  } catch (err) {

    console.log(err.response?.data || err.message);

    res.status(500).send("Error sending message");
  }
});

module.exports = router;