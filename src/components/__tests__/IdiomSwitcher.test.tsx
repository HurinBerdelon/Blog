import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IdiomSwitcher } from '../IdiomSwitcher'

const mockParams = vi.fn()
const mockPathname = vi.fn()

vi.mock('next/navigation', () => ({
    useParams: () => mockParams(),
    usePathname: () => mockPathname(),
}))

describe('IdiomSwitcher', () => {
    it('builds a locale link that swaps the current locale segment in the path', async () => {
        mockParams.mockReturnValue({ lang: 'en' })
        mockPathname.mockReturnValue('/en/tech/post/my-post')
        const user = userEvent.setup()
        render(<IdiomSwitcher />)

        await user.click(screen.getByRole('button'))

        expect(screen.getByRole('link', { name: /português/i })).toHaveAttribute(
            'href',
            '/pt-BR/tech/post/my-post'
        )
    })

    it('falls back to "en" when there is no lang param', async () => {
        mockParams.mockReturnValue({})
        mockPathname.mockReturnValue('/')
        const user = userEvent.setup()
        render(<IdiomSwitcher />)

        await user.click(screen.getByRole('button'))

        expect(screen.getAllByRole('link')).toHaveLength(2)
    })
})
