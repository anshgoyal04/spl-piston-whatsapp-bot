const axios = require("axios");

async function saveLead(sheet, data) {
  try {
    console.log("Saving to sheet:", sheet);
    console.log("Data:", data);

    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycby66SRVL33MbQ4MFFTFl6AU7sOliHQi70JV2jSNgd1Mw-fOgth2MmMaT2FTewBQIdgy4g/exec?sheet=" + encodeURIComponent(sheet),
      data
    );

    console.log("✅ Lead Saved");
    console.log(response.data);

  } catch (error) {
    console.log("❌ Save Error");

    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

module.exports = { saveLead };