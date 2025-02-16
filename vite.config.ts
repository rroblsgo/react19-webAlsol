import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/propertiesAlsol': {
        target: 'https://procesos.apinmo.com',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/propertiesAlsol/,
            '/xml/v2/WvM6fwnL/7421-web.xml'
          ),
      },
      '/api/properties': {
        target: 'https://procesos.apinmo.com',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/properties/,
            '/portal/mls/k2ja8xh25/grupomlsgica.xml'
          ),
      },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/proxy': {
        target: 'https://fotos15.apinmo.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''),
      },
      // '/api': {
      //   target: 'https://procesos.inmovilla.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      // },
    },
  },
});
