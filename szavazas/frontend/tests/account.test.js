const { test, expect } = require('@playwright/test');

test('should login successfully and navigate to profile page from navbar', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('input[placeholder="Email cím"]', 'szalkai@gmail.com');
  await page.fill('input[placeholder="Jelszó"]', 'szalkai@gmail.com');

  await page.click('input[type="submit"][value="Bejelentkezés"]');

  await page.waitForSelector('a[href="/account"]');

  await page.click('a[href="/account"]');

  await page.waitForSelector('h2.account-header'); 

  const profileHeader = await page.textContent('h2.account-header');
  expect(profileHeader).toBe('Fiók információk');
});
