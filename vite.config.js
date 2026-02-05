import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.svg", "robots.txt"],

      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,webp}"],

        runtimeCaching: [
          /* ================= PUBLIC HTML PAGES ================= */
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-pages",
              networkTimeoutSeconds: 3, // KEY FIX
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1, // 1 day
              },
            },
          },

          /* ================= PUBLIC BLOG API ================= */
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/public-blogs"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "public-blogs-api",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },

          /* ================= BLOCK PRIVATE / ADMIN ================= */
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/blogs") ||
              url.pathname.startsWith("/dashboard"),
            handler: "NetworkOnly",
          },

          /* ================= JS & CSS ================= */
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets",
            },
          },

          /* ================= IMAGES ================= */
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },

      manifest: {
        name: "Prashant Portfolio",
        short_name: "Prashant",
        description: "Full Stack MERN Developer Portfolio",
        theme_color: "#052659",
        background_color: "#7DA0CA",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
