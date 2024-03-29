module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["standard"],
  globals: {
    use: true,
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {}
};
