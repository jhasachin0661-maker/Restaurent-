import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Ignore generated files and example code
  { ignores: [".next/**", "node_modules/**", "master/**", "kairo/**", "kairo/kairo/**"] },
]);
