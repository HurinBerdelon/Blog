import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from '../middleware'

function makeRequest(path: string, acceptLanguage?: string) {
    const headers = new Headers()
    if (acceptLanguage) headers.set('accept-language', acceptLanguage)
    return new NextRequest(new URL(path, 'http://localhost'), { headers })
}

describe('middleware', () => {
    it('does nothing when the path already has a locale prefix', () => {
        expect(middleware(makeRequest('/en'))).toBeUndefined()
        expect(middleware(makeRequest('/en/about'))).toBeUndefined()
        expect(middleware(makeRequest('/pt-BR/about'))).toBeUndefined()
    })

    it('redirects to the locale matching accept-language when none is present in the path', () => {
        const response = middleware(makeRequest('/about', 'pt-BR,pt;q=0.9'))

        expect(response?.status).toBe(307)
        expect(new URL(response!.headers.get('location')!).pathname).toBe('/pt-BR/about')
    })

    it('redirects using the default locale when accept-language has no match', () => {
        const response = middleware(makeRequest('/about', 'fr-FR,fr;q=0.9'))

        expect(new URL(response!.headers.get('location')!).pathname).toBe('/en/about')
    })

    it('redirects using the default locale when accept-language is missing', () => {
        const response = middleware(makeRequest('/about'))

        expect(new URL(response!.headers.get('location')!).pathname).toBe('/en/about')
    })

    it('does not treat a locale-like prefix of another segment as a locale', () => {
        const response = middleware(makeRequest('/entrance'))

        expect(new URL(response!.headers.get('location')!).pathname).toBe('/en/entrance')
    })
})
