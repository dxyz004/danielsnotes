import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // Use our custom Tailwind config from the shared package
      config: { applyBaseStyles: false }
    }),
    mdx()
  ],
  // Specify the output directory for the build
  outDir: './dist',
  // Set the site URL - update this for production
  site: 'https://your-personal-site.dev',
  // Configure the build output
  build: {
    // Generate appropriate assets for deployment
    assets: '_assets'
  },
});