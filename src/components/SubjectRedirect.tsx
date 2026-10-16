'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isSubject } from '@/config/subjects'

export function SubjectRedirect({ lang }: { lang: string }) {
    const router = useRouter()

    useEffect(() => {
        const savedSubject = document.cookie.match(/(?:^|; )subject=([^;]+)/)?.[1]
        if (savedSubject && isSubject(savedSubject)) {
            router.replace(`/${lang}/${savedSubject}`)
        }
    }, [lang, router])

    return null
}
