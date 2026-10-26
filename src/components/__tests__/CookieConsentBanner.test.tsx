import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CookieConsentBanner } from '../CookieConsentBanner'

const acceptCookies = vi.fn()
const declineCookies = vi.fn()
let consent: 'pending' | 'accepted' | 'declined' = 'pending'

vi.mock('@/hooks/useCookieConsent', () => ({
    useCookieConsent: () => ({ consent, acceptCookies, declineCookies }),
}))

vi.mock('@/hooks/useTranslation', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}))

describe('CookieConsentBanner', () => {
    beforeEach(() => {
        acceptCookies.mockClear()
        declineCookies.mockClear()
    })

    it('renders the banner when consent is pending', () => {
        consent = 'pending'
        render(<CookieConsentBanner />)

        expect(screen.getByText('common:cookieConsentMessage')).toBeInTheDocument()
    })

    it('calls acceptCookies when the accept button is clicked', async () => {
        consent = 'pending'
        const user = userEvent.setup()
        render(<CookieConsentBanner />)

        await user.click(screen.getByText('common:acceptCookies'))

        expect(acceptCookies).toHaveBeenCalled()
    })

    it('calls declineCookies when the decline button is clicked', async () => {
        consent = 'pending'
        const user = userEvent.setup()
        render(<CookieConsentBanner />)

        await user.click(screen.getByText('common:declineCookies'))

        expect(declineCookies).toHaveBeenCalled()
    })

    it('renders nothing once consent has been given', () => {
        consent = 'accepted'
        const { container } = render(<CookieConsentBanner />)

        expect(container).toBeEmptyDOMElement()
    })
})
