import { describe, it, expect } from 'vitest'
import { isSubject, subjectList } from '../subjects'

describe('isSubject', () => {
    it.each(subjectList)('returns true for valid subject "%s"', subject => {
        expect(isSubject(subject)).toBe(true)
    })

    it('returns false for an unknown value', () => {
        expect(isSubject('cooking')).toBe(false)
    })

    it('returns false for an empty string', () => {
        expect(isSubject('')).toBe(false)
    })
})
