const { test, expect } = require('@playwright/test');

test('RSS hírek betöltése és megjelenítése', async ({ page }) => {
  await page.goto('http://localhost:3000/news');

  const otherArticles = page.locator('li:not(.featured-article)');
  const count = await otherArticles.count();
  expect(count).toBeGreaterThan(0); 
});
