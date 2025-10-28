import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                course: resolve(__dirname, 'course.html'),
                coursesList: resolve(__dirname, 'coursesList.html'),
                buyedCourse: resolve(__dirname, 'buyedCourse.html'),
                account: resolve(__dirname, 'accoint.html')
            },
        },
    },
});
