import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

export default defineConfig({
  plugins: [nodePolyfills()],
  resolve: {
    alias: {
      // alias for crypto
      crypto: 'crypto-browserify',
    },
  },
});
