import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import editableRegions from "@cloudcannon/editable-regions/astro-integration";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Override SITE_URL in the hosting build environment if the production domain changes.
const siteUrl = process.env.SITE_URL || "https://devotioncreative.com";

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
