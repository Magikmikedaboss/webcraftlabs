const config = {
  plugins: ["stylelint-scss"],
  rules: {
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["config", "theme", "apply", "layer", "screen", "tailwind"],
      },
    ],
  },
};

export default config;