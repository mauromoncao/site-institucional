// OAuth routes - disabled (using local admin auth instead)
// This file is kept for compatibility but does not register any external OAuth routes.

import type { Express } from "express";

export function registerOAuthRoutes(app: Express) {
  // No external OAuth routes needed - admin auth is handled via tRPC adminAuth router
  // with local email/password and optional Google login
  console.log("[Auth] Using local admin authentication (no external OAuth)");
}
