import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: 'https://yashsavalia1.github.io',
  base: '/website',
  integrations: [mdx(), sitemap(), tailwind()],
  output: "server",
  adapter: node()
});