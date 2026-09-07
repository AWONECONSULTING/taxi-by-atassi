import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.taxibyatassi.fr",
  output: "static",
  build: {
    inlineStylesheets: "always",
  },
  integrations: [sitemap()],
});
