import { resolve } from 'path';
import { type PluginOption, defineConfig } from 'vite';
import httpProxy from 'http-proxy';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: '', // makes path relative to there deployment directory
    plugins: [greycatProxy(), svelte()],
    appType: 'mpa',
    esbuild: {
      supported: {
        'top-level-await': true, // browsers can handle top-level-await features
      },
    },

    define: {
      // This ensures libraries that leverages 'process.env.NODE_ENV'
      // have it replaced statically before dead-code removal
      'process.env.NODE_ENV': JSON.stringify(mode),
    },

    build: {
      emptyOutDir: true,
      outDir: resolve(__dirname, 'dist'),
      rollupOptions: {

      },
    },
  };
});

/**
 * This plugin ensures '^/files' and POST requests are proxied to GreyCat rather
 * than trying to be answered by vitejs's dev server.
 */
function greycatProxy(): PluginOption {
  // If you are not running GreyCat on the default :8080 port, update the `target`:
  const proxy = httpProxy.createProxyServer({
    target: 'http://127.0.0.1:8080',
  });

  return {
    name: 'greycat-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.originalUrl && req.headers.upgrade !== 'websocket') {
          const isFileApi =
            (req.method === 'GET' ||
              req.method === 'PUT' ||
              req.method === 'DELETE') &&
            req.originalUrl.match(/^\/files\//);
          const isRpc = !isFileApi && req.method === 'POST';
          if (isFileApi || isRpc) {
            // proxy to GreyCat
            proxy.web(req, res, {}, (err) => {
              console.error(`${err.code}: make sure GreyCat is started and listening at ${proxy.options.target}`);
              return;
            });
            return;
          }
        }
        next();
      });
    },
  };
}