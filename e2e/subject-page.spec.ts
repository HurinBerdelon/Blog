import { test, expect } from './fixtures'

test.describe('Subject page', () => {
    test('renders the header, post list, and footer without erroring', async ({ page }) => {
        const response = await page.goto('/en/tech')

        expect(response?.status()).toBeLessThan(400)
        await expect(page.getByRole('heading', { name: 'Recent Posts' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Button to Open Menu' })).toBeVisible()
        await expect(page.getByRole('contentinfo')).toBeVisible()
        await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible()
    })

    test('shows either post cards or the empty-state message', async ({ page }) => {
        await page.goto('/en/tech')

        const postLinks = page.locator('main a[href*="/post/"]')
        const emptyState = page.getByText('No Posts Here.')

        await expect(postLinks.first().or(emptyState)).toBeVisible()
    })

    test('requesting an unknown subject shows the not-found page', async ({ page }) => {
        await page.goto('/en/not-a-real-subject')

        await expect(page.getByText('Page not Found!')).toBeVisible()
    })
})
