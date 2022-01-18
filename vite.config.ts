// import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    // legacy(),
    react(),
    tsconfigPaths({
      root: './',
    }),
  ],
  resolve: {
    alias: {
      web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
    },
  },
});
