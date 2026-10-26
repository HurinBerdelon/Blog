import { describe, it, expect, vi } from 'vitest'
import type { Query, PrismicDocument } from '@prismicio/types'
import { fetchWithLocaleFallback } from '../fetchWithLocaleFallback'

function makeQuery(results: unknown[]): Query<PrismicDocument> {
    return { results } as unknown as Query<PrismicDocument>
}

describe('fetchWithLocaleFallback', () => {
    it('returns the primary result when it has entries, without falling back', async () => {
        const fetchFn = vi.fn().mockResolvedValue(makeQuery([{ id: '1' }]))

        const result = await fetchWithLocaleFallback('en', fetchFn)

        expect(fetchFn).toHaveBeenCalledTimes(1)
        expect(fetchFn).toHaveBeenCalledWith('en-us')
        expect(result).toEqual({ data: makeQuery([{ id: '1' }]), resolvedLang: 'en', usedFallback: false })
    })

    it('falls back to the other locale when the primary result is empty', async () => {
        const fetchFn = vi.fn()
            .mockResolvedValueOnce(makeQuery([]))
            .mockResolvedValueOnce(makeQuery([{ id: '1' }]))

        const result = await fetchWithLocaleFallback('pt-BR', fetchFn)

        expect(fetchFn).toHaveBeenNthCalledWith(1, 'pt-br')
        expect(fetchFn).toHaveBeenNthCalledWith(2, 'en-us')
        expect(result.resolvedLang).toBe('en')
        expect(result.usedFallback).toBe(true)
        expect(result.data.results).toHaveLength(1)
    })

    it('reports usedFallback as false when both the primary and fallback are empty', async () => {
        const fetchFn = vi.fn().mockResolvedValue(makeQuery([]))

        const result = await fetchWithLocaleFallback('en', fetchFn)

        expect(result.resolvedLang).toBe('pt-BR')
        expect(result.usedFallback).toBe(false)
        expect(result.data.results).toHaveLength(0)
    })

    it('treats an unknown lang as the default locale', async () => {
        const fetchFn = vi.fn().mockResolvedValue(makeQuery([{ id: '1' }]))

        const result = await fetchWithLocaleFallback('fr-fr', fetchFn)

        expect(fetchFn).toHaveBeenCalledWith('en-us')
        expect(result.resolvedLang).toBe('en')
    })
})
