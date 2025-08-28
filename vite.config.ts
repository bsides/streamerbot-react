import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        '@streamerbot/client',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        format: 'esm',
        preserveModules: true,
        interop: 'auto',
      },
    },
  },
})
