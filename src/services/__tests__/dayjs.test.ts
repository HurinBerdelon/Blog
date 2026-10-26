import { describe, it, expect } from 'vitest'
import { formatDate } from '../dayjs'

describe('formatDate', () => {
    it('formats a local date-time string as DD/MM/YYYY', () => {
        expect(formatDate('2024-03-05T10:00:00')).toBe('05/03/2024')
    })

    it('formats a plain date string', () => {
        expect(formatDate('2023-12-25')).toBe('25/12/2023')
    })

    it('returns "Invalid Date" for an unparseable string', () => {
        expect(formatDate('not-a-date')).toBe('Invalid Date')
    })
})
