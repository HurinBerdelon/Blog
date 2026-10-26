import { describe, it, expect, beforeEach } from 'vitest'
import { getCookie, setCookie, deleteCookie } from '../cookies'

describe('cookies', () => {
    beforeEach(() => {
        document.cookie.split('; ').forEach(cookie => {
            const name = cookie.split('=')[0]
            if (name) document.cookie = `${name}=; max-age=0; path=/`
        })
    })

    it('returns an empty string when the cookie is not set', () => {
        expect(getCookie('missing')).toBe('')
    })

    it('sets and reads a cookie', () => {
        setCookie('token', 'abc123', 60)
        expect(getCookie('token')).toBe('abc123')
    })

    it('deletes a cookie', () => {
        setCookie('token', 'abc123', 60)
        deleteCookie('token')
        expect(getCookie('token')).toBe('')
    })
})
