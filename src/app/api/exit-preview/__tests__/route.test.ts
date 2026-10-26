import { describe, it, expect, vi } from 'vitest'
import { NextResponse } from 'next/server'

const exitPreviewResponse = NextResponse.json({ ok: true })
const exitPreview = vi.fn().mockResolvedValue(exitPreviewResponse)

vi.mock('@prismicio/next', () => ({
    exitPreview: (...args: unknown[]) => exitPreview(...args),
}))

describe('GET /api/exit-preview', () => {
    it('delegates to exitPreview and returns its response', async () => {
        const { GET } = await import('../route')

        const response = await GET()

        expect(exitPreview).toHaveBeenCalled()
        expect(response).toBe(exitPreviewResponse)
    })
})
