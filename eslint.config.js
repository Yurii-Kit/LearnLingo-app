import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

const isProd = process.env.NODE_ENV === "production";

const config = [
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      import: importPlugin,
    },
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

      // === ГОЛОВНЕ: ПЕРЕВІРКА ІМПОРТІВ ===
      "import/no-unresolved": ["error", { caseSensitive: true }],
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
    },
  },
];

export default config;
