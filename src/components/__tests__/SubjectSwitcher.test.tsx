import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SubjectSwitcher } from '../SubjectSwitcher'

const mockParams = vi.fn()
const setSubjectCookie = vi.fn()

vi.mock('next/navigation', () => ({
    useParams: () => mockParams(),
}))

vi.mock('@/utils/subjectCookie', () => ({
    setSubjectCookie: (...args: unknown[]) => setSubjectCookie(...args),
}))

describe('SubjectSwitcher', () => {
    it('renders nothing when there is no current subject', () => {
        mockParams.mockReturnValue({ lang: 'en' })
        const { container } = render(<SubjectSwitcher />)

        expect(container).toBeEmptyDOMElement()
    })

    it('builds subject links scoped to the current lang and sets the cookie on click', async () => {
        mockParams.mockReturnValue({ lang: 'en', subject: 'tech' })
        const user = userEvent.setup()
        render(<SubjectSwitcher />)

        await user.click(screen.getByRole('button'))

        const humanitiesLink = screen.getByRole('link', { name: /humanities/i })
        expect(humanitiesLink).toHaveAttribute('href', '/en/humanities')

        await user.click(humanitiesLink)
        expect(setSubjectCookie).toHaveBeenCalledWith('humanities')
    })
})
