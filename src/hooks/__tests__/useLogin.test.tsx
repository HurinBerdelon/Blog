import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { LoginProvider, useLogin } from '../useLogin'

describe('useLogin', () => {
    it('starts closed and can be toggled open and closed', () => {
        const { result } = renderHook(() => useLogin(), {
            wrapper: ({ children }) => <LoginProvider>{children}</LoginProvider>,
        })

        expect(result.current.isLoginModalOpen).toBe(false)

        act(() => result.current.setIsLoginModalOpen(true))
        expect(result.current.isLoginModalOpen).toBe(true)

        act(() => result.current.setIsLoginModalOpen(false))
        expect(result.current.isLoginModalOpen).toBe(false)
    })
})
