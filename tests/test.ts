import { expect, test } from '@playwright/test';
import { checkA11y, injectAxe } from 'axe-playwright';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await injectAxe(page);
	expect(await page.textContent('h1')).toBe('About me');
	await checkA11y(page);
});
