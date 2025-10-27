import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
    plugins: [react(), cssInjectedByJsPlugin()],
    build: {
        cssCodeSplit: false,
        emptyOutDir: false,
        assetsInlineLimit: 10000000,
        lib: {
            entry: 'src/index.ts',
            name: 'HapioBookingFlow',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'lodash.mergewith'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'React',
                    'lodash.mergewith': 'mergeWith',
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
});
