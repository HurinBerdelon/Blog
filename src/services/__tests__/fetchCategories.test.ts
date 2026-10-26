import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchCategories } from '../fetchCategories'

const getAllByType = vi.fn()

vi.mock('prismicio', () => ({
    createClient: () => ({ getAllByType }),
}))

describe('fetchCategories', () => {
    beforeEach(() => {
        getAllByType.mockReset()
    })

    it('counts tags across posts and sorts them by frequency, descending', async () => {
        getAllByType.mockResolvedValue([
            { tags: ['react', 'frontend'] },
            { tags: ['react'] },
            { tags: ['backend'] },
        ])

        const result = await fetchCategories('tech', 'en')

        expect(result).toEqual([
            { tag: 'react', count: 2 },
            { tag: 'frontend', count: 1 },
            { tag: 'backend', count: 1 },
        ])
    })

    it('returns an empty array when there are no posts', async () => {
        getAllByType.mockResolvedValue([])

        const result = await fetchCategories('tech', 'en')

        expect(result).toEqual([])
    })

    it('resolves the prismic locale code for the given lang', async () => {
        getAllByType.mockResolvedValue([])

        await fetchCategories('humanities', 'pt-BR')

        expect(getAllByType).toHaveBeenCalledWith(
            'blog_post',
            expect.objectContaining({ lang: 'pt-br' })
        )
    })

    it('falls back to "en-us" for an unknown lang', async () => {
        getAllByType.mockResolvedValue([])

        await fetchCategories('tech', 'fr-fr')

        expect(getAllByType).toHaveBeenCalledWith(
            'blog_post',
            expect.objectContaining({ lang: 'en-us' })
        )
    })
})
