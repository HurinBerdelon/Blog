import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CookieConsentProvider, useCookieConsent } from '../useCookieConsent'

function Consumer() {
    const { consent, acceptCookies, declineCookies, resetConsent } = useCookieConsent()
    return (
        <div>
            <span data-testid="consent">{consent}</span>
            <button onClick={acceptCookies}>accept</button>
            <button onClick={declineCookies}>decline</button>
            <button onClick={resetConsent}>reset</button>
        </div>
    )
}

describe('useCookieConsent', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('defaults to pending when nothing is saved', async () => {
        render(<CookieConsentProvider><Consumer /></CookieConsentProvider>)

        await waitFor(() => expect(screen.getByTestId('consent')).toHaveTextContent('pending'))
    })

    it('restores a previously saved consent from localStorage', async () => {
        localStorage.setItem('hurinBlog-cookie-consent', 'accepted')

        render(<CookieConsentProvider><Consumer /></CookieConsentProvider>)

        await waitFor(() => expect(screen.getByTestId('consent')).toHaveTextContent('accepted'))
    })

    it('accepts, declines and persists the choice', async () => {
        const user = userEvent.setup()
        render(<CookieConsentProvider><Consumer /></CookieConsentProvider>)
        await waitFor(() => expect(screen.getByTestId('consent')).toHaveTextContent('pending'))

        await user.click(screen.getByText('accept'))
        await waitFor(() => expect(screen.getByTestId('consent')).toHaveTextContent('accepted'))
        expect(localStorage.getItem('hurinBlog-cookie-consent')).toBe('accepted')

        await user.click(screen.getByText('decline'))
        await waitFor(() => expect(screen.getByTestId('consent')).toHaveTextContent('declined'))
        expect(localStorage.getItem('hurinBlog-cookie-consent')).toBe('declined')
    })

    it('resets the consent back to pending and clears storage', async () => {
        const user = userEvent.setup()
        render(<CookieConsentProvider><Consumer /></CookieConsentProvider>)

        await user.click(screen.getByText('accept'))
        await waitFor(() => expect(screen.getByTestId('consent')).toHaveTextContent('accepted'))

        await user.click(screen.getByText('reset'))
        await waitFor(() => expect(screen.getByTestId('consent')).toHaveTextContent('pending'))
        expect(localStorage.getItem('hurinBlog-cookie-consent')).toBeNull()
    })
})
