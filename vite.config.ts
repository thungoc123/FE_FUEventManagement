import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import NodePolyfills from 'vite-plugin-node-polyfills'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
 
// });


export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    react(),
    // nodePolyfills({
    //   // To include specific polyfills, you can pass an options object:
    //   crypto: true,
    //   stream: true,
    //   util: true,
    //   buffer: true,
    //   process: true,
    // }),
    nodePolyfills({ include: ['crypto', 'stream','util','buffer','process'] })
  ],
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
      util: 'util',
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
    },
  },
});