module.exports = {
  plugins: [
    "stylelint-scss",
    "stylelint-prettier"
  ],
  extends: [
    "stylelint-config-sass-guidelines",
    "stylelint-config-prettier"
  ],
  rules: {
    "prettier/prettier": true
  }
}
