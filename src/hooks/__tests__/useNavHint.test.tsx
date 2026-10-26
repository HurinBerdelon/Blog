import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { NavHintProvider, useNavHint } from '../useNavHint'

describe('useNavHint', () => {
    it('starts closed and can be toggled open and closed', () => {
        const { result } = renderHook(() => useNavHint(), {
            wrapper: ({ children }) => <NavHintProvider>{children}</NavHintProvider>,
        })

        expect(result.current.isNavHintOpen).toBe(false)

        act(() => result.current.setIsNavHintOpen(true))
        expect(result.current.isNavHintOpen).toBe(true)

        act(() => result.current.setIsNavHintOpen(false))
        expect(result.current.isNavHintOpen).toBe(false)
    })
})
