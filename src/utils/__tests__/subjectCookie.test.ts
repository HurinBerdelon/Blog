import { describe, it, expect, beforeEach } from 'vitest'
import { setSubjectCookie } from '../subjectCookie'

describe('setSubjectCookie', () => {
    beforeEach(() => {
        document.cookie.split('; ').forEach(cookie => {
            const name = cookie.split('=')[0]
            if (name) document.cookie = `${name}=; max-age=0; path=/`
        })
    })

    it('sets a "subject" cookie with the given value', () => {
        setSubjectCookie('tech')
        expect(document.cookie).toContain('subject=tech')
    })

    it('overwrites a previously set subject', () => {
        setSubjectCookie('tech')
        setSubjectCookie('humanities')
        expect(document.cookie).toContain('subject=humanities')
        expect(document.cookie).not.toContain('subject=tech')
    })
})
