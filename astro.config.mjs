// @ts-check
import { defineConfig } from 'astro/config';
import svgr from "vite-plugin-svgr"
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  experimental: {
    svg: true,
  },

  integrations: [react()],
  vite: {
    plugins: [
      svgr({
        include: '**/*.svg?react',
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgoConfig: {
            plugins: ['preset-default', 'removeTitle', 'removeDesc', 'removeDoctype', 'cleanupIds'],
          }
        }
      })
    ]
  }
});
