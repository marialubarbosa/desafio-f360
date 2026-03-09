import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@composables': path.resolve(__dirname, 'src/composables'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@schemas': path.resolve(__dirname, 'src/schemas'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
    },
  },
})
