import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'public', // Change the output directory to 'public'
  },
  plugins: [react(), mkcert()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
