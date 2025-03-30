import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';

// Load environment variables from .env file
const env = loadEnv('.env', process.cwd());

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    server: { // to run in docker container
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        origin: `${env.VITE_APP_URL.replace(/:\d+$/, "")}:5173`,
        cors: {
            origin: /https?:\/\/([A-Za-z0-9-.]+)?(\.ddev\.site)(?::\d+)?$/,
        },
    },
});
