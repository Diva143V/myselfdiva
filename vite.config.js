import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: ['es2020', 'safari14', 'chrome87', 'firefox78', 'edge88'],
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
