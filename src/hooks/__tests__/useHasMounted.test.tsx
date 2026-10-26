import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useHasMounted } from '../useHasMounted'

describe('useHasMounted', () => {
    it('flips to true after the first client commit', async () => {
        const { result } = renderHook(() => useHasMounted())

        await waitFor(() => expect(result.current).toBe(true))
    })
})
