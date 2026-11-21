import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          postprocessing: ['postprocessing'],
          gsap: ['gsap', 'gsap/ScrollTrigger'],
          lenis: ['lenis']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
