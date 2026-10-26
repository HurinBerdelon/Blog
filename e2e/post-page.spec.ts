import { test, expect } from './fixtures'

test.describe('Post page', () => {
    test('clicking a post card opens the post with its content and share buttons', async ({ page }) => {
        await page.goto('/en/tech')

        const postLink = page.locator('main a[href*="/post/"]').first()
        test.skip((await postLink.count()) === 0, 'No tech posts available in the content repository to follow')

        await postLink.click()

        await expect(page).toHaveURL(/\/en\/tech\/post\/.+/)
        await expect(page.getByText('Share this Post')).toBeVisible()
        await expect(page.getByRole('contentinfo')).toBeVisible()
    })
})
