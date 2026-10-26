import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PaginationItem } from '../PaginationItem'

describe('PaginationItem', () => {
    it('renders a disabled button for the current page', () => {
        render(<PaginationItem number={3} isCurrent onPageChange={vi.fn()} />)

        const button = screen.getByRole('button', { name: '3' })
        expect(button).toBeDisabled()
    })

    it('renders an enabled button for a non-current page and calls onPageChange when clicked', async () => {
        const onPageChange = vi.fn()
        const user = userEvent.setup()
        render(<PaginationItem number={5} onPageChange={onPageChange} />)

        const button = screen.getByRole('button', { name: '5' })
        expect(button).toBeEnabled()

        await user.click(button)

        expect(onPageChange).toHaveBeenCalledWith(5)
    })
})
