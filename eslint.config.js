import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const isProd = process.env.NODE_ENV === "production";

const config = [
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      !isProd && reactRefresh.configs.vite,
    ].filter(Boolean),
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "react-refresh/only-export-components": [
        isProd ? "off" : "warn",
        { allowConstantExport: true },
      ],
    },
  },
];

export default config;
