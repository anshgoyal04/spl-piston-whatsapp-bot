const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const number = req.query.number;

    if (!number) {
      return res.send("Please provide WhatsApp number");
    }

    const response = await axios.post(

      `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,

      {
        messaging_product: "whatsapp",

        to: number,

        type: "template",

        template: {

          name: "spl_piston_intro",

          language: {
            code: "en"
          },

          components: [
            {
              type: "header",

              parameters: [
                {
                  type: "image",

                  image: {
                    link: "https://drive.google.com/uc?export=view&id=1cO6Q_RMc-Iuke5RTBnn0RQaMRtmETVW8"
                  }
                }
              ]
            }
          ]
        }
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data);

    res.send("Template sent successfully");

  } catch (err) {

    console.log(err.response?.data || err.message);

    res.status(500).send("Error sending template");
  }
});

module.exports = router;