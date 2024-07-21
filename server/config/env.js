const dotenv = require("dotenv");
const path = require("path");

const loadEnv = () => {
  // let NODE_ENV = 'production'
  let NODE_ENV = ''

  let envFile;

  switch (NODE_ENV) {
    case 'production':
      envFile = ".env.production";
      break;
      case 'testing':
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
