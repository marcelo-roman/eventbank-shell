import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';

function versionedTheme(): Plugin {
  return {
    name: 'versioned-theme',
    apply: 'build',
    transformIndexHtml(html) {
      const version = createHash('sha256').update(readFileSync('public/theme.css')).digest('hex').slice(0, 12);
      return html.replace('href="/theme.css"', `href="/theme.css?v=${version}"`);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    versionedTheme(),
    federation({
      name: 'shell',
      remotes: {},
      dts: false,
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router': { singleton: true },
        '@tanstack/react-query': { singleton: true },
      },
    }),
  ],
  server: {
    proxy: {
      '/api': process.env.GATEWAY_URL ?? 'http://localhost:5100',
    },
  },
  build: {
    target: 'es2022',
  },
});
