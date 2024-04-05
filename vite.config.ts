/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['src/setupTests.ts'],
        coverage: {
            provider: 'v8',
            exclude: [...(configDefaults.coverage.exclude || []), '*.config.js'],
            all: true,
        },
        css: true,
    },
    build: {
        target: 'esnext',
    },
});
