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
          replacement: (_, p1) => path.join(process.cwd(), 'node_modules', p1)
        },
        {
          find: /^src\/(.*)/,
          replacement: (_, p1) => path.resolve(process.cwd(), 'src', p1)
        },
        {
          find: /^src$/,
          replacement: path.resolve(process.cwd(), 'src')
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
