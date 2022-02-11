module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: ["**/*.test.js"],
  rules: {},
  globals: {
    __dirname: true,
  },
}
