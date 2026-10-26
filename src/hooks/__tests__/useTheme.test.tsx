import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from '../useTheme'

function Consumer() {
    const { theme, setTheme } = useTheme()
    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>toggle</button>
        </div>
    )
}

describe('useTheme', () => {
    beforeEach(() => {
        localStorage.clear()
        document.documentElement.classList.remove('dark')
    })

    it('defaults to dark and applies the dark class when nothing is saved', async () => {
        render(<ThemeProvider><Consumer /></ThemeProvider>)

        await waitFor(() => expect(screen.getByTestId('theme')).toHaveTextContent('dark'))
        expect(document.documentElement.classList.contains('dark')).toBe(true)
        expect(localStorage.getItem('hurinBlog-theme')).toBe('dark')
    })

    it('restores a previously saved theme from localStorage', async () => {
        localStorage.setItem('hurinBlog-theme', 'light')

        render(<ThemeProvider><Consumer /></ThemeProvider>)

        await waitFor(() => expect(screen.getByTestId('theme')).toHaveTextContent('light'))
        expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('updates the theme, persists it, and toggles the dark class', async () => {
        const user = userEvent.setup()
        render(<ThemeProvider><Consumer /></ThemeProvider>)
        await waitFor(() => expect(screen.getByTestId('theme')).toHaveTextContent('dark'))

        await user.click(screen.getByRole('button'))

        await waitFor(() => expect(screen.getByTestId('theme')).toHaveTextContent('light'))
        expect(localStorage.getItem('hurinBlog-theme')).toBe('light')
        expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
})
