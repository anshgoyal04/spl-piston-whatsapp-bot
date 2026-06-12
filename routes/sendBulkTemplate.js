const express = require("express");
const axios = require("axios");

const router = express.Router();
console.log("TEMPLATE = new_product_temp");
router.get("/", async (req, res) => {
      console.log("🚀 BULK TEMPLATE ROUTE HIT");
  console.log("IP:", req.ip);
  console.log("Time:", new Date());

  const secret = req.query.secret;

  if (secret !== "spl123") {
    return res.status(401).send("Unauthorized");
  }
  try {

    const sheetResponse = await axios.get(
      "https://script.google.com/macros/s/AKfycbz2Oi-snSlZ10Luhn2R-SaYvUy6kGEFAXjNyntpF8aNWsHPXCei3288yQevGZH8Ou2o1w/exec"
    );

    const leads = sheetResponse.data;

    let sent = 0;

    for (const lead of leads) {

      if (
        !lead.phone ||
        lead.status === "Sent"
      ) {
        continue;
      }

      try {

        await axios.post(

          `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,

          {
            messaging_product: "whatsapp",

            to: lead.phone,

            type: "template",

            template: {

              name: "new_product_temp",

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
                        link: "https://drive.google.com/file/d/1XwQhGCgKGwFq2IMW1eySrmCMRUHBEAyW/view?usp=sharing"
                      }
                    }
                  ]
                }
              ]
            }
          },

          {
            headers: {
              Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
              "Content-Type": "application/json"
            }
          }
        );

        sent++;

        console.log(
          `Template sent to ${lead.phone}`
        );

      } catch (err) {

        console.log(
          `Failed ${lead.phone}`
        );

      }

      await new Promise(resolve =>
        setTimeout(resolve, 1500)
      );
    }

    res.send(
      `${sent} templates sent successfully`
    );

  } catch (error) {

    console.log(error.message);

    res.status(500).send("Error");
    console.log(
    JSON.stringify(
      err.response?.data,
      null,
      2
    )
  );
  }
});

module.exports = router;