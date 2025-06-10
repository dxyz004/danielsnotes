/** @type {import('tailwindcss').Config} */
const sharedTailwindConfig = require('@personal-website/config/tailwind');

module.exports = {
  // Extend the shared config
  ...sharedTailwindConfig,
  // Add any app-specific content paths
  content: [
    ...sharedTailwindConfig.content,
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
};