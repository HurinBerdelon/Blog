'use client'
import { useEffect } from 'react'
import type { Subject } from '@/config/subjects'
import { setSubjectCookie } from '@/utils/subjectCookie'

export function RememberSubject({ subject }: { subject: Subject }) {
    useEffect(() => {
        setSubjectCookie(subject)
    }, [subject])

    return null
}
