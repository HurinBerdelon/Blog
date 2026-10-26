import { test, expect } from './fixtures'

test.describe('Subject chooser (homepage)', () => {
    test('redirects "/" to a locale-prefixed URL and shows both subject links', async ({ page }) => {
        await page.goto('/')

        await expect(page).toHaveURL(/\/en\/?$/)
        await expect(page.getByRole('heading', { name: 'What would you like to read about?' })).toBeVisible()
        await expect(page.getByRole('link', { name: /Tech/i })).toBeVisible()
        await expect(page.getByRole('link', { name: /Humanities/i })).toBeVisible()
    })

    test('switching locale updates the URL and translates the page', async ({ page }) => {
        await page.goto('/en')

        await page.getByRole('button').click()
        await page.getByRole('link', { name: /português/i }).click()

        await expect(page).toHaveURL(/\/pt-BR\/?$/)
        await expect(page.getByRole('heading', { name: 'Sobre o que você gostaria de ler?' })).toBeVisible()
    })

    test('clicking a subject link navigates to that subject page', async ({ page }) => {
        await page.goto('/en')

        await page.getByRole('link', { name: /Tech/i }).click()

        await expect(page).toHaveURL(/\/en\/tech\/?$/)
    })
})
