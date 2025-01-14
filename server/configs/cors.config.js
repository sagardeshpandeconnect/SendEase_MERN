const cors = require("cors");

const corsConfig = cors({
  origin: ["http://192.168.43.5:5173"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
});

module.exports = corsConfig;
