import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'

const revalidateTag = vi.fn()

vi.mock('next/cache', () => ({
    revalidateTag: (...args: unknown[]) => revalidateTag(...args),
}))

function makeRequest(secret?: string) {
    const url = new URL('http://localhost/api/revalidate')
    if (secret !== undefined) url.searchParams.set('secret', secret)
    return new NextRequest(url, { method: 'POST' })
}

describe('POST /api/revalidate', () => {
    const originalSecret = process.env.PRISMIC_WEBHOOK_SECRET

    beforeEach(() => {
        process.env.PRISMIC_WEBHOOK_SECRET = 'correct-secret'
        revalidateTag.mockClear()
    })

    afterEach(() => {
        process.env.PRISMIC_WEBHOOK_SECRET = originalSecret
    })

    it('returns 401 and does not revalidate when the secret is missing', async () => {
        const { POST } = await import('../route')

        const response = await POST(makeRequest())

        expect(response.status).toBe(401)
        expect(await response.json()).toEqual({ message: 'Invalid secret' })
        expect(revalidateTag).not.toHaveBeenCalled()
    })

    it('returns 401 and does not revalidate when the secret is wrong', async () => {
        const { POST } = await import('../route')

        const response = await POST(makeRequest('wrong-secret'))

        expect(response.status).toBe(401)
        expect(revalidateTag).not.toHaveBeenCalled()
    })

    it('revalidates the prismic tag and returns 200 when the secret matches', async () => {
        const { POST } = await import('../route')

        const response = await POST(makeRequest('correct-secret'))

        expect(revalidateTag).toHaveBeenCalledWith('prismic', {})
        expect(response.status).toBe(200)
        expect(await response.json()).toEqual({ revalidated: true })
    })
})
