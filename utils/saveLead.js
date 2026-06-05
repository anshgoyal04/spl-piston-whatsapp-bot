const axios = require("axios");

async function saveLead(sheet, data) {
  try {
    await axios.post(
      "https://script.google.com/macros/s/AKfycby66SRVL33MbQ4MFFTFl6AU7sOliHQi70JV2jSNgd1Mw-fOgth2MmMaT2FTewBQIdgy4g/exec?sheet=" + sheet,
      data
    );

    console.log("✅ Lead Saved");
  } catch (error) {
    console.log("❌ Save Error");
    console.log(error.message);
  }
}

module.exports = { saveLead };