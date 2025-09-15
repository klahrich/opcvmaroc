import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/frontend',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
