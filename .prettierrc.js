module.exports = {
  trailingComma: "none",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 70,
  endOfLine: "auto",
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./tailwind.config.js"
};
