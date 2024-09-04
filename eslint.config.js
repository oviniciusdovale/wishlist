import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    rules: {
      "no-console": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "vue/html-indent": ["error", 2],
      "@typescript-eslint/no-unused-vars": "warn",
      "prettier/prettier": "error"
    }
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      "quotes": ["error", "single"],
    },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettier,
  prettierPlugin,
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
];
