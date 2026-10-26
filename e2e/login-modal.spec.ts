import { test, expect } from './fixtures'

test.describe('Login modal', () => {
    test('opens from the menu, shows the Google login option, and can be closed', async ({ page }) => {
        await page.goto('/en/tech')

        await page.getByRole('button', { name: 'Button to Open Menu' }).click()
        await page.getByRole('button', { name: 'Login' }).click()

        const dialog = page.getByRole('dialog')
        await expect(dialog.getByText('Welcome to HurinBlog')).toBeVisible()
        await expect(dialog.getByRole('button', { name: 'Login with Google' })).toBeVisible()

        await dialog.getByRole('button').first().click()
        await expect(dialog).not.toBeVisible()
    })
})
