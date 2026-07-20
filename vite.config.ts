import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    // poc/*.html 是自包含的靜態示範頁（Inspector/Editor 劃分），不進 SPA 路由，
    // 但仍要進 dist/ 供 Projects 頁連結
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'poc-inspector': resolve(__dirname, 'poc/inspector.html'),
        'poc-editor': resolve(__dirname, 'poc/editor.html'),
      },
    },
  },
});
