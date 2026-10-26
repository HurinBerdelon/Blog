import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Share } from '../Share'

describe('Share', () => {
    afterEach(() => {
        // @ts-expect-error -- test-only cleanup of a property we define per-test
        delete window.navigator.share
    })

    it('renders the social share buttons without a native share option by default', () => {
        render(<Share postLink="https://example.com/post" title="My Post" />)

        expect(screen.getByText(/Facebook/)).toBeInTheDocument()
        expect(screen.getByText(/Twitter/)).toBeInTheDocument()
        expect(screen.getByText(/LinkedIn/)).toBeInTheDocument()
        expect(screen.getByText(/WhatsApp/)).toBeInTheDocument()
        expect(screen.queryByText(/shareMore/)).not.toBeInTheDocument()
    })

    it('shows a native share button when navigator.share is available and uses it on click', async () => {
        const share = vi.fn().mockResolvedValue(undefined)
        Object.defineProperty(window.navigator, 'share', { value: share, configurable: true })

        const user = userEvent.setup()
        render(<Share postLink="https://example.com/post" title="My Post" />)

        const nativeButton = await waitFor(() => screen.getByText(/shareMore/).closest('button')!)
        await user.click(nativeButton)

        expect(share).toHaveBeenCalledWith({ title: 'My Post', url: 'https://example.com/post' })
    })
})
