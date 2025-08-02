// vite.config.ts (Upgraded to force a stable port)

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    // --- Add this configuration block ---
    server: {
        port: 5174, // Force the app to always run on port 5174
        strictPort: true, // If port 5174 is busy, fail immediately instead of trying another port
    },
    // ------------------------------------
});
