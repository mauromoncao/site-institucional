import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Code splitting para reduzir bundle inicial
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — sempre carregado
          "vendor-react": ["react", "react-dom"],
          // Roteamento
          "vendor-router": ["wouter"],
          // UI components (radix, etc) — dividido em dois para carregar em paralelo
          "vendor-ui-core": [
            "@radix-ui/react-tooltip",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-slot",
          ],
          "vendor-ui-extra": [
            "@radix-ui/react-label",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-accordion",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-switch",
          ],
          // tRPC + query
          "vendor-trpc": ["@trpc/client", "@trpc/react-query", "@tanstack/react-query"],
          // superjson separado
          "vendor-superjson": ["superjson"],
          // Formulários
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          // Icons
          "vendor-icons": ["lucide-react"],
        },
      },
    },
    // Avisa a partir de 300kb (era 500kb)
    chunkSizeWarningLimit: 300,
  },
  server: {
    host: true,
    allowedHosts: true,
  },
});
