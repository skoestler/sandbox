import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'public'  // matches moleculer-web assets folder
    },
    server: {
        proxy: {
            '/api': 'http://localhost:3000'  // proxy to moleculer-web in dev
        }
    }
});