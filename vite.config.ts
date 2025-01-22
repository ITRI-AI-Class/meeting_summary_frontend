import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // console.log(mode);
  const useHttps = mode !== 'localtest';

  return {
    build: {
      outDir: 'public', // Change the output directory to 'public'
    },
    plugins: [
      react(), 
      useHttps ? mkcert() : null,
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  }
})
