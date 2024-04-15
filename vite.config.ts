/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { configDefaults } from 'vitest/config';

const replaceEnvValue = (value: string | undefined) => {
    if (value === 'true' || value === 'false') {
        return value === 'true';
    }

    return JSON.stringify(value);
};

const defineEnvConstants = (env: Record<string, string>) =>
    Object.entries(env).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key.replace('VITE_', '')]: replaceEnvValue(value),
        }),
        {}
    );

// https://vitejs.dev/config/
export default defineConfig((config) => {
    const env = loadEnv(config.mode, process.cwd());

    return {
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
        define: {
            ...defineEnvConstants(env),
        },
    };
});
