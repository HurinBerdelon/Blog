import { describe, it, expect } from 'vitest'
import { localeFromPrismicCode } from '../languages'

describe('localeFromPrismicCode', () => {
    it('resolves "en-us" to "en"', () => {
        expect(localeFromPrismicCode('en-us')).toBe('en')
    })

    it('resolves "pt-br" to "pt-BR"', () => {
        expect(localeFromPrismicCode('pt-br')).toBe('pt-BR')
    })

    it('returns undefined for an unknown prismic code', () => {
        expect(localeFromPrismicCode('fr-fr')).toBeUndefined()
    })
})
