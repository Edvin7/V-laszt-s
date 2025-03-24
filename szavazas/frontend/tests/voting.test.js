const { test, expect } = require('@playwright/test');

test('Bejelentkezés és szavazás tesztelése', async ({ page }) => {
  await page.goto('http://localhost:3000/login');  
  
  await page.fill('input[name="email"]', 'szalkai@gmail.com');  
  await page.fill('input[name="password"]', 'szalkai@gmail.com');  
  await page.click('input[type="submit"][value="Bejelentkezés"]');
  
  await expect(page).toHaveURL('http://localhost:3000/');  
  
  await page.waitForSelector('a[href="/voting"]');

  await page.click('a[href="/voting"]');
  
  await expect(page).toHaveURL('http://localhost:3000/voting'); 
  
  const firstParty = await page.locator('.party').first();  
  await firstParty.click(); 
  
  const submitButton = await page.locator('button.submit-btn');
  await submitButton.click();  
});
