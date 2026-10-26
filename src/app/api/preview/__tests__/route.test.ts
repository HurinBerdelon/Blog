import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'

const redirectToPreviewURL = vi.fn().mockResolvedValue(undefined)
const fakeClient = { id: 'fake-prismic-client' }

vi.mock('@prismicio/next', () => ({
    redirectToPreviewURL: (...args: unknown[]) => redirectToPreviewURL(...args),
}))

vi.mock('prismicio', () => ({
    createClient: () => fakeClient,
}))

describe('GET /api/preview', () => {
    it('delegates to redirectToPreviewURL with a prismic client and the incoming request', async () => {
        const { GET } = await import('../route')
        const request = new NextRequest('http://localhost/api/preview?token=abc')

        await GET(request)

        expect(redirectToPreviewURL).toHaveBeenCalledWith({ client: fakeClient, request })
    })
})
