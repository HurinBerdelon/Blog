import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Pagination } from '../index'

function pageButtonLabels(): string[] {
    return screen
        .getAllByRole('button')
        .map(button => button.textContent?.trim() ?? '')
}

describe('Pagination', () => {
    it('shows the "showing X - Y of Z" summary', () => {
        const { container } = render(
            <Pagination totalCountOfRegisters={50} registerPerPage={10} currentPage={1} onPageChange={vi.fn()} />
        )

        const strongValues = Array.from(container.querySelectorAll('strong')).map(el => el.textContent?.trim())
        expect(strongValues).toEqual(['1', '10', '50'])
    })

    it('renders only trailing pages and an ellipsis on the first page of many', () => {
        render(<Pagination totalCountOfRegisters={50} registerPerPage={10} currentPage={1} onPageChange={vi.fn()} />)

        expect(pageButtonLabels()).toEqual(['1', '2', '3', '5'])
        expect(screen.getByText('...')).toBeInTheDocument()
    })

    it('renders every page without ellipses when they all fit around the current page', () => {
        render(<Pagination totalCountOfRegisters={50} registerPerPage={10} currentPage={3} onPageChange={vi.fn()} />)

        expect(pageButtonLabels()).toEqual(['1', '2', '3', '4', '5'])
        expect(screen.queryByText('...')).not.toBeInTheDocument()
    })

    it('renders a leading ellipsis and trailing pages on the last page of many', () => {
        render(<Pagination totalCountOfRegisters={50} registerPerPage={10} currentPage={5} onPageChange={vi.fn()} />)

        expect(pageButtonLabels()).toEqual(['1', '3', '4', '5'])
        expect(screen.getByText('...')).toBeInTheDocument()
    })

    it('renders a single page button when there is only one page', () => {
        render(<Pagination totalCountOfRegisters={5} registerPerPage={10} currentPage={1} onPageChange={vi.fn()} />)

        expect(pageButtonLabels()).toEqual(['1'])
        expect(screen.queryByText('...')).not.toBeInTheDocument()
    })

    it('marks the current page button as disabled', () => {
        render(<Pagination totalCountOfRegisters={50} registerPerPage={10} currentPage={3} onPageChange={vi.fn()} />)

        expect(screen.getByRole('button', { name: '3' })).toBeDisabled()
    })
})
