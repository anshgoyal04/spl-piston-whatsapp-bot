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
    type: "text",

    text: {
      body: `Hello! 👋

Thank you for contacting **Jindal Udyog (India)**.

Yes, we manufacture a complete range of **2-Wheeler and 3-Wheeler Pistons**. We offer a wide variety of piston models and sizes to meet different vehicle requirements.

If you would like to speak with our team directly, please contact us at:
📞 **+91 99270 88886**
📞 **+91 75004 85737**

Our team will be happy to provide complete product information, pricing, and assistance.

You can also explore our products and get more information through the menu available in this chat.

Thank you for choosing Jindal Udyog (India). We look forward to serving you!
`
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