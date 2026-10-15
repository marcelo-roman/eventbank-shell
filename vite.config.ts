import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
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
