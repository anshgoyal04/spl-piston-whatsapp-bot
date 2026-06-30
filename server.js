const express = require("express");
const sendTemplateRoute = require("./routes/sendTemplate");
require("dotenv").config();
const webhookRoute = require("./routes/webhook");
const app = express();
const sendBulkTemplateRoute =
require("./routes/sendBulkTemplate");
const sendMessageRoute = require("./routes/sendMessage");

app.use("/send-message", sendMessageRoute);
app.use(
  "/send-bulk-template",
  sendBulkTemplateRoute
);
app.use("/send-template", sendTemplateRoute);
app.use(express.json());
app.use("/webhook", webhookRoute);
app.get("/", (req, res) => {
  res.send("SPL Piston WhatsApp Bot Running 🚀");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});