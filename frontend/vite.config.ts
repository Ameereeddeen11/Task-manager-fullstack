import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/task-lists': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
            '/tasks': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            }
        }
    }
})