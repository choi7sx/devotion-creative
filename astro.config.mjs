import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import editableRegions from "@cloudcannon/editable-regions/astro-integration";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Set SITE_URL in the hosting build environment when using a custom domain.
const siteUrl = process.env.SITE_URL || "https://devotion-creative.choi7sx.chatgpt.site";

export default defineConfig({
  site: siteUrl,
  trailingSlash: "always",
  integrations: [react(), editableRegions(), mdx(), sitemap({
    filter: (page) => !/\/404(?:\.html)?\/?$/.test(new URL(page).pathname),
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
