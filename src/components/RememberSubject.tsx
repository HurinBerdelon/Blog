'use client'
import { useEffect } from 'react'
import type { Subject } from '@/config/subjects'

export function RememberSubject({ subject }: { subject: Subject }) {
    useEffect(() => {
        document.cookie = `subject=${subject}; path=/; max-age=${60 * 60 * 24 * 365}`
    }, [subject])

    return null
}
