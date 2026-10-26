'use client'
import { useEffect, useState } from "react"

export function useHasMounted(): boolean {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-hydration flag so browser-only UI doesn't cause a hydration mismatch
        setHasMounted(true)
    }, [])

    return hasMounted
}
