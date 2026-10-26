import { describe, it, expect, vi, beforeAll } from 'vitest'

const NextAuth = vi.fn((_config: unknown) => ({
    handlers: {},
    auth: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
}))

vi.mock('next-auth', () => ({
    default: (config: unknown) => NextAuth(config),
}))

vi.mock('next-auth/providers/google', () => ({
    default: (config: unknown) => ({ id: 'google', ...(config as object) }),
}))

type AuthConfig = {
    providers: { id: string }[]
    callbacks: { session: (args: { session: unknown; token: { sub: string } }) => unknown }
}

describe('auth config', () => {
    let config: AuthConfig

    beforeAll(async () => {
        await import('../auth')
        config = NextAuth.mock.calls[0][0] as unknown as AuthConfig
    })

    it('registers a Google provider', () => {
        expect(config.providers).toHaveLength(1)
        expect(config.providers[0].id).toBe('google')
    })

    it('copies the token subject into session.user.providerId', () => {
        const session = { user: {} as { providerId?: string } }

        const result = config.callbacks.session({ session, token: { sub: 'google-user-123' } }) as typeof session

        expect(result.user.providerId).toBe('google-user-123')
        expect(result).toBe(session)
    })
})
