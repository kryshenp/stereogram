import typescript from "@typescript-eslint/eslint-plugin";
import cypress from "eslint-plugin-cypress";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      cypress: cypress,
    },
    rules: {
      "array-bracket-spacing": ["error", "never"],
      "arrow-spacing": "error",
      "block-spacing": ["error", "never"],
      "brace-style": ["warn", "1tbs", { allowSingleLine: true }],
      "comma-dangle": ["warn", "always-multiline"],
      "comma-spacing": ["error", { after: true, before: false }],
      "comma-style": ["error", "last"],
      "computed-property-spacing": ["error", "never"],
      "cypress/no-assigning-return-values": "error",
      "cypress/no-async-before": "error",
      "cypress/no-async-tests": "error",
      "cypress/no-debug": "error",
      "cypress/no-pause": "error",
      "cypress/no-unnecessary-waiting": "error",
      "func-call-spacing": ["error", "never"],
      "generator-star-spacing": ["warn", "after"],
      "import/no-extraneous-dependencies": "off",
      indent: ["error", "tab"],
      "key-spacing": ["error", { afterColon: true, beforeColon: false }],
      "keyword-spacing": ["error", { after: true, before: true }],
      "max-len": ["error", 160],
      "no-multi-spaces": "error",
      "no-whitespace-before-property": "error",
      "object-curly-spacing": ["error", "always"],
      quotes: [
        "warn",
        "double",
        { allowTemplateLiterals: true, avoidEscape: true },
      ],
      semi: ["error", "always"],
      "semi-spacing": ["error", { after: true, before: false }],
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": ["error", "never"],
      "space-in-parens": ["error", "never"],
      "space-infix-ops": "error",
      "space-unary-ops": ["error", { nonwords: false, words: true }],
      "rest-spread-spacing": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { ignoreRestSiblings: true },
      ],
    },
  },
];
