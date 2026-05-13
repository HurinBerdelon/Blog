'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function PostError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const params = useParams()
    const lang = (params?.lang as string) ?? 'en'

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center flex-1 gap-6 text-backgroundDark dark:text-textLight">
            <h2 className="text-2xl font-semibold">Failed to load post</h2>
            <div className="flex gap-4">
                <button
                    onClick={reset}
                    className="px-6 py-2 bg-greenBrand dark:bg-greenBrandDark text-textLight rounded hover:brightness-90"
                >
                    Try again
                </button>
                <Link
                    href={`/${lang}`}
                    className="px-6 py-2 border-2 border-grayBrand dark:border-greenBrandDark rounded hover:underline"
                >
                    Go home
                </Link>
            </div>
        </div>
    )
}
