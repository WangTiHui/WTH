module.exports = {
  presets: ["@vue/app"],
  plugins: [
    ["@babel/plugin-transform-runtime", { corejs: 2 }],
    "@babel/plugin-proposal-export-default-from"
  ]
};
