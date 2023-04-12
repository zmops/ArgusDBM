import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import Jsx from '@vitejs/plugin-vue-jsx';
const dirname = resolve();
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(dirname, 'src')}/`,
    },
  },
  plugins: [Vue(), Jsx()],
  test: {
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    coverage: {
      exclude: ['index.ts'],
      reporter: ['text', 'json', 'html'],
    },
    globals: true,
    environment: 'jsdom',
    watch: false
  },
});
