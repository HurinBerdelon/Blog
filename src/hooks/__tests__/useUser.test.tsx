import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Session } from 'next-auth'
import { appKeys } from '@/config/AppKeys'
import { UserProvider, useUser } from '../useUser'

const apiGet = vi.fn()
const apiPost = vi.fn()
const apiDelete = vi.fn()

vi.mock('@/services/api', () => ({
    api: {
        get: (...args: unknown[]) => apiGet(...args),
        post: (...args: unknown[]) => apiPost(...args),
        patch: vi.fn(),
        delete: (...args: unknown[]) => apiDelete(...args),
        defaults: { headers: {} as Record<string, string> },
    },
}))

const getCookie = vi.fn()
const setCookie = vi.fn()
const deleteCookie = vi.fn()

vi.mock('@/services/cookies', () => ({
    getCookie: (...args: unknown[]) => getCookie(...args),
    setCookie: (...args: unknown[]) => setCookie(...args),
    deleteCookie: (...args: unknown[]) => deleteCookie(...args),
}))

const signOut = vi.fn()

vi.mock('next-auth/react', () => ({
    signOut: (...args: unknown[]) => signOut(...args),
}))

const push = vi.fn()

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push }),
    usePathname: () => '/some/path',
    useParams: () => ({ lang: 'en' }),
}))

function Consumer() {
    const { user, isAuthenticated, authenticate, revokeAuthentication, deleteUserAccount, setPath } = useUser()
    return (
        <div>
            <span data-testid="authenticated">{String(isAuthenticated)}</span>
            <span data-testid="user-name">{user?.name ?? ''}</span>
            <button onClick={() => authenticate({ user: { name: 'Jane', providerId: 'g-1', image: 'pic.png' } } as unknown as Session)}>
                authenticate
            </button>
            <button onClick={revokeAuthentication}>revoke</button>
            <button onClick={deleteUserAccount}>delete-account</button>
            <button onClick={setPath}>set-path</button>
        </div>
    )
}

describe('useUser', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        localStorage.clear()
        getCookie.mockReturnValue('')
    })

    it('fetches the current user on mount when an access token cookie is present', async () => {
        getCookie.mockReturnValue('existing-token')
        apiGet.mockResolvedValue({ data: { id: '1', name: 'Jane' } })

        render(<UserProvider><Consumer /></UserProvider>)

        await waitFor(() => expect(screen.getByTestId('authenticated')).toHaveTextContent('true'))
        expect(screen.getByTestId('user-name')).toHaveTextContent('Jane')
        expect(apiGet).toHaveBeenCalledWith('/user/me')
    })

    it('does not fetch the user when there is no access token cookie', () => {
        render(<UserProvider><Consumer /></UserProvider>)

        expect(apiGet).not.toHaveBeenCalled()
        expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    })

    it('authenticates, stores the tokens, and redirects to the saved path', async () => {
        localStorage.setItem(appKeys.currentPath, '/en/saved-path')
        apiPost.mockResolvedValue({
            data: {
                accessToken: 'access-1',
                refreshToken: { value: 'refresh-1' },
                user: { id: '1', name: 'Jane' },
            },
        })
        const user = userEvent.setup()
        render(<UserProvider><Consumer /></UserProvider>)

        await user.click(screen.getByText('authenticate'))

        await waitFor(() => expect(screen.getByTestId('authenticated')).toHaveTextContent('true'))
        expect(setCookie).toHaveBeenCalledWith(appKeys.accessTokenKey, 'access-1', 60 * 60 * 24 * 7)
        expect(setCookie).toHaveBeenCalledWith(appKeys.refreshTokenKey, 'refresh-1', 60 * 60 * 24 * 7)
        expect(push).toHaveBeenCalledWith('/en/saved-path')
    })

    it('redirects to the saved path even when authentication fails', async () => {
        localStorage.setItem(appKeys.currentPath, '/en/saved-path')
        apiPost.mockRejectedValue(new Error('network error'))
        const user = userEvent.setup()
        render(<UserProvider><Consumer /></UserProvider>)

        await user.click(screen.getByText('authenticate'))

        await waitFor(() => expect(push).toHaveBeenCalledWith('/en/saved-path'))
        expect(setCookie).not.toHaveBeenCalled()
        expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    })

    it('revokes authentication by clearing cookies, state, and signing out', async () => {
        getCookie.mockReturnValue('existing-token')
        apiGet.mockResolvedValue({ data: { id: '1', name: 'Jane' } })
        const user = userEvent.setup()
        render(<UserProvider><Consumer /></UserProvider>)
        await waitFor(() => expect(screen.getByTestId('authenticated')).toHaveTextContent('true'))

        await user.click(screen.getByText('revoke'))

        expect(deleteCookie).toHaveBeenCalledWith(appKeys.accessTokenKey)
        expect(deleteCookie).toHaveBeenCalledWith(appKeys.refreshTokenKey)
        expect(signOut).toHaveBeenCalled()
        expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    })

    it('deletes the account and revokes authentication on success', async () => {
        apiDelete.mockResolvedValue(undefined)
        const user = userEvent.setup()
        render(<UserProvider><Consumer /></UserProvider>)

        await user.click(screen.getByText('delete-account'))

        await waitFor(() => expect(signOut).toHaveBeenCalled())
        expect(apiDelete).toHaveBeenCalledWith('user/delete')
    })

    it('stores the current localized path in localStorage', async () => {
        const user = userEvent.setup()
        render(<UserProvider><Consumer /></UserProvider>)

        await user.click(screen.getByText('set-path'))

        expect(localStorage.getItem(appKeys.currentPath)).toBe('/en/some/path')
    })
})
