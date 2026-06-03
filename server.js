const express = require("express");
require("dotenv").config();
const webhookRoute = require("./routes/webhook");
const app = express();

app.use(express.json());
app.use("/webhook", webhookRoute);
app.get("/", (req, res) => {
  res.send("SPL Piston WhatsApp Bot Running 🚀");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});