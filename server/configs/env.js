const dotenv = require("dotenv");
const path = require("path");

const loadEnv = () => {
  // let NODE_ENV = "production";
  let NODE_ENV = "";

  if (!NODE_ENV) {
    console.warn("NODE_ENV is not set. No .env file will be loaded.");
    return;
  }

  let envFile;

  switch (NODE_ENV) {
    case "production":
      envFile = ".env.production";
      break;
    case "testing":
      envFile = ".env.testing";
      break;
    default:
      envFile = ".env.development";
      break;
  }

  const envPath = path.resolve(__dirname, "../", envFile);
  dotenv.config({ path: envPath });
};

module.exports = loadEnv;
