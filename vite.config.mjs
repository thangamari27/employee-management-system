import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [react(), jsconfigPaths()],

    // ✅ Use dynamic base for deployment compatibility
    base: isProd ? './' : '/',

    define: {
      global: 'window' // Fix for some legacy libraries
    },

    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), 'node_modules/$1')
        },
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), 'src/$1')
        },
         {
          pages: path.resolve(__dirname, 'src/pages'),
        }
      ]
    },

    server: {
      open: true,
      port: 3000
    },

    preview: {
      open: true,
      port: 3000
    }
  };
});
