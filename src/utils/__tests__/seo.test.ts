import { describe, it, expect } from 'vitest'
import { buildAlternates } from '../seo'

describe('buildAlternates', () => {
    it('builds a self-referencing canonical URL for the current locale', () => {
        const alternates = buildAlternates('pt-BR', '/tech/post/my-post')

        expect(alternates.canonical).toBe('/pt-BR/tech/post/my-post')
    })

    it('builds a language alternate entry for every supported locale', () => {
        const alternates = buildAlternates('en', '/tech')

        expect(alternates.languages).toEqual({
            en: '/en/tech',
            'pt-BR': '/pt-BR/tech',
            'x-default': '/en/tech',
        })
    })

    it('handles an empty path suffix for the root locale page', () => {
        const alternates = buildAlternates('en', '')

        expect(alternates.canonical).toBe('/en')
        expect(alternates.languages['pt-BR']).toBe('/pt-BR')
    })
})
