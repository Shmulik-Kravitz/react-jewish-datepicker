import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import filterConsole from '../utils/filterConsoleUtils';
const disableFilter = filterConsole(['MODULE_NOT_FOUND']);

export const getConfig = () => defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    watch: false,
    setupFiles: [__dirname + '/vitest.setup.ts'],
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html', 'cobertura'],
      exclude: ['**/.pnp.*'],
      
    },
    exclude: [...configDefaults.exclude, '**/.pnp.*'],
  },
})