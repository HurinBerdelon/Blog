import { describe, it, expect, vi, beforeEach } from 'vitest'
import { appKeys } from '@/config/AppKeys'

const mocks = vi.hoisted(() => {
    const apiPost = vi.fn()
    let errorHandler: ((error: unknown) => unknown) | undefined
    let successHandler: ((response: unknown) => unknown) | undefined

    const apiInstance = Object.assign(
        vi.fn((config: unknown) => Promise.resolve({ retried: true, config })),
        {
            defaults: { headers: {} as Record<string, string> },
            post: apiPost,
            interceptors: {
                response: {
                    use: (onFulfilled: (response: unknown) => unknown, onRejected: (error: unknown) => unknown) => {
                        successHandler = onFulfilled
                        errorHandler = onRejected
                    },
                },
            },
        }
    )

    const create = vi.fn(() => apiInstance)

    return {
        apiPost,
        apiInstance,
        create,
        getErrorHandler: () => errorHandler!,
        getSuccessHandler: () => successHandler!,
    }
})

vi.mock('axios', () => ({
    default: { create: mocks.create },
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

async function freshSetupApi() {
    vi.resetModules()
    const mod = await import('../setupApi')
    return mod.setupAPIClient
}

describe('setupAPIClient', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        getCookie.mockReturnValue('')
        mocks.apiInstance.defaults.headers = {}
    })

    it('creates the axios instance with the access token cookie as the Authorization header', async () => {
        getCookie.mockReturnValue('initial-token')
        const setupAPIClient = await freshSetupApi()

        setupAPIClient()

        expect(mocks.create).toHaveBeenCalledWith(
            expect.objectContaining({ headers: { Authorization: 'Bearer initial-token' } })
        )
    })

    it('passes a successful response through unchanged', async () => {
        const setupAPIClient = await freshSetupApi()
        setupAPIClient()

        const response = { data: 'ok' }
        expect(mocks.getSuccessHandler()(response)).toBe(response)
    })

    it('rejects with the original error when there is no response (e.g. a network error)', async () => {
        const setupAPIClient = await freshSetupApi()
        setupAPIClient()
        const error = new Error('network down')

        await expect(mocks.getErrorHandler()(error)).rejects.toBe(error)
    })

    it('rejects with the original error for a non-401 response', async () => {
        const setupAPIClient = await freshSetupApi()
        setupAPIClient()
        const error = { response: { status: 500 } }

        await expect(mocks.getErrorHandler()(error)).rejects.toBe(error)
    })

    it('refreshes the token and retries the original request on a 401 "Invalid Token!" response', async () => {
        getCookie.mockReturnValue('old-refresh-token')
        mocks.apiPost.mockResolvedValue({
            data: { accessToken: 'new-access', refreshToken: { value: 'new-refresh' } },
        })
        const setupAPIClient = await freshSetupApi()
        setupAPIClient()

        const originalConfig = { headers: {} as Record<string, string> }
        const error = {
            response: { status: 401, data: { message: 'Invalid Token!' } },
            config: originalConfig,
        }

        const result = await mocks.getErrorHandler()(error)

        expect(mocks.apiPost).toHaveBeenCalledWith(
            '/refresh',
            {},
            { headers: { 'x-refresh-token': 'old-refresh-token' } }
        )
        expect(setCookie).toHaveBeenCalledWith(appKeys.accessTokenKey, 'new-access', 60 * 60 * 24 * 7)
        expect(setCookie).toHaveBeenCalledWith(appKeys.refreshTokenKey, 'new-refresh', 60 * 60 * 24 * 7)
        expect(originalConfig.headers['Authorization']).toBe('Bearer new-access')
        expect(result).toEqual({ retried: true, config: originalConfig })
    })

    it('queues concurrent 401s during a single in-flight refresh and retries all of them', async () => {
        getCookie.mockReturnValue('old-refresh-token')
        mocks.apiPost.mockResolvedValue({
            data: { accessToken: 'new-access', refreshToken: { value: 'new-refresh' } },
        })
        const setupAPIClient = await freshSetupApi()
        setupAPIClient()

        const configA = { headers: {} as Record<string, string> }
        const configB = { headers: {} as Record<string, string> }
        const make401 = (config: unknown) => ({
            response: { status: 401, data: { message: 'Invalid Token!' } },
            config,
        })

        const [resultA, resultB] = await Promise.all([
            mocks.getErrorHandler()(make401(configA)),
            mocks.getErrorHandler()(make401(configB)),
        ])

        expect(mocks.apiPost).toHaveBeenCalledTimes(1)
        expect(resultA).toEqual({ retried: true, config: configA })
        expect(resultB).toEqual({ retried: true, config: configB })
    })

    it('clears tokens and signs out when the refresh request itself fails', async () => {
        getCookie.mockReturnValue('old-refresh-token')
        const refreshError = new Error('refresh failed')
        mocks.apiPost.mockRejectedValue(refreshError)
        const setupAPIClient = await freshSetupApi()
        setupAPIClient()

        const error = {
            response: { status: 401, data: { message: 'Invalid Token!' } },
            config: { headers: {} },
        }

        await expect(mocks.getErrorHandler()(error)).rejects.toBe(refreshError)
        expect(deleteCookie).toHaveBeenCalledWith(appKeys.accessTokenKey)
        expect(deleteCookie).toHaveBeenCalledWith(appKeys.refreshTokenKey)
        expect(signOut).toHaveBeenCalled()
    })

    it('signs out immediately on a 401 without "Invalid Token!" in a browser environment', async () => {
        const setupAPIClient = await freshSetupApi()
        setupAPIClient()
        const error = { response: { status: 401, data: { message: 'Unauthorized' } } }

        await expect(mocks.getErrorHandler()(error)).rejects.toBe(error)
        expect(signOut).toHaveBeenCalled()
    })

    it('rejects with AuthTokenError on a 401 without "Invalid Token!" when there is no window (server-side)', async () => {
        vi.stubGlobal('window', undefined)
        try {
            const setupAPIClient = await freshSetupApi()
            setupAPIClient()
            const error = { response: { status: 401, data: { message: 'Unauthorized' } } }

            const rejection: Error = await (mocks.getErrorHandler()(error) as Promise<unknown>).then(
                () => { throw new Error('expected the promise to reject') },
                (reason: Error) => reason
            )

            expect(rejection.constructor.name).toBe('AuthTokenError')
            expect(rejection.message).toBe('Error with authentication token')
            expect(signOut).not.toHaveBeenCalled()
        } finally {
            vi.unstubAllGlobals()
        }
    })
})
