import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
      "indent": ["error", 2], 
      "react/jsx-indent": ["error", 2], 
      "react/jsx-indent-props": ["error", 2], 
      "react/jsx-newline": ["error", { "prevent": true }], 
    },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];