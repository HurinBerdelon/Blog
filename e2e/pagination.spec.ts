import { test, expect } from './fixtures'

test.describe('Pagination', () => {
    test('navigating to page 2 shows the next set of posts and updates the URL', async ({ page }) => {
        await page.goto('/en/tech/category/all')

        const totals = await page.locator('strong').allTextContents()
        const total = Number(totals[2]?.trim() ?? 0)
        test.skip(total <= 12, 'Not enough tech posts in the content repository to reach a second page')

        await page.getByRole('button', { name: '2', exact: true }).click()

        await expect(page).toHaveURL(/[?&]page=2/)
        await expect(page.getByText('Showing 13 -')).toBeVisible()
    })
})
