'use client'
import { useEffect } from 'react'
import { useNavHint } from '@/hooks/useNavHint'

const STORAGE_KEY = 'hasSeenNavHint'

export function NavHintAutoShow(): null {
    const { setIsNavHintOpen } = useNavHint()

    useEffect(() => {
        try {
            if (localStorage.getItem(STORAGE_KEY)) return
            localStorage.setItem(STORAGE_KEY, 'true')
            setIsNavHintOpen(true)
        } catch {
            // localStorage unavailable (private mode, blocked storage, ...) - skip the hint
        }
    }, [setIsNavHintOpen])

    return null
}
