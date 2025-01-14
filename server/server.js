const app = require("./app");
const loadEnvironmentVariables = require("./configs/env.config");
const connectDB = require("./configs/db.config");

// Load environment variables
loadEnvironmentVariables();

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 6001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
