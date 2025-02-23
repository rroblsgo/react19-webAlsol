import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // console.log('Loaded ENV:', env); // Debugging

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api2': {
          target: 'https://procesos.inmovilla.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api2/, '/api/v1'),
        },
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
      },
    },
    define: {
      'process.env': env, // 👈 Ensures .env is correctly loaded
    },
  };
});
