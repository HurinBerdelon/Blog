import type { Subject } from '@/config/subjects'

export function setSubjectCookie(subject: Subject) {
    document.cookie = `subject=${subject}; path=/; max-age=${60 * 60 * 24 * 365}`
}
