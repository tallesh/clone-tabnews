const dotenv = require("dotenv");
const nextJest = require("next/jest.js");

dotenv.config({ path: ".env.development" });

const createJestConfig = nextJest({
  dir: "./",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
