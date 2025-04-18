import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 3000,
        allowedHosts: ['frontend'],
        hmr: false,
        https: false,
        cors: true,
        strictPort: true,
        watch: {
            usePolling: true,
        }
    },
});
