const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 PocketPilot server running on port ${PORT}`);
});