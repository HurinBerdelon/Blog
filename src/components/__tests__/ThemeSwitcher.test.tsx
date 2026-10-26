import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeSwitcher } from '../ThemeSwitcher'

const setTheme = vi.fn()
let theme = 'dark'

vi.mock('@/hooks/useTheme', () => ({
    useTheme: () => ({ theme, setTheme }),
}))

describe('ThemeSwitcher', () => {
    beforeEach(() => {
        setTheme.mockClear()
    })

    it('switches from dark to light when clicked', async () => {
        theme = 'dark'
        const user = userEvent.setup()
        render(<ThemeSwitcher />)

        await user.click(screen.getByRole('button'))

        expect(setTheme).toHaveBeenCalledWith('light')
    })

    it('switches from light to dark when clicked', async () => {
        theme = 'light'
        const user = userEvent.setup()
        render(<ThemeSwitcher />)

        await user.click(screen.getByRole('button'))

        expect(setTheme).toHaveBeenCalledWith('dark')
    })
})
