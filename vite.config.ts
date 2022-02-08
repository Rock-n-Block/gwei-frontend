// import legacy from '@vitejs/plugin-legacy';
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  preview: {
    port: 3001,
  },
  plugins: [
    // legacy(),
    react(),
    tsconfigPaths({
      root: './',
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
    },
  },
});
