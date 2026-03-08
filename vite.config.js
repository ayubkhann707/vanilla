import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    devSourcemap: true, // Enable CSS source maps during development
  },
  build: {
    sourcemap: true,
  },
});
