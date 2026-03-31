const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const env = {
  dositraceURL: process.env.DOSITRACE,
  baseURL: process.env.BASE,
  dositraceLogin: process.env.DOSITRACE_USERNAME,
  dositracePassword: process.env.DOSITRACE_PASSWORD,
};

module.exports = env;