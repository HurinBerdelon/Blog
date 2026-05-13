'use client'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center flex-1 gap-6 text-backgroundDark dark:text-textLight">
            <h2 className="text-2xl font-semibold">Something went wrong</h2>
            <button
                onClick={reset}
                className="px-6 py-2 bg-greenBrand dark:bg-greenBrandDark text-textLight rounded hover:brightness-90"
            >
                Try again
            </button>
        </div>
    )
}
