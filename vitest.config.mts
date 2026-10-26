import { defineConfig } from 'vitest/config'

export default defineConfig({
    resolve: { tsconfigPaths: true },
    test: {
        environment: 'happy-dom',
        include: ['src/**/__tests__/**/*.test.ts', 'src/**/__tests__/**/*.test.tsx'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/**/*.d.ts', 'src/app/**'],
        },
    },
})
