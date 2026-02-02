import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { config as baseConfig } from "./base.js";

export const config = [
  ...baseConfig,
  ...nextVitals,
  ...nextTs,
];