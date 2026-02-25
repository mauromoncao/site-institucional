// Vercel auto-detects Express apps at index.{ts,js} in the root
// This file re-exports the configured Express app for Vercel serverless
export { default } from "./server/_core/index";
