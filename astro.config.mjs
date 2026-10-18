// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// Troque pelo domínio real antes de publicar (usado no sitemap, no canonical e no Open Graph).
export default defineConfig({
  site: "https://casadigitalrp-create.github.io",
  base: "/everton-castro-previa",
  output: "static",
  integrations: [sitemap()],
  // Fontes servidas pelo próprio site, com fallback de métricas ajustadas (evita "pulo" do texto ao carregar).
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Cormorant Garamond",
      cssVariable: "--font-cormorant",
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            src: [
              "@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2",
            ],
            weight: "300 700",
            style: "normal",
          },
          {
            src: [
              "@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-italic.woff2",
            ],
            weight: "300 700",
            style: "italic",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            src: ["@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"],
            weight: "100 900",
            style: "normal",
          },
        ],
      },
    },
  ],
  vite: { plugins: [tailwindcss()] },
});
